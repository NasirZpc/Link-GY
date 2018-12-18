<template>
    <div class="store-detail">
        <!-- banner -->
        <div v-swiper:mySwiper="swiperOption">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,index) in detail.Imagelist" :key="index">
                    <img :src="item.Url">
                </div>
            </div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-pagination"></div>
        </div>
        <div class="wrapper2 pt40">
            <div class="base-info rel">
                <p class="C0 fs20 tit">
                    <span class="inline-b mr10">{{detail.BaseInfo.BName}}</span>
                    <span>{{detail.BaseInfo.Name}}</span>
                </p>
                <div class="clearfix">
                    <p class="fl C80 fs14 pt15">
                        <i class="el-icon-location-outline mr10"></i>
                        <span>{{detail.BaseInfo.RegionName}}{{detail.BaseInfo.Address}}</span>
                    </p>
                </div>
                <div class="clearfix">
                    <p class="fl C80 fs14 pt10">
                        <fa :icon="['fab','gg']" class="mr10"/>
                        <span>{{detail.BaseInfo.Area}}m²</span>
                    </p>
                </div>
                <p class="C80 fs16 pt10">
                    <fa :icon="['fas','phone']" class="mr10 C9" style="transform:rotate(90deg);"/>
                    <span>400-999-9719</span>
                </p>
                <div class="btn-wrap abs tr">
                    <p class="CRed fs20">¥{{detail.BaseInfo.MinPrice}}元/月起</p>
                    <el-button class="block" type="primary" @click="dialogReservation = true">预约看房</el-button>
                    <el-button class="block" type="primary" plain @click="dialogOnline = true">在线预定</el-button>
                </div>
            </div>
            <div class="supporting-facilities pt60">
                <p class="C0 fs20 tit">配套设施</p>
                <p class="fs14 C80 pt20">日式榻榻米暖心设计，原木色系与现代环保家具完美搭配，美观与收纳兼备。多功能衣柜、隐藏式地台储物，精妙布局功能区，让每一寸空间都得到高效利用。明窗阅读，独立卫浴，创意绿植，精致灵动，意趣天成，拎包入住即刻开启精致生活。</p>
                <ul class="house-config-lists pt40 clearfix">
                    <li class="fl" v-for="(item,index) in houseConfig" :key="index" :class="{ CRed: item.active }">
                        <i class="iconfont" v-html="item.iconfont"></i>
                        <h4 class="fs20">{{item.name}}</h4>
                    </li>
                </ul>
            </div>
            <div class="map-around pt60">
                <p class="C0 fs20 tit">周边地图</p>
                <!-- <map-com :map-data="mapData"/> -->
            </div>
        </div>
        <!-- 预约看房 -->
        <el-dialog
        title="预约看房"
        :visible.sync="dialogReservation"
        width="500px">
            <el-form :model="ReservationForm" label-width="100px" :rules="rules" ref="ReservationForm">
                <el-form-item label="联系人"  prop="ContactName">
                    <el-input v-model="ReservationForm.ContactName" auto-complete="off" placeholder="请输入您的姓名"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="ContactPhone">
                    <el-input v-model="ReservationForm.ContactPhone" auto-complete="off" placeholder="请输入手机号码" maxlength='11'></el-input>
                </el-form-item>
                <el-form-item label="手机验证码" prop="ContactVerifyCode">
                    <el-input v-model="ReservationForm.ContactVerifyCode" auto-complete="off" placeholder="请输入验证码" maxlength="6" style="width:200px;"></el-input>
                    <el-button type="primary" :disabled="disabled" @click="sendcode">{{getBtnTxt}}</el-button>
                </el-form-item>
                <el-form-item label="看房时间" prop="ExpectedDate">
                    <el-date-picker v-model="ReservationForm.ExpectedDate" auto-complete="off" type="datetime" placeholder="请选择看房时间" :picker-options="pickerOptions"></el-date-picker>
                </el-form-item>
                <el-form-item label="备注" prop="Description">
                    <el-input type="textarea" v-model="ReservationForm.Description" auto-complete="off" placeholder="备注"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelReservation('ReservationForm')">取 消</el-button>
                <el-button type="primary" @click="Reservation('ReservationForm')" :loading="btnLoading">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 在线预定 -->
        <el-dialog
        title="在线预定"
        :visible.sync="dialogOnline"
        width="20%"
        class="dialogOnline">
            <div>
                <img src="../../static/app.png">
                <p class="tc">扫描二维码下载App</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogOnline = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import MapCom from '@/components/mapCom.vue'
import moment from 'moment'
import CryptoJS from 'crypto-js'
export default{
    components: {
        MapCom
    },
    async asyncData({app}){
        let [detailRes] = await Promise.all([
            app.$axios.post(`api/PStruct/QueryRoomTypeDetail`,{Id:app.context.route.params.id}),//详情
        ])
        let detail = detailRes.data.Data
        let mapData = {
            lat:detail.BaseInfo.LAT,
            lng:detail.BaseInfo.LNG
        }
        //房间配置
        var houseConfig=[
            {
                iconfont :'&#xe636;',
                Type:'1',
                Num : '0',
                name: 'wifi',
                active:false,
            },
            {
                iconfont :'&#xe621;',
                Type:'2',
                Num : '0',
                name: '空调',
                active:false,
            },
            {
                iconfont :'&#xe66f;',
                Type:'3',
                Num : '0',
                name: '热水器',
                active:false,
            },
            {
                iconfont :'&#xe65f;',
                Type:'4',
                Num : '0',
                name: '洗衣机',
                active:false,
            },
            {
                iconfont :'&#xe622;',
                Type:'5',
                Num : '0',
                name: '冰箱',
                active:false,
            },
            {
                iconfont :'&#xe66c;',
                Type:'9',
                Num : '0',
                name: '油烟机',
                active:false,
            },
            {
                iconfont :'&#xe60a;',
                Type:'11',
                Num : '0',
                name: '床',
                active:false,
            },
            {
                iconfont :'&#xe612;',
                Type:'12',
                Num : '0',
                name: '书桌',
                active:false,
            },
            {
                iconfont :'&#xe602;',
                Type:'13',
                Num : '0',
                name: '衣柜',
                active:false,
            },
            {
                iconfont :'&#xe603;',
                Type:'14',
                Num : '0',
                name: '沙发',
                active:false,
            },
            {
                iconfont :'&#xe604;',
                Type:'23',
                Num : '0',
                name: '椅子',
                active:false,
            },
            {
                iconfont :'&#xe639;',
                Type:'24',
                Num : '0',
                name: '飘窗',
                active:false,
            },
        ]
        if(detailRes.data.Data.BaseInfo.ProductSetting){
            var ProductList = detailRes.data.Data.BaseInfo.ProductSetting.split(',')
            for(var i=0;i<houseConfig.length;i++){
                for(var j=0;j<ProductList.length;j++){
                    if(houseConfig[i].Type == ProductList[j]){
                        houseConfig[i].active = true
                    }
                }
            }
        }
        let houseId = app.context.route.params.id
        return {detail,mapData,houseConfig,houseId}
    },
    data(){
        var validatePhoneNum = (rule, value, callback) => {
			let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
			if (value === '') {
				callback(new Error('手机号码不能为空'));
			} else if (!reg.test(value)) {
				callback(new Error('请输入正确的手机号码'));
			}else if(this.inputPhone!= ''&& value!= this.inputPhone){
                callback(new Error('请输入正确的手机号码'));
            } else {
				callback();
			}
		};
		var validateValidateCode = (rule, value, callback) => {
			let PhoneNum = this.ReservationForm.ContactPhone
			let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
			if (value === '') {
				callback(new Error('手机验证码不能为空'));
			} else if (!reg.test(PhoneNum)) {
				callback(new Error('请输入正确的手机号码'));
			} else if(CryptoJS.MD5(value).toString()!== this.SMCode){
				callback(new Error('请重输入正确的验证码'));
			}else {
				callback();
			}
		};
        var validateValidate = (rule,value,callback) => {
            var nowTime = moment(new Date()).format("YYYY-MM-DD hh:mm:ss")//本地当前时间
            nowTime = Date.parse(nowTime.replace(/-/,"/")) - 5000
            var selTime = moment(new Date(value)).format("YYYY-MM-DD hh:mm:ss")//选房的时间
            selTime = Date.parse(selTime.replace(/-/,"/"))
            if(value === ''){
                callback(new Error('预约看房时间不能为空'));
            }else if(nowTime>=selTime){
                callback(new Error('您所选的时间不能看房，请重新选择看房时间'));
            }else{
                callback()
            }
        };
        return {
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            houseId:'',
            detail:[],
            swiperOption: {
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                },
            },
            mapData:{},
            //配套设施
            houseConfig:[],

            //预约房间
            dialogReservation :false,
            ReservationForm:{
                ContactName:'',//联系人姓名
                ContactPhone:'',//手机号码
                ContactVerifyCode:'',//输入的验证码
                ExpectedDate:'',//预约时间
                Description:'',//附加说明
            },
            time: 0,
            getBtnTxt: "免费获取验证码",
            SMCode:'',//获取的验证码
            disabled: false,
            btnLoading:false,
            inputPhone:'',

            rules: {
                ContactName: [
                    { required: true, message: '请输入您的姓名', trigger: 'blur' },
                ],
                ContactPhone:[
                    {required:true,validator: validatePhoneNum, trigger: 'blur'},
                ],
                ContactVerifyCode:[
                    {required:true,validator: validateValidateCode, trigger: 'blur'},
                ],
                ExpectedDate:[
                    {type:'date',required:true,validator: validateValidate, trigger: 'change'},
                ],
            },

            //在线预定
            dialogOnline:false,
        }
    },
    methods:{
        //预约看房
        Reservation(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.btnLoading = true
                    var Type = '0'
                    var AccountId
                    if(this.$store.getters.userinfo){
                        Type = '1'
                        AccountId = this.$store.getters.userinfo.AccountId
                    }
                    var params = {
                        Type :Type,
                        AccountId : AccountId,
                        Category : '2',
                        RoomId : this.houseId,
                        ContactName : this.ReservationForm.ContactName,//联系人姓名
                        ContactPhone : this.ReservationForm.ContactPhone,//手机号码
                        ExpectTime : this.ReservationForm.ExpectedDate,//预约时间
                        Description : this.ReservationForm.Description,//附加说明
                    }
                    this.$axios.post(`/api/PStruct/Prospectiveapplication`,params).then(res=> {
                        this.btnLoading = false
                        this.dialogReservation = false
                        this.time = 0;
                        this.getBtnTxt = "获取验证码";
                        this.disabled = false;
                        this.timer()
                        this.$refs[formName].resetFields();
                        if(res.data.StatusCode == 200){
                            this.$message.success('预约看房成功')
                        }else{
                            this.$message.error(res.data.Info)
                        }
                    }).catch(error => {
                        this.btnLoading = false
                        this.$message.error(error)
                    })
                } else {
                    this.$message.error('表单请填写完整！')
                    return false;
                }
            });
        },
        sendcode() {
            var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
            //var url="/nptOfficialWebsite/apply/sendSms?mobile="+this.registerForm.phone;
            if (this.ReservationForm.ContactPhone == '') {
                this.$message({
                    type: 'error',
                    message: '请输入手机号码'
                });
            } else if (!reg.test(this.ReservationForm.ContactPhone)) {
                this.$message({
                    type: 'error',
                    message: '手机格式不正确'
                });
            } else {
                let params = {
                    Type: 7,
                    PhoneNum: this.ReservationForm.ContactPhone
                }
                this.$axios.post(`/api/Common/SendSMS`,params).then((response) => {
                    var errorText = response.Info;
                    switch (response.data.StatusCode) {
                        case 200:
                            this.$message({
                                type: 'success',
                                message: '短信验证码发送成功，请注意查收！'
                            });
                            this.inputPhone = response.data.Data.PhoneNum
                            this.SMCode = response.data.Data.RegisterCode.toLowerCase();
                            this.time = 60;
                            this.disabled = true;
                            this.timer();
                        break;
                        case 500:
                            this.$message({
                                type: 'error',
                                message: errorText
                            });
                            this.time = 0;
                            this.getBtnTxt = "获取验证码";
                            this.disabled = false;
                        break;
                        default:
                            this.$message({
                                type: 'error',
                                message: '短信验证码发送失败！'
                            });
                            this.time = 0;
                            this.getBtnTxt = "获取验证码";
                            this.disabled = false;
                    }
                })
            }
        },
        timer() {
            if (this.time > 0) {
                this.time--;
                this.getBtnTxt = this.time + "s后重新获取";
                setTimeout(this.timer, 1000);
            } else {
                this.time = 0;
                this.getBtnTxt = "获取验证码";
                this.disabled = false;
            }
        },
        cancelReservation(formName){
            this.$refs[formName].resetFields();
            this.dialogReservation = false
        },
    }
}
</script>
<style lang="scss">
@import "@/assets/css/houseDetail.scss";
//配置icon
/*icon*/
@font-face {font-family: "iconfont";
  src: url('../../assets/css/icon-font/iconfont.eot'); /* IE9*/
  src: url('../../assets/css/icon-font/iconfont.eot#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('../../assets/css/icon-font/iconfont.woff') format('woff'), /* chrome, firefox */
  url('../../assets/css/icon-font/iconfont.ttf') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  url('../../assets/css/icon-font/iconfont.svg#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
ul.house-config-lists{
    li{
        float: left;
        text-align: center;
        margin-bottom:25px;
        margin-right: 78px;
        margin-top:50px;
        color:#808080;
        width:100px;
        >i.iconfont{
            font-size: 60px;
        }
        &.CRed{
            color:#bb0068;
            h4{
                color:#bb0068;
                padding-top:20px;
            }
        }
        &:nth-of-type(7n){
            margin-right: 0px;
        }
    }
}
//在线预定
.dialogOnline{
    img{
        width:60%;
        display: block;
        margin:0 auto;
    }
}
</style>
