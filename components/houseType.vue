<template>
    <div class="house-type">
        <div class="screen-wrap clearfix">
            <el-select v-model="regionVal" placeholder="请选择区域" @change="selChangeFunc">
                <el-option
                    v-for="item in regionScreen"
                    :key="item.AreaId"
                    :label="item.AreaName"
                    :value="item.AreaId">
                </el-option>
            </el-select>
            <el-select v-model="villageVal" placeholder="请选择社区" @change="selChangeFunc">
                <el-option
                    v-for="item in villageScreen"
                    :key="item.PStructId"
                    :label="item.villageName"
                    :value="item.PStructId">
                </el-option>
            </el-select>
            <el-select v-model="rentVal" placeholder="请选择租金" @change="selChangeFunc">
                <el-option
                    v-for="item in rentScreen"
                    :key="item.Rental"
                    :label="item.name"
                    :value="item.Rental">
                </el-option>
            </el-select>
        </div>
        <div v-loading="loading">
            <p class="noDataText tc fs16 CRed pt40" v-show='list.length == 0'>无数据!&nbsp;&nbsp;-_-!!!</p>
            <ul class="house-type-lists">
                <li v-for="(item,index) in list" :key="index">
                    <nuxt-link :to="`/houseDetail/${item.Id}`" class="clearfix">
                        <img :src="item.MainPic " class="fl" :alt="item.FullHead">
                        <div class="fl">
                            <p class="fs20 C0">
                                <span class="inlin-b mr10">{{item.PropertyName}}</span>
                                <span>{{item.Name}}</span>
                            </p>
                            <p class="C80 fs16 pt15">
                                <i class="el-icon-location-outline mr10"></i>
                                <span>{{item.RegionName}}{{item.PropertyAddress}}</span>
                            </p>
                            <p class="C80 fs16 pt10">
                                <fa :icon="['fab','gg']" class="mr10"/>
                                <span>{{item.Area}}m²</span>
                            </p>
                        </div>
                        <div class="fr">
                            <p class="CRed fs18 mb20">¥{{item.MinPrice}}月起</p>
                            <el-button type="primary">预约看房</el-button>
                        </div>
                    </nuxt-link>
                </li>
            </ul>
            <!-- 工具条 -->
            <el-pagination v-show='list.length != 0' class="tc pt100"
                @current-change="handleCurrentChange"
                background
                :page-size="pageSize"
                layout="prev, pager, next"
                :total="listsTotal">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default{
    props:{
        regionScreen:{
            type:Array,
            default:()=>{
                return []
            }
        },
        villageScreen:{
            type:Array,
            default:()=>{
                return []
            }
        },
        listsData:{
            type:Object,
            default:()=>{
                return {}
            }
        },
        houseId:{
            type:String,
            default:()=>{
                return {}
            }
        }
    },
    data() {
        return {
            loading:false,
            // regionScreen: [],
            regionVal: '',

            // villageScreen[],
            villageVal:this.houseId || '',

            rentScreen:[
                {
                    name:'全部',
                    Rental:''
                },{
                    name:'1000元以下',
                    Rental:'a'
                },{
                    name:'1000-2000元',
                    Rental:'b'
                },{
                    name:'2000-3000元',
                    Rental:'c'
                },{
                    name:'3000-4000元',
                    Rental:'d'
                },{
                    name:'4000-5000元',
                    Rental:'e'
                },{
                    name:'5000-6000元',
                    Rental:'f'
                },{
                    name:'6000-7000元',
                    Rental:'g'
                },{
                    name:'7000-8000元',
                    Rental:'h'
                }
            ],
            rentVal:'',

            loading:false,
            page : 1,
            pageSize : 10,
            list:this.listsData.Rows,
            listsTotal:this.listsData.Records
        }
    },
    methods:{
        //改变当前页数
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.page = val
            this.loading = true;
            this.getHouseListsFunc()
            setTimeout(()=>{
                this.loading = false;
            },1000)
        },
        //改变区域、社区、租金
        selChangeFunc(){
            this.page = 1
            // this.list = []
            this.getHouseListsFunc()
        },
        getHouseListsFunc(){
            this.loading = true
            var params = {
                QueryJson:{
                    // Type: '5',//1-楼盘(小区) 2，3-楼阁 4-楼层 5-房间
                    KeyWord : '',//关键字
                    AreaId:this.regionVal,//区域id
                    PropertyId:this.villageVal,//小区id
                    RoomTypeName:'',//户型
                    Rental:this.rentVal,//租金
                },
                Page:this.page,
                Rows:this.pageSize,
            }
            this.$axios.post(`/api/PStruct/GetPublishRoomType`,params).then(response => {//社区数据列表
                switch(response.data.StatusCode){
                    case 500 :
                        this.$message.error('房源列表请求失败'+response.Info)
                        break;
                    case 200:
                        if(response.data.Data.Rows == '' || response.data.Data.Rows == null || response.data.Data.Rows == []){
                            this.list = []
                        }else{
                            this.list = response.data.Data.Rows
                        }
                        console.log(response.data.Data.Total)
                        this.listsTotal = response.data.Data.Records
                    break;
                }
                this.loading = false
            }).catch( error=> {
                this.$message.error(error);
            });
        }
    },
    created(){
        console.log(this.listsData)
    }
}
</script>
<style lang="scss">
</style>
