<template>
    <section class="houseLists-wrap pt60 wrapper2" ref="houseListsPage">
        <ul class="clearfix tab fs16 C0 bold pt60">
            <li class="fl pointer" :class="{active:isActive == 1}" @click="houseListTap(1)">社区</li>
            <li class="fl pointer" :class="{active:isActive == 2}" @click="houseListTap(2)">户型</li>
        </ul>
        <div class="pt40 pb40">
            <house-store v-if="isActive == 1" :screen-data="regionScreen" :lists-data="villageLists" :search-val="searchVal"/>
            <house-type  v-if="isActive == 2" :region-screen="regionScreen" :village-screen="screenVillageLists" :lists-data="houseTypeLists" :village-id="villageId"/>
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
    head() {
        return {
            title: "link新界-房源列表"
        }
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
        var isActive = app.context.store.getters.houseActive
        var searchVal = ''
        if(app.context.route.query.id){
            villageId = app.context.route.query.id;
            isActive = 2
        }
        if(app.context.route.query.search){
            searchVal = app.context.route.query.search
            isActive =1
        }
        let [screenVillageListsRes,villageListsRes,regionScreenRes,houseTypeListsRes] = await Promise.all([
                app.$axios.post(`/Property/QueryPropertyList`,{
                    PageIndex:1,
                	PageSize:100,
                	SortName:"",
                	IsASC:true,
                	AreaId:"",
                	KeyWord:""
                }),//社区数据筛选列表
                app.$axios.post(`/Property/QueryPropertyList`,{
                	PageIndex:1,
                	PageSize:10,
                	SortName:"",
                	IsASC:true,
                	AreaId:"",
                	KeyWord:searchVal
                }),//社区数据列表
                app.$axios.post(`/PStruct/GetAreaList`,{CityCode:"310100",AreaCode:"",Type:2}),//区域筛选数据
                app.$axios.post(`/RoomType/QueryRoomTypeList`,{
                    PageIndex:1,
                	PageSize:10,
                	SortName:"",
                	IsASC:true,
                	AreaId:"",
                	KeyWord:"",
                	PropertyId:villageId,
                	Rental:""
                }),//户型数据列表
            ])
            var screenVillageLists_data = [{
                villageName:'全部',
                PStructId:null,
                isActive:true
            }]
            for(var i =0;i<screenVillageListsRes.data.Data.Data.length;i++ ){
                screenVillageLists_data.push({
                    villageName: screenVillageListsRes.data.Data.Data[i].Name,
                    PStructId  : screenVillageListsRes.data.Data.Data[i].Id,
                    isActive   : false
                })
            }
            let screenVillageLists = screenVillageLists_data
            let villageLists = villageListsRes.data.Data
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
            idx==1? this.isActive = 1 : this.isActive = 2
            this.$store.commit('SET_HOUSEACTIVE',idx)
            this.$cookies.set('houseActive',idx)
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
