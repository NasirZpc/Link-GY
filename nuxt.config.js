const pkg = require('./package')
const axios = require('axios')

module.exports = {
    // generate: {
    //     fallback:'index.html',
    //     routes: function (callback) {
    //         axios.all([
    //             axios.post(`http://api.linkxinjie.com/SowingMap/QueryPageList`,{//新闻
    //                 Page:1,
    //                 Rows:10,
    //                 QueryJson:{
    //                     "Type":1
    //                 }
    //             }),
    //             axios.post(`http://api.linkxinjie.com/Property/QueryPropertyList`,{//门店
    //                 PageIndex:1,
    //                 PageSize:10000,
    //                 SortName:"",
    //                 IsASC:true,
    //                 AreaId:'',
    //                 KeyWord:''
    //             }),
    //             axios.post(`http://api.linkxinjie.com/RoomType/QueryRoomTypeList`,{//户型
    //                 PageIndex:1,
    //                 PageSize:100000,
    //                 SortName:"",
    //                 IsASC:true,
    //                 AreaId:'',//区域id
    //                 KeyWord:"",
    //                 PropertyId:'',//小区id
    //                 Rental:'',//租金
    //             }),
    //         ]).then(axios.spread(function (res0,res1,res2) {
    //             // console.log(res0.data.Data.Rows)
    //             // console.log(res1.data.Data.Data)
    //             // console.log(res2.data.Data.Data)
    //             var routes = []
    //             var routes0 = res0.data.Data.Rows.map((item) => {
    //                 return '/newsDetail/' + item.Id
    //             })
    //             var routes1 = res1.data.Data.Data.map((item) => {
    //                 return '/storeDetail/' + item.Id
    //             })
    //             var routes2 = res2.data.Data.Data.map((item) => {
    //                 return '/houseDetail/' + item.Id
    //             })
    //             for(var i=0;i<routes0.length;i++){
    //                 routes.push(routes0[i])
    //             }
    //             for(var i=0;i<routes1.length;i++){
    //                 routes.push(routes1[i])
    //             }
    //             for(var i=0;i<routes2.length;i++){
    //                 routes.push(routes2[i])
    //             }
    //             callback(null, routes)
    //         })).catch(callback);
    //     },
    // },
    server: {
        port: 3000, // default: 3000
        host: '0.0.0.0', // default: localhost
    },
  // mode: 'universal',
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Link新界公寓',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: ' “LINK新界”是上海青邻公寓管理有限公司打造的长租公寓品牌，以“创享新生活”为愿景，以“工作+生活”为理念，是集线上“LINK新界租房平台”和线下“LINK新界生活社区”于一体的长租公寓综合服务商。“LINK新界”打通房源端和租客端，让租房更便捷和高效，同时集联合办公和共享空间，融创业、居住、社交、共享四大场景于一体，给有梦想不断追求的人一个温馨的家——梦在哪，家就在哪。' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo.png' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#d90068' },

  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/reset.css',
    'swiper/dist/css/swiper.css',
    '@/theme/index.css',
    '@/assets/css/main.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src:'~plugins/axios' },
    {src: '@/plugins/element-ui', ssr: true},
    {src: '@/plugins/vue-cookies', ssr: true},
    {src: '@/plugins/swiper',ssr:true},
    '~/plugins/font-awesome'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    'nuxt-fontawesome'
  ],
  axios: {
    // proxy: true,
    // prefix: '',
    baseURL:'http://api.linkxinjie.com',
    browserBaseURL:'http://api.linkxinjie.com',
    credentials: false
  },
//   proxy: {
//     '/api': {
//       target: 'http://testapi.linkxinjie.com', // 代理地址
//       changeOrigin: true,
//       pathRewrite: {
//         '^/api': '/'
//       },
//     },
// },
  // proxy: [
  //     ['/api', { target: 'http://testapi.linkxinjie.com'}]
  // ],
  /*
  ** Axios module configuration
  */
  fontawesome: {
      component: 'fa',
      imports: [
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['fas']
        },
        {
          set: '@fortawesome/free-regular-svg-icons',
          icons: ['far']
        },
        {
          set: '@fortawesome/free-brands-svg-icons',
          icons: ['fab']
        }
      ]
  },


  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    // extend(config, ctx) {
    //   // Run ESLint on save
    //   if (ctx.isDev && ctx.isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // },
    cache:false
  }
}
