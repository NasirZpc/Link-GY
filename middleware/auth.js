export default function({store,error,redirect,req}){
    console.log(store.getters.userinfo)
    if(!store.getters.userinfo){
        console.log('未登录')
        redirect('/login')
    }else{
        console.log('已登录')
    }
}
