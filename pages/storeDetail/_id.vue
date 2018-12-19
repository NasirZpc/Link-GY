<template>
    <div class="store-detail">
        <!-- banner -->
        <div v-swiper:mySwiper="swiperOption">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,index) in detail.ImageList" :key="index">
                    <img :src="item.Url">
                </div>
            </div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-pagination"></div>
        </div>
        <div class="wrapper2 pt40">
            <div class="base-info">
                <p class="C0 fs20 tit">{{detail.BaseInfo.Name}}</p>
                <div class="clearfix">
                    <p class="fl C80 fs14 pt15">
                        <i class="el-icon-location-outline mr10"></i>
                        <span>{{detail.BaseInfo.RegionName}}{{detail.BaseInfo.Address}}</span>
                    </p>
                    <nuxt-link class="CRed fs20 block fr" :to="`/houseLists?id=${detail.BaseInfo.Id}`">
                        <span class="inline-b">查看该门店户型</span>
                        <i class="el-icon-arrow-right rel" style="top:1px;"></i>
                    </nuxt-link>
                </div>
                <div class="clearfix">
                    <p class="fl C80 fs14 pt10">
                        <fa :icon="['fas','home']" class="mr10 C9"/>
                        <span>房间总数{{detail.BaseInfo.RentableRoomNums}}间</span>
                    </p>
                    <p class="fr C80 fs16">总共<span class="CRed fs22">{{detail.BaseInfo.Count}}</span>个户型可供预约</p>
                </div>
                <p class="fs14 C80 pt20">{{detail.BaseInfo.Memo}}</p>
            </div>
            <div class="map-around pt60">
                <p class="C0 fs20 tit">周边地图</p>
                <map-com style="margin-top:20px;" :map-data="mapData"/>
            </div>
            <div class="house-type pt60">
                <p class="C0 fs20 tit">户型列表</p>
                <ul class="clearfix pt20">
                    <li class="fl" v-for="(item,index) in lists" :key="index">
                        <nuxt-link :to="`/houseDetail/${item.Id}`">
                            <img :src="item.MainPic">
                            <div>
                                <p class="fs20 C0">
                                    <span class="inline-b mr10">{{item.PropertyName}}</span>
                                    <span>{{item.Name}}</span>
                                </p>
                                <p class="ellipsis C80 fs14">{{item.Content}}</p>
                                <p class="CRed fs14">
                                    <span class="inline-b mr10">{{item.Area}}m²</span>
                                    <span>{{item.MinPrice}}-{{item.MaxPrice}}元/月</span>
                                </p>
                            </div>
                        </nuxt-link>
                    </li>
                </ul>
                <el-button class="fs16 rel">
                    <nuxt-link class="block CRed abs" :to="`/houseLists?id=${detail.BaseInfo.Id}`">更多房型</nuxt-link>
                </el-button>
            </div>
        </div>
    </div>
</template>
<script>
import MapCom from '@/components/mapCom.vue'
export default{
    components: {
        MapCom
    },
    head() {
        return {
            title: this.detail.BaseInfo.Name,
        }
    },
    async asyncData({app}){
        let [detailRes,listsRes] = await Promise.all([
            app.$axios.post(`/api/PStruct/QueryPStructDetail`,{Id:app.context.route.params.id}),//详情
            app.$axios.post(`api/PStruct/GetPublishRoomType`,{
				QueryJson:{
					// Type: '5',//1-楼盘(小区) 2，3-楼阁 4-楼层 5-房间
					KeyWord : '',//关键字
					AreaId:'',//区域id
					PropertyId:app.context.route.params.id,//小区id
					RoomTypeName:'',//户型
					Rental:'',//租金
				},
				Page:'1',
				Rows:'4',
			}),//推荐列表
        ])
        let detail = detailRes.data.Data
        let mapData = {
            lat:detail.BaseInfo.LAT,
            lng:detail.BaseInfo.LNG
        }
        let lists = listsRes.data.Data.Rows
        return {detail,mapData,lists}
    },
    data(){
        return {
            detail:{},
            swiperOption: {
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                },
            },
            mapData:{},
            lists:[]
        }
    }
}
</script>
<style lang="scss">
@import "@/assets/css/houseDetail.scss";
</style>
