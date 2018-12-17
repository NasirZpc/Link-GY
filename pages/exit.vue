<template>
  <div class=""/>
</template>

<script>
export default {
    layout: 'blank',
    middleware: async ({ctx,app,store}) => {
        $cookies.remove('linkId');
        $cookies.remove('linkToken')
        window.location.href='/'
    }
}
</script>
