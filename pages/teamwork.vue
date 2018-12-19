<template>
    <div class="teamwork-wrap" ref="page">
        <div class="teamwork-header rel">
            <img src="../static/teamwork-1.png">
        </div>
        <img src="../static/teamwork-2.png" class="teamwork-logo block">
        <div class="teamwork-cont rel pb100">
            <img src="../static/teamwork-3.png">
            <div class="abs C6">
                <p>
                    <fa :icon="['fas','map-marker']" class="mr20 C9"/>
                    <span>上海市松江区乐都路262号2号楼（在“派米雷·乐都”内）</span>
                </p>
                <p class="pt15">
                    <fa :icon="['fas','phone']" class="mr20 C9" style="transform:rotate(90deg);"/>
                    <span>400-9999-719</span>
                </p>
                <p class="pt15">
                    <fa :icon="['fas','envelope']" class="mr20 C9"/>
                    <span>linkxinjie@premier-park.com</span>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    head() {
        return {
            title: "合作联系"
        }
    },
    async asyncData ({app}) {
        let [detailRes] = await Promise.all([
                app.$axios.post(`/api/SowingMap/QueryInfo`,{
        			QueryJson:{
        				"Type":5,
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
    .teamwork-wrap{
        .teamwork-header,.teamwork-cont{
            img{
                width:100%;
            }
        }
        .teamwork-logo{
            width:300px;
            margin:60px auto;
        }
        .teamwork-cont{
            >div{
                padding:30px 24px;
                width:510px;
                height:100px;
                background: #fff;
                z-index:1;
                bottom:160px;
                left:50%;
                border-left:3px solid #d90068;
                margin-left:-280px;
            }
        }
    }
</style>
