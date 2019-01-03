import qs from 'qs'
export default{
    async nuxtServerInit ({ commit }, { req, app }) {
        if(req.headers.cookie){
            var cookieArr = req.headers.cookie.split("; ")
            var obj = {},
                active = {};
            for(var i=0;i<cookieArr.length;i++){
                if(cookieArr[i].split('=')[0] == 'linkId'){//获取账户id
                    obj[cookieArr[i].split('=')[0]] = cookieArr[i].split('linkId=')[1]
                }
                if(cookieArr[i].split('=')[0] == 'activeIndex'){
                    active[cookieArr[i].split('=')[0]] = cookieArr[i].split('activeIndex=')[1]
                }
            }
            console.log(obj)
            if (obj && obj.linkId) {
                const linkId =obj.linkId;
                await app.$axios.post('/Member/QueryInfo',{//获取个人信息
                    AccountId:obj.linkId
                }).then(res=>{
                    commit('SET_USERINFO',res.data.Status===200?qs.parse(res.data.Data):'')
                })
            }else{
                commit('SET_USERINFO','')
            }
            commit('SET_ACTIVEINDEX',active.activeIndex)
        }else{
            commit('SET_USERINFO','')
        }

    },
    SET_ACTIVEINDEX({commit},activeIndex){
        commit('SET_ACTIVEINDEX',activeIndex)
    },
}
