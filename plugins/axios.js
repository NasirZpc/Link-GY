import Vue from 'vue'
import qs from 'qs'
import axios from 'axios'
var vm = new Vue()

var defaultConfig;

if(process.env.NODE_ENV == 'production'){
    $Ajax({
        type: "GET",    　
        url: "/serverconfig.json",
        async: false,
        success: function(responseText){
            defaultConfig = JSON.parse(responseText)
            window.text = defaultConfig.Text
        },
        error: function(status){
            console.log(status)
        }
    })
}else{
    window.text={
        index:'“LINK新界”是派米雷集团旗下租赁住房品牌，集投资开发、运营管理，线上“租房平台”和线下“租赁社区”于一体的租赁住房综合服务商。以“创享新生活”为愿景，“工作+生活“为理念，打造“绿色、开放、共享、智慧”的未来社区。给追梦的你，一个温馨的家——梦在哪，家就在哪。',
        brand:'“LINK新界”是派米雷集团旗下租赁住房品牌，集投资开发、运营管理，线上“租房平台”和线下“租赁社区”于一体的租赁住房综合服务商。以“创享新生活”为愿景，“工作+生活“为理念，打造“绿色、开放、共享、智慧”的未来社区。给追梦的你，一个温馨的家——梦在哪，家就在哪。',
        jituan:'上海派米雷投资（集团）有限公司是一家综合性投资集团公司，创始于2002年。目前主要以产业园区、城市更新、租赁住房的投资运营为核心业务，提供城市有机更新和产城融合发展一体化运营解决方案。在不断发展中，派米雷集团始终秉承“让城市更美好”的企业使命，立足上海，布局全国，致力于成为卓越的城市服务商，打造百年基业的民族品牌。',
        other:'派米雷集团积极响应“租售同权，租购并举”的国家战略，打造旗下租赁住房品牌“LINK新界”。集投资开发、运营管理，线上“租房平台”和线下“租赁社区”于一体的租赁住房综合服务商。以“创享新生活”为愿景，“工作+生活“为理念，打造“绿色、开放、共享、智慧”的未来社区。给追梦的你，一个温馨的家——梦在哪，家就在哪。',
        otherTit:'租赁住房',
        business:"<p class='C0 fs14 C80 pt40 brand-section-3-cont' style='text-indent: 2em;'>派米雷经过多年在产业领域内的探索与积累，已形成了从市场研究、策划、推广、招商、运营等于一体的成熟服务团队，以产业园区、城市更新及租赁住房为载体，以企业服务、资产管理为导向，为企业提供创投孵化、企业服务、产业金融等平台支持。</p><p class='C0 fs14 C80 pt40 brand-section-3-cont' style='text-indent: 2em;'>知行合一，成人达己。派米雷在成长过程中，不断推陈出新，在开拓项目的同时，始终坚持优化商业模式，整合优质资源，创新发展之路。未来，随着中国经济发展新常态和城市发展新路径，派米雷将立足上海，布局全国，持续助力经济转型升级、城市创新发展现2020年“百亿派米雷”阶段目标和更大的梦想而奋斗，致力于成为卓越的城市服务商。</p>",
    }
    defaultConfig= {
        ApiUrl:process.env.BASE_URL,
    }
}

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
    $axios.defaults.baseURL = defaultConfig.ApiUrl
    $axios.onRequest(config => {
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
            // console.log(config)
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
        // console.log(error)
        const code = parseInt(error.response && error.response.status)
        if (code === 400) {
            redirect('/error')
        }
    })

}

function $Ajax(opt){
    opt = opt || {};
    opt.type = opt.type || "post";
    opt.url = opt.url || "";
    opt.async = opt.async || true;
    // opt.data = opt.data || null;
    // opt.success = opt.success || function(){};
    opt.error = opt.error || function(){};
    var xhr = new XMLHttpRequest();
    // var params = {};
    // for(var key in opt.data){
    //      params.push(key + "=" + opt.data[key]);
    // }
    // var sendData = params.join("&");
    // if(opt.type.toUpperCase() == "GET"){
         // xhr.open(opt.type, opt.url + "?" + sendData, opt.async);
         xhr.onreadystatechange = function(){
              if(xhr.readyState == 4){
                   if(xhr.status == 200){
                         opt.success && opt.success(xhr.responseText);
                   }else{
                         opt.error && xhr.error(xhr.status);
                   }
              }
         }
         xhr.open(opt.type, opt.url, opt.async);
         xhr.send(null);
    // }else{
    //      xhr.open(opt.type, opt.url, opt.async);
    //      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
    //      xhr.send(sendData);
    // }


}
