<template>
    <div class="wrapper2">
        <div class="user-center rel clearfix">
            <p class="fl CRed fs24 rel" style="top:29px;">{{$store.state.userinfo.Name}}</p>
            <div class="fl fs14 user-center-info">
                <p>
                    <label class="inline-b C80">手机号码</label>
                    <span class="C3">{{$store.state.userinfo.Phone}}</span>
                </p>
                <p class="pt15">
                    <label class="inline-b C80">身份证号码</label>
                    <span class="C3">{{$store.state.userinfo.IDCard}}</span>
                </p>
                <p class="pt15">
                    <label class="inline-b C80">电子邮箱</label>
                    <span class="C3">{{$store.state.userinfo.EMail}}</span>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    middleware:'auth',
    head() {
        return {
            title: "个人中心"
        }
    },
    async asyncData ({app}) {
        app.store.dispatch('SET_ACTIVEINDEX', '3');
    },
    data(){
        return {}
    },
    mounted(){
    },
}
</script>
<style lang="scss">
.user-center{
    box-shadow:0px 0px 10px #fdecf5;
    border-radius: 10px;
    padding:90px 145px;
    top:140px;
    .user-center-info{
        margin-left:100px;
        label{
            width:100px;
            margin-right: 10px;
        }
    }
}
</style>
