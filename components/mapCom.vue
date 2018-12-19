<template>
    <div class="DetailsFilter__Map">
        <!-- <input type="hidden" name="name" value="121.5259780000" id="lng">
                <input type="hidden" name="name" value="31.1859440000" id="lat"> -->
        <div class="DetailsFilter__Map__Media fl" id="mapcontainer"></div>
        <div class="DetailsFilter__Map__Panel fr">
            <el-tabs v-model="villageArea" @tab-click="handleClick">
                <el-tab-pane v-for="(item,index) in villageAreaList" :label="item.name" :key="index" :index="index" :name="item.menu">
                    <div class="villageAreaView" v-show="ite.list.length !== 0" v-for="(ite,index2) in listMessage" :key="index2">
                        <h4>{{ ite.title }}</h4>
                        <div :class="{villageAreaViewLi:true,active: ites.title==viactive}" v-for="(ites,index3) in ite.list" :key="index3" @mouseenter="mapChangeOver(ites.point, ite.cateList + (index3 + 1) )" @mouseleave="mapChangeOut(ites.point, ite.cateList + (index3 + 1) )"
                         @click="addClickHandler(ites.address,ites.point,ites.title);toggleClick(ites.title)">
                            <i class="pull-left">{{ ite.cateList }}{{ index3 + 1 }}</i>
                            <span>{{ites.title}}</span>
                            <span class="fr">{{ ites.point | pointDistence(lng,lat) }}米</span>
                        </div>
                    </div>

                </el-tab-pane>
            </el-tabs>
            <div class="DetailsFilter__Map__InsideMemu medmenu">
                <ul class="clearfix">
                    <li v-for="(item,index) in distenceList" :key="index" :class="{'active':item.isDistrnceActive}" @click="checkAreaSize(item.distence,index)">{{ item.label }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import dwImg from '@/assets/img/dw.png'
import aroundPos from '@/assets/img/aroundPos.png'
import aroundPosActive from '@/assets/img/aroundPosActive.png'
var mapVillage;
export default{
    head() {
        return {
            script:[
                {
                    src:"http://api.map.baidu.com/api?v=2.0&ak=UsFRyBiu3FKHk2WAlT5j2WFqHc2lUB3i&callback=init",
                    defer:true,
                }
            ]
        }
    },
    props:{
        mapData:{
            type:Object,
            default:()=>{
                return []
            }
        },
    },
    data(){
        return {
			villageArea: "tran",
			villageAreaList: [{
				name: '交通',
				keyWOrd: ['地铁', '公交'],
				menu: 'tran'
			}, {
				name: '教育',
				keyWOrd: ['幼儿园', '小学', '中学', '大学', '学院'],
				menu: 'edu'
			}, {
				name: '医疗',
				keyWOrd: ['医院', '药店'],
				menu: 'med'
			}, {
				name: '购物',
				keyWOrd: ['商场', '超市', '便利店', '市场'],
				menu: 'shop'
			}, {
				name: '生活',
				keyWOrd: ['ATM', '银行', '快餐', '餐厅', '咖啡厅'],
				menu: 'live'
			}, {
				name: '娱乐',
				keyWOrd: ['公园', '电影院', 'KTV', '健身房', '体育馆'],
				menu: 'happy'
			}],
			cateList: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"], // 类型标记
			listMessage: '',
			tabIndex: "",
			viactive: "", //周边列表选则
			activeMap: false,
			distenceList: [{
				distence: 500,
				label: "0.5km",
				isDistrnceActive: true
			}, {
				distence: 1000,
				label: "1km",
				isDistrnceActive: false
			}, {
				distence: 1500,
				label: "1.5km",
				isDistrnceActive: false
			}, {
				distence: 2000,
				label: "2km",
				isDistrnceActive: false
			}, {
				distence: 2500,
				label: "2.5km",
				isDistrnceActive: false
			}],
			distence: 500,
			lat: this.mapData.lat,
            lng: this.mapData.lng
        }
    },
    filters: {
		// 根据金纬度距离计算
		pointDistence: function(point,lng,lat) {
            let mPoint_lat,mPoint_lng;
			if (lat == '' || lat == null || lat == 0 || lng == '' || lng == null || lng == 0) {
				mPoint_lng = 121.5505840120, 31.2274065041
				mPoint_lat = 31.2274065041
			} else {
                mPoint_lng = lng
				mPoint_lat = lat
			}
			var radLat1 = mPoint_lat * Math.PI / 180.0;
			var radLat2 = point.lat * Math.PI / 180.0;
			var a = radLat1 - radLat2;
			var b = mPoint_lng * Math.PI / 180.0 - point.lng * Math.PI / 180.0;
			var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
			s = s * 6378.137;
			s = (Math.round(s * 10000) / 10).toFixed(0);
			return s
		}
	},
    methods:{
        checkAreaSize(dis, index) {
			for (var i = 0; i < this.distenceList.length; i++) {
				this.distenceList[i].isDistrnceActive = false;
			}
			this.distenceList[index].isDistrnceActive = true;
			this.distence = dis;
			this.creatChangeMap(this.tabIndex);
		},
        creatChangeMap(tab_index) {
			var map = new BMap.Map("mapcontainer", {
				enableMapClick: true
			});

			// 添加地图类型控件
			map.addControl(new BMap.MapTypeControl());
			// 添加工具条、比例尺控件
			map.addControl(new BMap.ScaleControl({
				anchor: BMAP_ANCHOR_TOP_LEFT
			}));
			map.addControl(new BMap.NavigationControl());
			map.addControl(new BMap.NavigationControl({
				anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
				type: BMAP_NAVIGATION_CONTROL_SMALL
			}));
			// 开启鼠标滚轮缩放
			map.enableScrollWheelZoom(true);
			map.clearOverlays();
			mapVillage = map;
			this.tabIndex = tab_index;

			let mPoint;
			if (this.lat == '' || this.lat == null || this.lat == 0 || this.lng == '' || this.lng == null || this.lng == 0) {
				mPoint = new BMap.Point(121.5505840120, 31.2274065041);
			} else {
				mPoint = new BMap.Point(this.lng, this.lat);
			}

			var myIcon = new BMap.Icon(dwImg, new BMap.Size(35, 35));
			var marker = new BMap.Marker(mPoint, {
				icon: myIcon
			}); // 创建标注
			map.addOverlay(marker); // 将标注添加到地图中

			map.centerAndZoom(mPoint, 15);
			var circle = new BMap.Circle(mPoint, this.distence, {
				fillColor: "#bb0068",
				strokeWeight: 1,
				fillOpacity: 0.3,
				strokeOpacity: 0.3
			});
			map.addOverlay(circle);
			var arry;
			var _this = this,
				arryList = [];
			for (var i = 0; i < this.villageAreaList[this.tabIndex].keyWOrd.length; i++) {
				var result, index = 0;;
				var options = {
					onSearchComplete: function(results) {
						index += 1;
						result = results.keyword;
						var list = [];
						for (var m = 0; m < results.getCurrentNumPois(); m++) {
							list.push(results.getPoi(m));
							var point = new BMap.Point(results.getPoi(m).point.lng, results.getPoi(m).point.lat);
							var myIcon = new BMap.Icon(aroundPos, new BMap.Size(40, 40));
							var marker = new BMap.Marker(point, {
								icon: myIcon
							});
							marker.addEventListener('mouseover', function(e) { //气泡mouseenter事件
								if (this.activeMap == true) return false;
								//当前气泡高亮、置顶
								var myIconActive = new BMap.Icon(aroundPosActive, new BMap.Size(40, 40));
								this.setIcon(myIconActive);
								this.setTop(true);
							});
							marker.addEventListener('mouseout', function(e) { //气泡mouseenter事件
								if (this.activeMap == true) return false;
								//当前气泡高亮、置顶
								var myIcon = new BMap.Icon(aroundPos, new BMap.Size(40, 45));
								this.setIcon(myIcon);
								this.setTop(true);
							});


							_this.addClickHandler2(results.getPoi(m).address, results.getPoi(m).title, marker, point, "" + _this.cateList[index - 1] + "" + (m + 1) + "");
						}
						arryList.push({
							title: result,
							list: list,
							cateList: _this.cateList[index - 1]
						});
						_this.listMessage = arryList;
					},
					pageCapacity: 100
				};

				var local2 = new BMap.LocalSearch(map, options);
				local2.searchNearby(this.villageAreaList[this.tabIndex].keyWOrd[i], mPoint, this.distence);
			}
		},
		addClickHandler(address, points, title) {
			var map = mapVillage;
			var point = new BMap.Point(points.lng, points.lat);
			var marker = new BMap.Marker(point); // 创建标注
			this.openInfo(address, title, point)
		},
		// 移入事件
		mapChangeOver(points, labels) {

		},
		// 移出事件
		mapChangeOut(points, labels) {},
		toggleClick(index) {
			this.viactive = index;
		},
		addClickHandler2(content, title, marker, point, text) {
			var _this = this;
			var map = mapVillage;
			var label = new BMap.Label(text);
			label.setStyle({
				color: "#fff",
				letterSpacing: '-2px',
				fontSize: "12px",
				border: "0",
				background: "transparent",
				textAlign: "center",
				width: "26px",
				height: "29px",
				marginLeft: "-3px",
				paddingTop: "5px"
			});

			marker.setLabel(label);
			map.addOverlay(marker);
			marker.addEventListener("click", function(e) {
				this.activeMap = true;
				_this.openInfo(content, title, point);
				//当前气泡高亮，其他气泡还原
				var myIconActive = new BMap.Icon(aroundPosActive, new BMap.Size(40, 40));
				this.setIcon(myIconActive);
				this.setTop(true);
				this.activeMap = false;
			});
		},
		openInfo(content, title, point) {
			var map = mapVillage;
			var point = point;
			var infoWindow = new BMap.InfoWindow("地址：" + content + "", {
				width: 200, // 信息窗口宽度
				height: 100, // 信息窗口高度
				title: title, // 信息窗口标题
				enableMessage: true, //设置允许信息窗发送短息
			}); // 创建信息窗口对象
			map.openInfoWindow(infoWindow, point); //开启信息窗口
		},
		handleClick(tab, event) {
			this.creatChangeMap(tab.index); //检索的函数 this.creatChangeMap()
		},
    },
    created(){

    },
    mounted(){
        setTimeout(() => {
			this.creatChangeMap(0);
		}, 1000)
    }
}
</script>
<style lang="scss">
.DetailsFilter__Map {
    height: 400px;
    width: 100%;
    background: #999;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
}
.DetailsFilter__Map__Media {
    width: 820px;
    height: 400px;
    overflow: hidden;
    position: relative;
    z-index: 0;
    background-color: rgb(243, 241, 236);
    color: rgb(0, 0, 0);
    text-align: left;
}
.DetailsFilter__Map__Panel{
    height: 400px;
    width: 350px;
    overflow: hidden;
    background-color: #f9f9f9;
}
.DetailsFilter__Map__Panel {
    .el-tabs__item {
        padding: 0 15px;
    }
    .el-tabs__header {
        margin-left: 15px;
    }
    .el-tabs__content {
        height: 336px;
        overflow: scroll;
        margin-top: 40px;
        h4 {
            margin: 10px;
            font-size: 18px;
            color: #333;
        }
    }
}
.DetailsFilter__Map__InsideMemu {
    position: absolute;
    top: 45px;
    padding-left: 30px;
    ul li {
        float: left;
        width: 52px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        cursor: pointer;
        border: 1px solid #bb0068;
        margin-right: 5px;
        color: #333;
    }
    ul li.active {
        color: #fff;
        background-color: #bb0068;
    }
}
.villageAreaView {
    padding-left: 15px;
    h4 {
        font-weight: 300;
        font-size: 18px;
    }
    .villageAreaViewLi {
        height: 35px;
        cursor: pointer;
        i {
            width: 24px;
            height: 24px;
            line-height: 24px;
            background-color: #bb0068;
            color: #fff;
            text-align: center;
            border-radius: 50%;
            font-style: normal;
            margin-right: 10px;
        }
        &:hover {
            color: #ff9a1b !important;
            i {
                background-color: #ff9a1b !important;
            }
        }
    }
    .villageAreaViewLi.active {
        color: #ff9a1b !important;
    }

}
//锚点
ul.villageDetails-item-nav {
    &.fix {
        top: 60px;
        left: 0;
        width: 100%;
        z-index: 2001;
        background: #fff;
    }
}
p.storeHouseLists {
	>i{
		margin-right:10px;
	}
	&:nth-of-type(2){
		>i{
			position:relative;
			left:-3px;
		}
	}
	&:nth-of-type(4){
		>i{
			position:relative;
			left:3px;
			margin-right:20px;
		}
	}
}

  .swiper-slide {
    background-size: cover;
    background-position: center;

  }
  .gallery-top {
    height: 80%!important;
    width: 100%;
  }
  .gallery-thumbs {
    height: 100px!important;
    box-sizing: border-box;
    padding: 10px 0;
  }
  .gallery-thumbs .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
  }
  .gallery-thumbs .swiper-slide-active {
    opacity: 1;
  }
</style>
