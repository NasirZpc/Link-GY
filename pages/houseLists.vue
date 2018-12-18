<template>
    <section class="houseLists-wrap pt60 wrapper2" ref="houseListsPage">
        <ul class="clearfix tab fs16 C0 bold pt60">
            <li class="fl pointer" :class="{active:isActive}" @click="houseListTap(1)">社区</li>
            <li class="fl pointer" :class="{active:!isActive}" @click="houseListTap(2)">户型</li>
        </ul>
        <div class="pt40 pb40">
            <house-store v-if="isActive" :screen-data="regionScreen" :lists-data="villageLists" :search-val="searchVal"/>
            <house-type v-else :region-screen="regionScreen" :village-screen="screenVillageLists" :lists-data="houseTypeLists" :village-id="villageId"/>
        </div>
    </section>
</template>
<script>
import HouseStore from '@/components/houseStore.vue'
import HouseType from '@/components/houseType.vue'
export default {
    components: {
        HouseStore,
        HouseType
    },
    data(){
        return {
            isActive:true,
            searchVal:'',
            screenVillageLists:[],//社区数据筛选列表
            villageLists:{},//社区数据列表

            villageId:'',
            regionScreen:[],//区域筛选数据
            rentScreen:[],//租金筛选数据
            houseTypeLists:{}
        }
    },
    async asyncData ({app}) {
        var villageId = ''
        var isActive = true
        var searchVal = ''
        if(app.context.route.query.id){
            villageId = app.context.route.query.id;
            isActive = false
        }
        if(app.context.route.query.search){
            searchVal = app.context.route.query.search
            isActive =true
        }
        let [screenVillageListsRes,villageListsRes,regionScreenRes,houseTypeListsRes] = await Promise.all([
                app.$axios.post(`/api/PStruct/QueryToCPStruct`,{QueryJson:{Type:1}}),//社区数据筛选列表
                app.$axios.post(`/api/PStruct/QueryToCPStruct`,{QueryJson:{KeyWord:searchVal,AreaId:'',RoomState:1,},Page:1,Rows:10}),//社区数据列表
                app.$axios.post(`/api/PStruct/GetAreaList`,{CityCode:"310100",AreaCode:"",Type:2}),//区域筛选数据
                app.$axios.post(`/api/PStruct/GetPublishRoomType`,{QueryJson:{KeyWord : '',AreaId:'',PropertyId:villageId,RoomTypeName:'',Rental:'',},Page:1,Rows:10,}),//户型数据列表
            ])
            var screenVillageLists_data = [{
                villageName:'全部',
                PStructId:null,
                isActive:true
            }]
            for(var i =0;i<screenVillageListsRes.data.Data.Rows.length;i++ ){
                screenVillageLists_data.push({
                    villageName: screenVillageListsRes.data.Data.Rows[i].Name,
                    PStructId  : screenVillageListsRes.data.Data.Rows[i].PropertyId,
                    isActive   : false
                })
            }
            let screenVillageLists = screenVillageLists_data
            let villageLists = villageListsRes.data.Data
            console.log(villageLists)
            var regionScreenRes_data = [{
                AreaName:'全部',
                AreaId:null,
                isActive:true
            }]
            for(var i =0;i<regionScreenRes.data.Data.length;i++ ){
                regionScreenRes_data.push({
                    AreaName: regionScreenRes.data.Data[i].AreaName,
                    AreaId  : regionScreenRes.data.Data[i].AreaId,
                    isActive   : false
                })
            }
            let regionScreen = regionScreenRes_data

            let houseTypeLists = houseTypeListsRes.data.Data
            return {screenVillageLists,villageLists,regionScreen,houseTypeLists,isActive,villageId,searchVal}
    },
    methods:{
        houseListTap(idx){
            idx==1? this.isActive = true : this.isActive = false
        },
    },
    mounted(){
		this.$refs.houseListsPage.style.minHeight = document.documentElement.clientHeight - 480+'px'
    },
}
</script>
<style lang="scss">
@import "@/assets/css/houseLists.scss";
</style>
