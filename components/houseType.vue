<template>
    <div class="house-type">
        <div class="screen-wrap clearfix">
            <el-select v-model="regionVal" placeholder="请选择区域" @change="selChangeFunc">
                <el-option
                    v-for="item in regionScreen"
                    :key="item.AreaId"
                    :label="item.AreaName"
                    :value="item.AreaId">
                </el-option>
            </el-select>
            <el-select v-model="villageVal" placeholder="请选择社区" @change="selChangeFunc">
                <el-option
                    v-for="item in villageScreen"
                    :key="item.PStructId"
                    :label="item.villageName"
                    :value="item.PStructId">
                </el-option>
            </el-select>
            <el-select v-model="rentVal" placeholder="请选择租金" @change="selChangeFunc">
                <el-option
                    v-for="item in rentScreen"
                    :key="item.Rental"
                    :label="item.name"
                    :value="item.Rental">
                </el-option>
            </el-select>
        </div>
        <div v-loading="loading">
            <p class="noDataText tc fs16 CRed pt40" v-show='list.length == 0'>无数据!&nbsp;&nbsp;-_-!!!</p>
            <ul class="house-type-lists">
                <li v-for="(item,index) in list" :key="index" class="rel">
                    <nuxt-link :to="`/houseDetail/${item.Id}`" class="clearfix">
                        <img :src="item.MainPic " class="fl" :alt="item.FullHead">
                        <div class="fl">
                            <p class="fs20 C0">
                                <span class="inlin-b mr10">{{item.PropertyName}}</span>
                                <span>{{item.Name}}</span>
                            </p>
                            <p class="C80 fs16 pt15">
                                <i class="el-icon-location-outline mr10"></i>
                                <span>{{item.RegionName}}{{item.PropertyAddress}}</span>
                            </p>
                            <p class="C80 fs16 pt10">
                                <fa :icon="['fab','gg']" class="mr10"/>
                                <span>{{item.Area}}m²</span>
                            </p>
                        </div>
                    </nuxt-link>
                    <div class="abs look-house-wrap">
                        <p class="CRed fs18 mb10">¥{{item.MinPrice}}元/月起</p>
                        <el-button type="primary" @click="lookHouseFunc(item.Id)">预约看房</el-button>
                    </div>
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
    </div>
</template>
<script>
import moment from 'moment'
import CryptoJS from 'crypto-js'
export default{
    props:{
        regionScreen:{
            type:Array,
            default:()=>{
                return []
            }
        },
        villageScreen:{
            type:Array,
            default:()=>{
                return []
            }
        },
        listsData:{
            type:Object,
            default:()=>{
                return {}
            }
        },
        villageId:{
            type:String,
            default:()=>{
                return {}
            }
        }
    },
    data() {
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
            loading:false,
            // regionScreen: [],
            regionVal: '',

            // villageScreen[],
            villageVal:this.villageId || '',

            rentScreen:[
                {
                    name:'全部',
                    Rental:'-1'
                },{
                    name:'1000元以下',
                    Rental:'a'
                },{
                    name:'1000-2000元',
                    Rental:'b'
                },{
                    name:'2000-3000元',
                    Rental:'c'
                },{
                    name:'3000-4000元',
                    Rental:'d'
                },{
                    name:'4000-5000元',
                    Rental:'e'
                },{
                    name:'5000-6000元',
                    Rental:'f'
                },{
                    name:'6000-7000元',
                    Rental:'g'
                },{
                    name:'7000-8000元',
                    Rental:'h'
                }
            ],
            rentVal:'',

            loading:false,
            page : 1,
            pageSize : 10,
            list:this.listsData.Data,
            listsTotal:this.listsData.RowCount,

            //预约房间
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            houseId:'',
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
        }
    },
    methods:{
        //改变当前页数
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.page = val
            this.loading = true;
            this.getHouseListsFunc()
            setTimeout(()=>{
                this.loading = false;
            },1000)
        },
        //改变区域、社区、租金
        selChangeFunc(){
            this.page = 1
            // this.list = []
            this.getHouseListsFunc()
        },
        getHouseListsFunc(){
            this.loading = true
            var params = {
                PageIndex:this.page,
                PageSize:this.pageSize,
                SortName:"",
                IsASC:true,
                AreaId:this.regionVal,//区域id
                KeyWord:"",
                PropertyId:this.villageVal,//小区id
                Rental:this.rentVal,//租金
            }
            this.$axios.post(`/RoomType/QueryRoomTypeList`,params).then(response => {//户型数据列表
                switch(response.data.Status){
                    case 500 :
                        this.$message.error('房源列表请求失败'+response.Info)
                        break;
                    case 200:
                        if(response.data.Data.Data == '' || response.data.Data.Data == null || response.data.Data.Data == []){
                            this.list = []
                        }else{
                            this.list = response.data.Data.Data
                        }
                        this.listsTotal = response.data.Data.RowCount
                    break;
                }
                this.loading = false
            }).catch( error=> {
                this.$message.error(error);
            });
        },
        //预约看房
        lookHouseFunc(id){
            this.houseId = id
            this.dialogReservation = true
        },
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
                        // Type :Type,
                        // AccountId : AccountId,
                        // Category : '2',
                        // RoomId : this.houseId,
                        // ContactName : this.ReservationForm.ContactName,//联系人姓名
                        // ContactPhone : this.ReservationForm.ContactPhone,//手机号码
                        // ExpectTime : this.ReservationForm.ExpectedDate,//预约时间
                        // Description : this.ReservationForm.Description,//附加说明
                        MemberId :AccountId,
        				Phone : this.ReservationForm.ContactPhone,//手机号码
        				Name : this.ReservationForm.ContactName,//联系人姓名
        				SourceType:1,    //单据来源 1-PC端 2-APP端 3-C端网站 4-公众号
        				ObjectId : this.houseId,
        				Date : this.ReservationForm.ExpectedDate,//预约时间
        				Description : this.ReservationForm.Description,//附加说明
                    }
                    this.$axios.post(`/SearchRoomBill/CreateSearchRoomBill`,params).then(res=> {
                        this.btnLoading = false
                        this.dialogReservation = false
                        this.time = 0;
                        this.getBtnTxt = "获取验证码";
                        this.disabled = false;
                        this.timer()
                        this.$refs[formName].resetFields();
                        if(res.data.Status == 200){
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
                this.$axios.post(`/Common/SendSMS`,params).then((response) => {
                    var errorText = response.Info;
                    switch (response.data.Status) {
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
</style>
