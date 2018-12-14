<template>
<div>
    <el-container class="layout-default">
        <el-header style="height:60px;">
            <my-header/>
        </el-header>
        <el-main>
            <nuxt class="m-main" />
        </el-main>
        <el-footer>
            <my-footer/>
        </el-footer>
    </el-container>
</div>
</template>

<script>
import MyHeader from '@/components/public/header.vue'
import MyFooter from '@/components/public/footer.vue'
export default {
    components: {
        MyHeader,
        MyFooter
    }
}
</script>
<style lang="scss">
@import "@/assets/css/public/layout.scss";
</style>
