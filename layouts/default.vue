<template>
    <el-container class="layout-default">
        <el-header style="height:60px;" :style="{ background: 'rgba(255, 255, 255, '+(progress/100)+')' }">
            <my-header/>
        </el-header>
        <el-main>
            <nuxt class="m-main" />
        </el-main>
        <el-footer style="height:420px;">
            <my-footer/>
        </el-footer>
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
    data(){
        return {
            progress:50
        }
    },
    mounted(){
        var that = this
        window.addEventListener('scroll', function(){
            if(this.scrollY/100<=0.5){
                that.progress = 50
            }else{
                that.progress = this.scrollY
            }

        })
    },
}
</script>
<style lang="scss">
@import "@/assets/css/public/layout.scss";
</style>
