<template>
  <div class=""/>
</template>

<script>
export default {
    layout: 'blank',
    // middleware: async ({ctx,app,store}) => {
        // $cookies.remove('linkId');
        // $cookies.remove('linkToken')
        // window.location.href='/'
    // },
    created(){
        this.$cookies.remove('linkId');
        this.$cookies.remove('linkToken')
        this.$store.commit('SET_USERINFO', '');
        this.$router.push({path:'/'})
    }
}
</script>
