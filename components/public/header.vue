<template>
<header class="m-header">
    <el-row :gutter="0">
        <el-col :span="6" style="height:60px;">
            <nuxt-link to="/">
                <img class="index-logo rel" src="~/assets/img/logo.png">
            </nuxt-link>
        </el-col>
        <el-col :span="11" :offset="7" class="tr clearfix" style="height:60px;">
            <el-menu class="el-menu-demo index-nav rel" mode="horizontal">
                <el-menu-item index="1">
                    <nuxt-link to="/houseLists">房源</nuxt-link>
                </el-menu-item>
                <el-menu-item index="2">
                    <nuxt-link to="/newsLists">新闻</nuxt-link>
                </el-menu-item>
                <el-submenu index="3">
                    <template slot="title" class="second-nav">关于我们</template>
                    <el-menu-item index="3-1">
                        <nuxt-link to="/brands">品牌介绍</nuxt-link>
                    </el-menu-item>
                    <el-menu-item index="3-2">
                        <nuxt-link to="/teamwork">合作联系</nuxt-link>
                    </el-menu-item>
                    <el-menu-item index="3-3">
                        <nuxt-link to="/joinUs">加入我们</nuxt-link>
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="4" v-if="$store.state.userinfo">
                    <template slot="title" class="second-nav">您好，{{$store.state.userinfo.Name}}</template>
                    <el-menu-item index="4-1">
                        <nuxt-link to="/userCenter">个人中心</nuxt-link>
                    </el-menu-item>
                    <el-menu-item index="4-2">
                        <a href="javascript:;" @click="logOut">退出</a>
                    </el-menu-item>
                </el-submenu>
                <template v-else>
                    <el-menu-item index="4">
                        <nuxt-link to="/login">登录</nuxt-link>
                    </el-menu-item>
                    <el-menu-item index="5">
                        <nuxt-link to="/register">注册</nuxt-link>
                    </el-menu-item>
                </template>
            </el-menu>
        </el-col>
    </el-row>
</header>
</template>
<script>
export default {
    methods:{
        logOut(){
            this.$confirm('是否退出?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                    type: 'warning'
            }).then(() => {
                this.$router.push('/exit')
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        }
    }
}
</script>
<style lang="scss">
@import "@/assets/css/public/header.scss";
</style>
