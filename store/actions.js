import qs from 'qs'
export default{
    async nuxtServerInit ({ commit }, { req, app }) {
        if(req.headers.cookie){
            var cookieArr = req.headers.cookie.split("; ")
            var obj = {};
            for(var i=0;i<cookieArr.length;i++){
                if(cookieArr[i].split('=')[0] == 'linkId'){
                    obj[cookieArr[i].split('=')[0]] = cookieArr[i].split('linkId=')[1]
                }
            }
            // console.log(obj.linkId)
            if (obj) {
                const linkId =obj.linkId;
                await app.$axios.post('/api/Member/QueryInfo',{
                    AccountId:obj.linkId
                }).then(res=>{
                    // console.log(qs.parse(res.data.Data))
                    commit('SET_USERINFO',res.data.StatusCode===200?qs.parse(res.data.Data):'')
                })
            }
        }
    },
    // async login({ commit }, { mobile, password }) {
    //     try {
    //         let {data} = await this.$axios.post(`http://127.0.0.1:3030/api/login`,{ mobile, password })
    //         if(data.status == 1){
    //             commit('SET_USERINFO', data.data)
    //         }
    //         return data
    //     } catch (error) {
    //         if (error.response && error.response.status === 401) {
    //             throw new Error('Bad credentials')
    //         }
    //         throw error
    //     }
    // },
}
