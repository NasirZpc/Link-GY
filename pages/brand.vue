<template>
    <div class="brand-wrap" ref="page">
        <div class="brand-header rel">
            <img :src="detail.MainPic">
            <div class="abs"></div>
            <p class="abs tc CF">LINK新界</p>
        </div>
        <div class="wrapper2">
            <p class="fs20 C0 tc pt60">{{detail.FullHead}}</p>
            <div class="pt40 pb40 C3 fs16" v-html="detail.NewsContent"></div>
        </div>
    </div>
</template>
<script>
export default{
    head() {
        return {
            title: "品牌介绍"
        }
    },
    async asyncData ({app}) {
        let [detailRes] = await Promise.all([
                app.$axios.post(`/api/SowingMap/QueryInfo`,{
        			QueryJson:{
        				"Type":4,
        				"Id":''
        			}
        		}),
            ])
        let detail = detailRes.data.Data
        return {detail}
    },
    data(){
        return {
            detail:''
        }
    },
    mounted(){
		this.$refs.page.style.minHeight = document.documentElement.clientHeight - 480+'px'
    },
}
</script>
<style lang="scss" scoped>
.brand-wrap{
    .brand-header{
        >img{
            width:100%;
        }
        >div{
            top:0;
            left:0;
            bottom:0;
            right:0;
            z-index: 1;
            background: rgba(0,0,0,0.5)
        }
        >p{
            width:160px;
            height:60px;
            line-height: 60px;
            top:50%;
            left:50%;
            margin-left:-80px;
            margin-top:-30px;
            z-index: 2;
            font-size:28px;
        }
    }
}
</style>
