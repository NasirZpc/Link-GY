<template>
    <div class="brand-wrap">
        <div class="brand-header rel">
            <img :src="detail.MainPic">
            <div class="abs"></div>
            <p class="abs tc CF">LINK新界</p>
        </div>
        <div class="wrapper2">
            <p class="fs20 C0 tc pt100">{{detail.FullHead}}</p>
            <div class="pt40 C3 fs16" v-html="detail.NewsContent"></div>

            <div class="brand-section-1 pt60">
                <p class="brand-tit C0 fs20 rel">派米雷集团</p>
                <div class="clearfix pt60 rel">
                    <img class="fl" src="../static/brand-1.png">
                    <p class="fs14 CF fl brand-section-1-cont abs"><span class="fs18">派米雷</span> 产业转型城市更新的践行者上海派米雷投资（集团）有限公司是一家综合性投资集团公司，主要以产业园区、城市更新、长租公寓的投资运营为核心，业务涵盖联合办公、社交共享、精品酒店等板块，提供城市有机更新和产城融合发展一体化运营解决方案。</p>
                </div>
            </div>
            <ul class="clearfix pb40 brand-section-2 pt100">
                <li class="fl">
                    <p class="brand-tit tc C0 fs20 rel">产业园区</p>
                    <p class="C80 fs14 pt40 brand-section-2-cont">派米雷产业园区包括，以服务于高端制造为主的工业园，和以服务于研发总部、生产性服务空间为主的科技园。派米雷产业园区以产业为核心，以产城融合为理念，以信息技术、生物科技、人工智能、数字创意、新材料、新能源等六大战略新兴产业为引领的综合性智慧园区。</p>
                    <img src="../static/brand-2.png">
                </li>
                <li class="fl">
                    <p class="brand-tit tc C0 fs20 rel">城市更新</p>
                    <p class="C80 fs14 pt40 brand-section-2-cont">派米雷城市更新以存量盘活为抓手，立足产业转型升级、城市功能完善、区域形象提升、历史人文传承四个维度，将产业服务融入城市发展，实现工业遗址与文脉的保护传承、城市功能的丰富、城市空间的共享和存量资产的盘活升值</p>
                    <img src="../static/brand-3.png">
                </li>
                <li class="fl">
                    <p class="brand-tit tc C0 fs20 rel">长租公寓</p>
                    <p class="C80 fs14 pt40 brand-section-2-cont">派米雷经过多年在产业领域内的探索与积累，已形成了从市场研究、策划、推广、招商、运营等于一体的成熟服务团队，以产业园区、城市更新及长租公寓为载体，以企业服务、资产管理为导向，为企业提供创投孵化、企业服务、产业金融等平台支持。</p>
                    <img src="../static/brand-4.png">
                </li>
            </ul>
        </div>
        <img class="pt60" src="../static/brand-5.png" style="width:100%;">
        <div class="wrapper2 pb40 brand-section-3 pb100">
            <p class="brand-tit pt40 C0 fs20 rel tc">招商运营</p>
            <p class="C0 fs14 C80 pt40 brand-section-3-cont">
                派米雷经过多年在产业领域内的探索与积累，已形成了从市场研究、策划、推广、招商、运营等于一体的成熟服务团队，以产业园区、城市更新及长租公寓为载体，以企业服务、资产管理为导向，为企业提供创投孵化、企业服务、产业金融等平台支持。
            </p>
            <p class="C0 fs14 C80 pt20 brand-section-3-cont">知行合一，成人达己。派米雷在成长过程中，不断推陈出新，在开拓项目的同时，始终坚持优化商业模式，整合优质资源，创新发展之路。未来，随着中国经济发展新常态和城市发展新路径，派米雷将立足上海，布局全国，持续助力经济转型升级、城市创新发展，为实现2020年“百亿派米雷”阶段目标和更大的梦想而奋斗，致力于成为中国卓越的产城运营商。</p>
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
.brand-tit{
    width:100px;
    padding-bottom: 10px;
    margin-left:auto;
    margin-right:auto;
}
.brand-tit:after{
    content:"";
    display: block;
    width:64px;
    height:3px;
    background:#00295f;
    position: absolute;
    bottom:0px;
    left:50%;
    margin-left:-32px;
}
.brand-section-1{
    img{
        width:582px;
        height:534px;
    }
    .brand-section-1-cont{
        width:400px;
        height:220px;
        padding:80px 120px;
        background: rgba(0,41,95,0.6);
        right:40px;
        top:50%;
        margin-top:-160px;
        line-height: 44px;
    }
}
.brand-section-2{
    li{
        width:33.33%;
        .brand-section-2-cont{
            padding:40px 40px 0;
            height:210px;
            line-height: 30px;
            text-indent: 2em;
        }
    }
}
.brand-section-3{
    margin-top: -30px;
    .brand-tit{
        margin:0;
    }
    .brand-section-3-cont{
        text-indent: 2em;
    }
}
</style>
