<template>
<header class="m-header">
    <el-row :gutter="0">
        <el-col :span="6" style="height:60px;">
            <a href="javascript:;" class="block" @click="clickLogo">
                <img class="index-logo rel" src="~/assets/img/logo.png">
            </a>
        </el-col>
        <el-col :span="13" :offset="5" class="tr clearfix" style="height:60px;">
            <el-menu class="el-menu-demo index-nav rel" mode="horizontal"  @select="handleSelect" :default-active="getActiveIndex">
                <el-menu-item index="0">
                    <nuxt-link to="/">首页</nuxt-link>
                </el-menu-item>
                <el-menu-item index="1">
                    <nuxt-link to="/houseLists">房源</nuxt-link>
                </el-menu-item>
                <el-menu-item index="2">
                    <nuxt-link to="/newsLists">新闻</nuxt-link>
                </el-menu-item>
                <el-submenu index="3">
                    <template slot="title" class="second-nav">关于我们</template>
                    <el-menu-item index="3-1">
                        <nuxt-link to="/brand">品牌介绍</nuxt-link>
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
    data(){
        return {}
    },
    computed : {
        getActiveIndex(){
            // console.log(this.$store.getters.activeIndex)
            return this.$store.getters.activeIndex
        },
    },
    watch: {
        getActiveIndex(val) {
            // console.log(val)
            return val
        }
    },
    methods:{
        handleSelect(key, keyPath) {
            // this.$store.commit('SET_ACTIVEINDEX',key)
            this.$cookies.set('activeIndex',key)
        },
        clickLogo(){
            this.$store.dispatch('SET_ACTIVEINDEX','0')
            this.$cookies.set('activeIndex','0')
            this.$router.push({path:'/'})
        },
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
    },
    created(){},
    //请求个人数据，确认登录
    async mounted(){
        console.log(this.$cookies.get('linkId'))
        if(this.$cookies.get('linkId')){
            await this.$axios.post('/Member/QueryInfo',{//获取个人信息
                AccountId:this.$cookies.get('linkId')
            }).then(res=>{
                this.$store.commit('SET_USERINFO',res.data.Data)
            })
        }
    }
}
</script>
<style lang="scss">
@import "@/assets/css/public/header.scss";
</style>
