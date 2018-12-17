import qs from 'qs'
export default{
    async nuxtServerInit ({ commit }, { req, app }) {
        if(req.headers.cookie){
            var cookieArr = req.headers.cookie.split("; ")
            var obj = {};
            for(var i=0;i<cookieArr.length;i++){
                if(cookieArr[i].split('=')[0] == 'linkId'){//获取账户id
                    obj[cookieArr[i].split('=')[0]] = cookieArr[i].split('linkId=')[1]
                }
            }
            if (obj) {
                const linkId =obj.linkId;
                await app.$axios.post('/api/Member/QueryInfo',{//获取个人信息
                    AccountId:obj.linkId
                }).then(res=>{
                    commit('SET_USERINFO',res.data.StatusCode===200?qs.parse(res.data.Data):'')
                })
            }
        }else{
            commit('SET_USERINFO','')
        }
    },
}
