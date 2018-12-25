import Vue from 'vue'
import qs from 'qs'
import axios from 'axios'
var vm = new Vue()

var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
function generateMixed(n){
    var res = "";
    for(var i = 0; i < n ; i ++) {
        var id = Math.ceil(Math.random()*35);
        res += chars[id];
    }
    return res;
}
//axios配置
export default function ({ $axios, redirect,app }) {
    $axios.onRequest(config => {
        config.baseURL = 'http://api.linkxinjie.com'
        var Token  = '';
        try{
            var cookies = config.headers.common.cookie.split('; ');
            for(var i=0;i<cookies.length;i++){
                if(cookies[i].split('=')[0] == 'linkToken'){
                    Token = cookies[i].split('=')[1]
                }
            }
        }catch(e){}
        config.headers.token = Token || generateMixed(32)
        config.headers.signature = generateMixed(32)
        config.headers.timestamp = generateMixed(32)
        config.headers.nonce = generateMixed(32)
        if (config.method === 'post') {
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
