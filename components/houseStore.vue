<template>
    <div class="house-store">
        <ul class="clearfix screen clearfix">
            <li v-for="(item,index) in screenData" @click="screenHouseStore(item.AreaName,index,item.AreaId)" :class="{active:item.isActive}">
                {{item.AreaName}}
            </li>
        </ul>
        <div v-loading="loading">
            <p class="noDataText tc fs16 CRed pt40" v-show='list.length == 0'>无数据!&nbsp;&nbsp;-_-!!!</p>
            <ul class="house-store-lists">
                <li v-for="(item,index) in list" :key="index">
                    <nuxt-link :to="`/storeDetail/${item.Id}?num=${item.RoomTypeCount}`" class="clearfix">
                        <img :src="item.MainPic " class="fl" :alt="item.FullHead">
                        <div class="fl">
                            <p class="fs20 C0">{{item.Name}}</p>
                            <p class="C80 fs16 pt15">
                                <i class="el-icon-location-outline mr10"></i>
                                <span>{{item.RegionName}}{{item.Address}}</span>
                            </p>
                            <p class="C80 fs16 pt10">
                                <fa :icon="['fab','gg']" class="mr10"/>
                                <span>{{item.RoomTypeCount}}种户型</span>
                            </p>
                            <p class="C80 fs16 pt10">
                                <fa :icon="['fas','phone']" class="mr10 C9" style="transform:rotate(90deg);"/>
                                <span>400-999-9719</span>
                            </p>
                            <p class="C80 fs16 pt10 ">
                                <fa :icon="['fas','university']" class="mr10 C9"/>
                                <span>{{item.Memo | textFilter}}</span>
                            </p>
                        </div>
                    </nuxt-link>
                </li>
            </ul>
            <!-- 工具条 -->
            <el-pagination v-show='list.length != 0' class="tc pt40"
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
        screenData:{
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
        searchVal:{
            type:String,
            default:()=>{
                return {}
            }
        },
    },
    data(){
        return {
            loading:false,
            page : 1,
            pageSize : 10,
            AreaId:'',
            list:this.listsData.Data || [],
            listsTotal:this.listsData.RowCount
        }
    },
    filters:{
        textFilter(val){
            if(val.length>60){
                return val.slice(0,70) +'......'
            }else{
                return val
            }
        }
    },
    methods:{
        screenHouseStore(name,idx,id){
            this.AreaId = id
            for(var i = 0;i<this.screenData.length;i++){
                this.screenData[i].isActive = false
            }
            this.screenData[idx]['isActive'] = true;
            this.getVillageListsFunc()
        },
        //改变当前页数
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.page = val
            this.loading = true;
            this.getVillageListsFunc()
        },
        getVillageListsFunc(){
            this.loading = true
            var params = {
                PageIndex:this.page,
                PageSize:this.pageSize,
                SortName:"",
                IsASC:true,
                AreaId:this.AreaId,
                KeyWord:this.searchVal
            }
            this.$axios.post(`/Property/QueryPropertyList`,params).then(response => {//社区数据列表
                switch(response.data.Status){
                    case 500 :
                        this.$message.error('门店列表请求失败'+response.Info)
                        break;
                    case 200:
                        if(response.data.Data.Data == '' || response.data.Data.Data == null || response.data.Data.Data == []){
                            this.list = []
                        }else{
                            this.list = response.data.Data.Data
                        }
                        this.listsTotal = response.data.Data.RowCount
                        break;
                }
                this.loading = false
            }).catch( error=> {
                this.$message.error(error);
            });
        }
    }
}
</script>
<style lang="scss">
</style>
