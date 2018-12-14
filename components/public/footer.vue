<template>
    <footer class="m-footer">
        <el-row :gutter="0">
            <el-col :span="10" class="out-link">
                <el-row :gutter="0" class="fs14 C6 friend-link">
                    <el-col :span="4">
                        <span class="C3 bold">友情链接：</span>
                    </el-col>
                    <el-col :span="4">
                        <a class="C6" target="view_window" href="http://www.premier-park.com/">派米雷集团</a>
                    </el-col>
                    <el-col :span="4" :offset="1">
                        <a class="C6" target="view_window" href="http://www.leducity.com/">派米雷乐都</a>
                    </el-col>
                    <el-col :span="5" :offset="1">
                        <a class="C6" target="view_window" href="http://www.pmlyq.com" >派米雷产业园</a>
                    </el-col>
                </el-row>
                <p class="C6 pt40">全国客服热线： 400-999-9719（周一至周日9:00-21:00）</p>
                <p class="C6 pt25">技术支持： <a class="C6" target="view_window" href="http://www.inesa.com/">INESA上海仪电</a></p>
                <p class="C6 pt10">©2018 上海青邻公寓管理有限公司 版权所有 沪ICP备18045760号</p>
            </el-col>
            <el-col :span="3" :offset="2">
                <ul>
                    <li class="pt20">
                        <p class="bold C3">咨询电话:</p>
                        <p class="C6">021-37820939</p>
                    </li>
                    <li class="pt15">
                        <p class="bold C3">报修电话:</p>
                        <p class="C6">021-37820939</p>
                    </li>
                    <li class="pt15">
                        <p class="bold C3">投诉电话:</p>
                        <p class="C6">021-37820939</p>
                    </li>
                </ul>
            </el-col>
            <el-col :span="9">
                <ul class="clearfix footer-code pt20 tc C6 fs14">
                    <li class="fr">
                        <img src="../../static/WeChat.jpeg">
                        <p class="pt10">关注微信公众号</p>
                    </li>
                    <li class="fr">
                        <img src="../../static/app.png">
                        <p class="pt10">APP下载</p>
                    </li>
                </ul>
            </el-col>
        </el-row>
        <a class="C6 block tc beian-wrap pt40" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011702004666" target="view_window">
            <img src="../../static/beian.png" class="beian-img rel">
            <span class="inline marL10">沪公网安备 31011702004666号</span>
        </a>
    </footer>
</template>
<style lang="scss">
@import "@/assets/css/public/footer.scss";
</style>
