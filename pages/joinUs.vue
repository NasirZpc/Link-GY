<template>
    <div class="joinUs-wrap" ref="page">
        <div class="joinUs-header rel">
            <img :src="detail.MainPic">
        </div>
        <div class="wrapper2 pb100">
            <div class="pt40 C0 fs16" v-html="detail.NewsContent"></div>
        </div>
    </div>
</template>
<script>
export default{
    head() {
        return {
            title: "LINK新界-加入我们"
        }
    },
    async asyncData ({app}) {
        app.store.dispatch('SET_ACTIVEINDEX', '3');
        let [detailRes] = await Promise.all([
                app.$axios.post(`/SowingMap/QueryInfo`,{
        			QueryJson:{
        				"Type":7,
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
.joinUs-wrap{
    .joinUs-header{
        img{
            width:100%;
        }
    }
}
</style>
