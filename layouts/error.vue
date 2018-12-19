<template>
    <div class="container error-wrap rel" ref="page">
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="text-wrap tc rel">
            <h1 class="CRed" v-if="error.statusCode === 404">页面不存在</h1>
            <h1 class="CRed" v-else>Error</h1>
            <nuxt-link class="back-home CRed tc " to="/">返 回 首 页<i class="el-icon-arrow-right rel"></i></nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
    props: ['error'],
    layout: 'blank',
    mounted(){
		this.$refs.page.style.minHeight = document.documentElement.clientHeight+'px'
    },
}
</script>
<style lang="scss">
.error-wrap{
    background: url(../static/main-bg.png) no-repeat;
    background-size:cover;
    background-position:0 50px;
    .text-wrap{
        top:400px;
        h1{
            font-size: 100px;
            font-weight:bold;
            text-shadow: 0 30px 10px rgba(0,0,0,0.15);
        }
        a{
            display: inline-block;
            font-size:22px;
            text-shadow: 0 30px 10px rgba(0,0,0,0.15);
            margin-top:30px;
            &:hover,&:active,&:focus{
                color:#d90068;
            }
            i{
                top:1px;
            }
        }
    }
}
.bubble,.bubble:before,.bubble:after{
    background: linear-gradient(#EC5DC1,#d90068);
    border-radius: 50%;
    box-shadow: 0 30px 15px rgba(0,0,0,0.15);
    position: absolute;
}
.bubble:before, .bubble:after {
    content: '';
}
.bubble:nth-of-type(1){
    top: 15vh;
    left: 15vw;
    height: 22vmin;
    width: 22vmin;
}
.bubble:nth-of-type(1):before {
    width: 13vmin;
    height: 13vmin;
    bottom: -25vh;
    right: -10vmin;
}
.bubble:nth-of-type(2) {
    top: 20vh;
    left: 38vw;
    height: 10vmin;
    width: 10vmin;
}
.bubble.bubble:nth-of-type(2):before {
    width: 5vmin;
    height: 5vmin;
    bottom: -10vh;
    left: -8vmin;
}
.bubble:nth-of-type(3) {
    top: 12vh;
    right: 30vw;
    height: 13vmin;
    width: 13vmin;
}
.bubble:nth-of-type(3):before{
    width: 3vmin;
    height: 3vmin;
    bottom: -15vh;
    left: -18vmin;
    z-index: 6;
}
.bubble:nth-of-type(4) {
    top: 25vh;
    right: 18vw;
    height: 18vmin;
    width: 18vmin;
}
.bubble:nth-of-type(4):before{
    width: 7vmin;
    height: 7vmin;
    bottom: -10vmin;
    left: -15vmin;
}
.bubble:nth-of-type(5) {
    top: 60vh;
    right: 18vw;
    height: 28vmin;
    width: 28vmin;
}
.bubble:nth-of-type(5):before{
    width: 10vmin;
    height: 10vmin;
    bottom: 5vmin;
    left: -25vmin;
}

</style>
