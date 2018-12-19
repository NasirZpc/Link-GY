<template>
    <div class="pt60 wrapper newsDetail">
        <p class="pt60 fs22 C0">{{detail.FullHead}}</p>
        <p class="pt10 fs14 C80">{{detail.CreateDate}}</p>
        <div class="pt40 pb40 C3 fs16 news-detail-cont" v-html="detail.NewsContent"></div>
    </div>
</template>
<script>
export default{
    head() {
        return {
            title: this.detail.FullHead
        }
    },
    async asyncData ({app}) {
        let [detailRes] = await Promise.all([
                app.$axios.post(`/api/SowingMap/QueryInfo`,{
        			QueryJson:{
        				"Type":1,
        				"Id": app.context.route.params.id
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

    },
}
</script>
<style lang="scss">
.newsDetail{
    .news-detail-cont{
        img{
            width:100%!important;
            height:auto;
        }
    }
}
</style>
