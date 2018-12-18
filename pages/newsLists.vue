<template>
    <div v-loading="loading" class="pt60 wrapper2 pb40" ref="ListsPage">
        <p class="noDataText tc fs16 CRed pt40" v-show='list.length == 0'>无数据!&nbsp;&nbsp;-_-!!!</p>
        <ul class="house-type-lists">
            <li v-for="(item,index) in list" :key="index" class="rel">
                <nuxt-link :to="`/newsDetail/${item.Id}`" class="clearfix">
                    <img :src="item.MainPic " class="fl" :alt="item.FullHead">
                    <div class="fl w-wrapper2">
                        <p class="fs20 C0">{{item.FullHead}}</p>
                        <p class="pt10 C80 fs14">{{item.CreateDate}}</p>
                        <div class="content-view C6 pt10 fs16" v-html="unescape(item.NewsContent)"></div>
                    </div>
                </nuxt-link>
            </li>
        </ul>
        <!-- 工具条 -->
        <el-pagination v-show='list.length != 0' class="tc pt100"
            @current-change="handleCurrentChange"
            background
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="listsTotal">
        </el-pagination>
    </div>
</template>
<script>
export default{
    async asyncData ({app}) {
        let [listsRes] = await Promise.all([
                app.$axios.post(`/api/SowingMap/QueryPageList`,{
                    Page:1,
                    Rows:10,
                    QueryJson:{
                        "Type":1
                    }
                }),//新闻列表数据
            ])
        let list = listsRes.data.Data.Rows || []
        let listsTotal = listsRes.data.Data.Records
        return {list,listsTotal}
    },
    data(){
        return {
            loading:false,
            listsTotal:0,
            page : 1,
            pageSize : 10,
            list:[]
        }
    },
    methods:{
        //改变当前页数
        handleCurrentChange(val) {
            this.page = val
            this.loading = true;
            setTimeout(()=>{
                this.loading = false;
            },1000)
            this.getNewslist();
        },
        getNewslist() {
            var params = {
                Page:this.page,
                Rows:this.pageSize,
                QueryJson:{
                    "Type":1
                }
            }
            this.$axios.post(`/api/SowingMap/QueryPageList`,params).then((response) =>{
                console.log(response.data.Data.Rows);
                switch(response.data.StatusCode){
                    case 500 :
                        this.$message.error('新闻列表请求失败'+response.data.Info)
                        break;
                        case 200:
                        this.list = (response.data.Data == null) ? [] : response.data.Data.Rows;
                        this.listsTotal = (response.data.Data == null) ? 0 : response.data.Data.Records;
                }
                this.loading = false
            }).catch(error => {
                  this.$message.error(error)
            })
        },
        unescape(html){
            html = (html == null) ? "" : html;
            return html
            .replace(html ? /&(?!#?\w+;)/g : /&/g, '&amp;')
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, "\"")
            .replace(/&#39;/g, "\'");
        }
    },
    mounted(){
		this.$refs.ListsPage.style.minHeight = document.documentElement.clientHeight - 480+'px'
    },
}
</script>
<style lang='scss'>
@import "@/assets/css/houseLists.scss";
</style>
