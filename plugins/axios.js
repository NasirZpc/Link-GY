import Vue from 'vue'
import qs from 'qs'
import store from '../store/index'
var vm = new Vue({})

//axios配置
export default function ({ $axios, redirect }) {
    $axios.onRequest(config => {
        // console.log(store)
        config.headers.token = '12333333'
        config.headers.signature = '12333333'
        config.headers.timestamp = '12333333'
        config.headers.nonce = '12333333'
        if (config.method === 'post') {
            // console.log(config.data)
            // console.log(config.headers)
            config.data = qs.stringify(config.data)
        }
        if (process.browser) {
            // vm.$loading()
        }

    })
    $axios.onResponse(response=>{
        // console.log(response)
        if (process.browser) {
            // let load = vm.$loading();
            // load.close();
        }
    })

    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        if (code === 400) {
            redirect('/error')
        }
    })
}
