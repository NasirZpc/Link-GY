<template>
    <section class='m-index'>
        <div class="rel index-header">
            <!-- banner -->
            <div v-swiper:mySwiper="swiperOption1">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,index) in banners" :key="index">
                        <nuxt-link :to="`/newsDetail/${item.Id}`" v-if="item.Type == 1"><!-- 新闻 -->
                            <img :src="item.Image">
                        </nuxt-link>
                        <nuxt-link to v-else-if="item.Type == 2"><!-- 公告 -->
                            <img :src="item.Image">
                        </nuxt-link>
                        <nuxt-link to v-else-if="item.Type == 4"><!-- 品牌介绍 -->
                            <img :src="item.Image">
                        </nuxt-link>
                        <nuxt-link to v-else-if="item.Type == 5"><!-- 合作联系 -->
                            <img :src="item.Image">
                        </nuxt-link>
                        <nuxt-link to v-else-if="item.Type == 7"><!-- 计加入我们 -->
                            <img :src="item.Image">
                        </nuxt-link>
                        <img :src="item.Image" v-else>
                    </div>
                </div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
            </div>
            <div class="search-wrap abs bg-white clearfix">
                <el-input placeholder="请输入相关门店" class="fs16 fl" v-model="indexSearch" clearable></el-input>
                <el-button type="primary" class="fl fs16" @click="indexSearchFunc">搜索</el-button>
            </div>
        </div>
        <div class="index-content pt100 wrapper">
            <p class="fs24 bold">LINK新界</p>
            <div class="clearfix index-introduct">
                <div class="fl C80 fs16 pt40">
                    <p>“LINK新界”是派米雷集团打造的长租公寓品牌，是集线上“租房平台”和线下“租赁社区”于一体的长租公寓综合服务商。以“创享新生活”为愿景，“工作+生活”为理念，融创业、居住、社交、共享四大场景于一体，给追梦人一个温馨的家——梦在哪，家就在哪。</p>
                </div>
                <img class="fr" src="../static/img1.png">
            </div>
            <!-- 门店介绍 -->
            <p class="fs24 bold pt100">推荐项目</p>
            <div v-swiper:mySwiper2="swiperOption2" class="pt40 store-introduct">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,index) in storeLists" :key="index">
                        <nuxt-link :to="`/storeDetail/${item.Id}`">
                            <img :src="item.MainPic">
                            <div class="tc">
                                <p class="C0 fs20">{{item.AllName}}</p>
                                <p class="fs14 C9c pt10">{{item.TownshipName}}</p>
                            </div>
                        </nuxt-link>
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
            <!-- LINK新界的合作伙伴 -->
            <p class="fs24 bold pt100">推荐户型</p>
            <div v-swiper:mySwiper3="swiperOption3" class="pt40 index-teamwork">
                <div class="swiper-wrapper clearfix">
                    <div class="swiper-slide bg-white" v-for="(item,index) in teamwork" :key="index">
                        <nuxt-link :to="`/houseDetail/${item.Id}`">
                            <img :src="item.MainPic">
                            <div class="tc">
                                <p class="C0 fs20">{{item.PropertyName}}&nbsp;&nbsp;&nbsp;{{item.Name}}</p>
                                <p class="fs14 C9c pt10">{{item.TownshipName}}{{item.PropertyAddress}}</p>
                            </div>
                        </nuxt-link>
                    </div>
                </div>
            </div>
            <!-- 选择我们的理由 -->
            <div class="select-us bg-white mt100">
                <p class="fs24 bold">选择我们的理由</p>
                <ul class="pt40 clearfix">
                    <li class="fl">
                        <img src="../static/select-us-1.png">
                        <p class="C0 fs20 pt15">社区配套</p>
                        <p class="fs14 C80 pt15">便捷：地理位置优越，商圈配套成熟，生活设施完备。舒适：金牌管家服务，绿色智能社区，高端生活配置。安全：24小时智能安防，社区化日常管理。</p>
                    </li>
                    <li class="fl">
                        <img src="../static/select-us-2.png">
                        <p class="C0 fs20 pt15">微厢</p>
                        <p class="fs14 C80 pt15">为身处社区的你提供便捷、贴心的社区共享服务。比如共享洗衣房、自动售卖机、咖啡机、书架、健身室、体检室、活动室、工作室、党员之家等功能。即使足不出户也能享受便利生活。</p>
                    </li>
                    <li class="fl">
                        <img src="../static/select-us-3.png">
                        <p class="C0 fs20 pt15">会员系统</p>
                        <p class="fs14 C80 pt15">社区的租客群体会自动纳入LINK新界会员系统。会员可享受社区不定期推出的各种优惠项目（包括各品牌美食折扣、音乐节或展览免费入场券等）。福利多多！</p>
                    </li>
                    <li class="fl">
                        <img src="../static/select-us-4.png">
                        <p class="C0 fs20 pt15">城市服务</p>
                        <p class="fs14 C80 pt15">社区租客可以在“城市服务”下得到包含社保服务、医疗服务、公告服务、教育、就业中心等20项民生公共服务。实现全流程、闭环式的移动端办事服务，为生活工作带来切切实实的便利。</p>
                    </li>
                </ul>
            </div>
            <!-- 新闻 -->
            <p class="fs24 bold pt100">新闻</p>
            <ul class="pt40 store-introduct clearfix news-lists">
                <li class="fl bg-white" v-for="(item,index) in news" :key="index">
                    <nuxt-link :to="`/newsDetail/${item.Id}`">
                        <img :src="item.MainPic">
                        <div class="">
                            <p class="C0 fs18 tc ellipsis">{{item.FullHead}}</p>
                            <p class="fs14 C9c pt10 ellipsis" v-html="item.NewsContent"></p>
                        </div>
                    </nuxt-link>
                </li>
            </ul>
            <a href="javascript:;" class="more-news-btn tc" @click="moreNews">
                <el-button type="primary" class="fs16">MORE</el-button>
            </a>
        </div>
    </section>
</template>
<script>
export default {
    data(){
        return {
            banners:[],
            swiperOption1: {
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            },
            indexSearch:'',
            storeLists:[],
            swiperOption2:{
                slidesPerView: 3,
                // spaceBetween:30,
                autoplay: true,
                // loop:true
            },
            teamwork:[],
            swiperOption3: {
                slidesPerView: 2,
                spaceBetween: 35,
                autoplay: true,
                // loop:true
            },
            news:[]
        }
    },
    async asyncData ({app}) {
        let [bannerRes,storeListsRes,teamworkRes,newsRes] = await Promise.all([
            app.$axios.post(`/SowingMap/QueryList`,{"QueryJson":{"Category":2}}),//轮播图
            app.$axios.post(`/PStruct/GetHotPStruct`,{Type:1,Rows:4,BusinessType:'GY'}),//门店介绍
            app.$axios.post(`/PStruct/GetHotPStruct`,{Type:4,BusinessType:"GY",Rows:"10",ObjectId:""}),//Link新界合作伙伴
            app.$axios.post(`/SowingMap/HomePush`,{}),//新闻
        ])
        let banners = bannerRes.data.Data
        let storeLists = storeListsRes.data.Data
        let teamwork = teamworkRes.data.Data
        let news = newsRes.data.Data.Rows
        return {banners,storeLists,teamwork,news}
    },
    methods:{
        moreNews(){
            this.$store.dispatch('SET_ACTIVEINDEX', '2');
            this.$cookies.set('activeIndex','2')
            this.$router.push({path:'/newsLists'})
        },
        indexSearchFunc(){
            if(this.indexSearch !="" && !this.isNull(this.indexSearch)){
                this.$router.push({path:'/houseLists',query: {search: this.indexSearch}})
            }else{
                this.$message({
                    message: '请输入关键字',
                    type: 'warning'
                });
            }
        },
        isNull( str ){
            var regu = "^[ ]+$";
            var re = new RegExp(regu);
            return re.test(str);
        },
    }
}
</script>
<style lang="scss">
@import "@/assets/css/index.scss";
</style>
