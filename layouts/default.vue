<template>
    <el-container class="layout-default">
        <el-header style="height:60px;" :style="{ background: 'rgba(255, 255, 255, '+(progress/100)+')' }">
            <my-header/>
        </el-header>
        <el-main id="page">
            <nuxt class="m-main" ref="page" />
        </el-main>
        <el-footer style="height:420px;">
            <my-footer/>
        </el-footer>
        <!-- <button class="back-top" @click="backTop(step)" :class="{show:isActive}">
            <fa :icon="['fas','arrow-circle-up']" class="fs30 CRed"/>
            <span class="CRed fs16">返回顶部</span>
        </button> -->
    </el-container>
</template>

<script>
import MyHeader from '@/components/public/header.vue'
import MyFooter from '@/components/public/footer.vue'
export default {
    components: {
        MyHeader,
        MyFooter
    },
    props:{
        step:{   //此数据是控制动画快慢的
            type:Number,
            default:50
        }

    },
    data(){
        return {
            progress:50,
            isActive:false
        }
    },
    methods:{
        backTop(i){
            if(document.documentElement.scrollTop){
                document.documentElement.scrollTop-=i;
                if (document.documentElement.scrollTop>0) {
                    var c=setTimeout(()=>this.backTop(i),16);
                }else {
                    clearTimeout(c);
                }
            }else{
                document.body.scrollTop-=i;
                if (document.body.scrollTop>0) {
                    var c=setTimeout(()=>this.backTop(i),16);
                }else {
                    clearTimeout(c);
                }
            }

        }
    },
    mounted(){
        document.getElementById('page').style.minHeight = document.documentElement.clientHeight - 420+'px'
        var that = this
        window.addEventListener('scroll', function(){
            //headerbar 是否隐藏
            if(this.scrollY/100<=0.5){
                that.progress = 50
            }else{
                that.progress = this.scrollY
            }
            //回到顶部
            if(this.scrollY>100){
                that.isActive=true;
            }else{
                that.isActive=false;
            }
        });
    },
}
</script>
<style lang="scss">
@import "@/assets/css/public/layout.scss";
</style>
