<template>
    <el-container class="layout-default">
        <el-header style="height:60px;" class="clearfix login-header">
            <a class="fl" href="javascript:;" @click="clickLogo"><img class="index-logo rel" src="~/assets/img/logo.png"></a>
            <a class="fr" href="javascript:;" @click="clickLogo">
                <span class="fs18 inlin-b mr10">返回首页</span>
                <i class="el-icon-arrow-right rel"></i>
            </a>
        </el-header>
        <el-main class="login-main login-page">
            <div ref="loginPage">
                <el-card class="box-card fix" v-show="card1">
            		<div slot="header" class="clearfix">
            			<span style="font-size:28px">注册账号</span>
                        <nuxt-link to="/login" class="fr fs14 CRed">已有账号，立即登录<i class="el-icon-arrow-right rel"></i></nuxt-link>
            		</div>
            		<el-form :model="registerForm" label-position="right" :rules="rules" ref="registerForm" label-width="120px" class="demo-registerForm">
            			<el-form-item label="手机号码" prop="PhoneNum">
            				<el-input type="tel" maxlength="11" v-on:input="funcSendcode" v-model="registerForm.PhoneNum" auto-complete="off" placeholder="请输入您的手机号码"></el-input>
            			</el-form-item>
            			<el-form-item label="手机验证码" prop="ValidateCode">
            				<el-input style="width:120px;" type="text" v-model="registerForm.ValidateCode" auto-complete="off" placeholder="请输入验证码"></el-input>
            				<el-button style="margin-left:20px;" :disabled="disabled" @click="sendcode">{{ getBtnTxt }}</el-button>
            			</el-form-item>
            			<el-button class="login-btn block" type="primary"  @click="submitForm('registerForm')">下一步</el-button>
            		</el-form>
            	</el-card>
            	<el-card class="box-card fix" v-show="card2">
            		<div slot="header" class="clearfix">
            			<span style="font-size:28px">注册账号</span>
            		</div>
            		<el-form :model="registerForm2" label-position="right" :rules="rules2" ref="registerForm2" label-width="120px" class="demo-registerForm">
            			<el-form-item label="真实姓名" prop="RealName">
            				<el-input type="text" v-model="registerForm2.RealName" auto-complete="off" placeholder="请输入您的真实姓名"></el-input>
            			</el-form-item>
            			<el-form-item label="邮箱" prop="Email">
            				<el-input type="text" v-model="registerForm2.Email" auto-complete="off" placeholder="请输您的邮箱"></el-input>
            			</el-form-item>
            			<el-form-item label="密码" prop="Password">
            				<el-input :type="this.ispassword" @keyup.32.native="inputFunc(1)" v-model="registerForm2.Password" auto-complete="off" placeholder="请输入您的密码"></el-input>
                            <fa :icon="isShowPW" class="CRed pointer abs seePassword" @click="changeType()" />
            			</el-form-item>
            			<el-form-item label="确定密码" prop="confirm_pass">
            				<el-input :type="this.ispassword2" @keyup.32.native="inputFunc(2)" v-model="registerForm2.confirm_pass" auto-complete="off" placeholder="请确认密码"></el-input>
            				<fa :icon="isShowPW2" class="CRed pointer abs seePassword" @click="changeType2()" />
            			</el-form-item>
            			<el-form-item prop="agree" label-width="40px">
            				<el-checkbox v-model="registerForm2.type" label="agree" @change="handType()">
            					我已经阅读并同意
            				</el-checkbox>
            				<a class="linkBtn CRed" style="padding:0px;float: inherit;cursor:pointer;">
            					《用户注册协议》
            				</a>
            				<div class="tishixiaoxi" v-show="this.showCheckbox">请接受我们的声明</div>
            			</el-form-item>

            			<el-button class="login-btn block" type="primary" @click="submitForm2('registerForm2')">注册</el-button>
            		</el-form>
            	</el-card>
            </div>
        </el-main>
    </el-container>
</template>
<script>
var code; //在全局定义验证码
import CryptoJS from 'crypto-js'
export default {
    layout: 'blank',
    head() {
        return {
            title: '注册'
        }
    },
    data() {
		var validateRealName = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('真实姓名不能为空'));
			} else {
				callback();
			}
		};
		var validatePhoneNum = (rule, value, callback) => {
			let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
			if (value === '') {
				callback(new Error('手机号码不能为空'));
			} else if (!reg.test(value)) {
				callback(new Error('请输入正确的手机号码'));
			} else if (this.sidePhone!= ''&& value!= this.sidePhone) {
				callback(new Error('请输入正确的手机号码'));
			} else {
				callback();
			}
		};
		var validateValidateCode = (rule, value, callback) => {
			// let PhoneNum = this.registerForm.PhoneNum
			// let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
			if (value === '') {
				callback(new Error('手机验证码不能为空'));
			}
			//  else if (!reg.test(PhoneNum)) {
			// 	callback(new Error('请输入正确的手机号码'));
			// }
			else if(CryptoJS.MD5(value).toString()!== this.SMCode){
				callback(new Error('短信验证码不正确'));
			}else {
				callback();
			}
		};
		var validateEmail = (rule, value, callback) => {
			let reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (value !== '') {
				if (!reg.test(value)) {
					callback(new Error('请输入正确格式的邮箱'));
				} else {
					callback();
				}
			} else {
				callback();
			}
		};
		var validatePassword = (rule, value, callback) => {
			let reg=/^[1-9]\d*$|^0$/;
			let patrn=/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
			if (value === '') {
				callback(new Error('请输入密码'));
			} else if (value.length < 6) {
				callback(new Error("密码长度必须大于六位！"));
			} else if (reg.test(value)==true) {
				callback(new Error("密码不能为纯数字！"));
			} else if (patrn.exec(value)) {
				callback(new Error("密码不能有汉字！！"));
			} else {
				callback();
			}
		};
		var validateConfirm_pass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入确认密码'));
			} else if (value !== this.registerForm2.Password) {
				callback(new Error('两次输入密码不一致!'))
			} else {
				callback()
			}
		};
		return {
            isShowPW:['fas','eye-slash'],
            isShowPW2:['fas','eye-slash'],
			card1: true,
			card2: false,
			disabled: true,
			time: 0,
			getBtnTxt: "免费获取验证码",
			SMCode:'',//短信接口返回的验证码
			checkCode: '',
			ispassword: "password",
			fa_eyes: 'fa fa-eye-slash',
			ispassword2: "password",
			fa_eyes2: 'fa fa-eye-slash',
			sidePhone:'',
			showCheckbox: false,
			registerForm: {
				PhoneNum: '',
				ValidateCode: '',
			},
			rules: {
				PhoneNum: [{
					validator: validatePhoneNum,
					trigger: 'blur'
				}],
				ValidateCode: [{
					validator: validateValidateCode,
					trigger: 'blur'
				}],
			},
			registerForm2: {
				RealName: '',
				Email: '',
				Password: '',
				confirm_pass: '',
				type: []
			},
			rules2: {
				RealName: [{
					validator: validateRealName,
					trigger: 'blur'
				}],
				Email: [{
				  validator: validateEmail,
				  trigger: 'blur'
				}],
				Password: [{
					validator: validatePassword,
					trigger: 'blur'
				}],
				confirm_pass: [{
					validator: validateConfirm_pass,
					trigger: 'blur'
				}]
			},
			isPhone:false
		};
	},
    mounted(){
		this.$refs.loginPage.style.minHeight = document.documentElement.clientHeight+'px'
    },
    methods: {
        clickLogo(){
            this.$store.commit('SET_ACTIVEINDEX','0')
            this.$cookies.set('activeIndex','0')
            this.$router.push({path:'/'})
        },
		funcSendcode() {
			if (this.registerForm.PhoneNum == '') {
				this.disabled = true;
			} else {
				this.disabled = false;
			}
		},
		inputFunc(type) {
			switch (type) {
				case 1:
					this.registerForm2.Password = this.registerForm2.Password.replace(/[\u4e00-\u9fa5]/g, '');
					break;
				case 2:
					this.registerForm2.confirm_pass = this.registerForm2.confirm_pass.replace(/[\u4e00-\u9fa5]/g, '');
					break;
				default:
			}
		},
		sendcode() {
			var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
			if (this.registerForm.PhoneNum === '') {
				return;
			}
			if (!reg.test(this.registerForm.PhoneNum)) {
				return
			}
			this.time = 60;
			this.disabled = true;
			this.timer();
			let params = {
				PhoneNum: this.registerForm.PhoneNum
			}
			this.$axios.post(`/api/Member/IsExistPhone`,params).then((response) => {//判断手机号是否注册
				var errorText = response.data.Info;
				switch (response.data.StatusCode) {
					case 200:
						if (response.data.Data == true) {
							this.isPhone = true;
						}else if(response.data.Data == false){
							this.isPhone = false;
						}

						if (this.isPhone) {
							this.$message({
								type: 'error',
								message: '该手机号已注册！'
							});
							this.time = 0;
							this.getBtnTxt = "获取验证码";
							this.disabled = false;
							return;
						}
							let paramss = {
								Type: 1, //注册类型
								PhoneNum: this.registerForm.PhoneNum
							}
							this.$axios.post(`/api/Common/SendSMS`,paramss).then((response) => {//获取短信接口
								var errorText = response.data.Info;
								switch (response.data.StatusCode) {
									case 200:
										this.$message({
											type: 'success',
											message: '短信验证码发送成功，请注意查收！'
										});
										this.SMCode = response.data.Data.RegisterCode.toLowerCase();
										this.sidePhone = response.data.Data.PhoneNum;
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
							message: errorText
						});
						this.time = 0;
						this.getBtnTxt = "获取验证码";
						this.disabled = false;
						break;

				}
			})
			setTimeout(() => {

				}, 1000)
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
		submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.card1 = false;
						this.card2 = true;
					} else {
						return false;
					}
				});

		},
		submitForm2(formName) {

			let checkBoxLength = this.registerForm2.type.length;
			if (checkBoxLength < 1) {
				this.showCheckbox = true;
			} else {
				this.$refs[formName].validate((valid) => {
					// console.log(valid);
					if (valid) {
						let dataArry = {
							"RealName": this.registerForm2.RealName,
							"PhoneNum": this.registerForm.PhoneNum,
							"Email": this.registerForm2.Email,
							"Password": CryptoJS.MD5(this.registerForm2.Password).toString()
						}
                        // console.log(dataArry)
						this.$axios.post(`/api/Member/Register`,dataArry)//注册
							.then((response) => {
								var errorText = response.data.Info;
								switch (response.data.StatusCode) {
									case 200:
										this.$message({
											type: 'success',
											message: '注册成功！'
										});
										setTimeout(() => {
											this.$router.push("/login");
										}, 2000)
										break;
									case 500:
										this.$message({
											type: 'error',
											message: errorText
										});
										setTimeout(() => {
											this.$router.push({
												path: `/login`,
											})
										}, 1000)
										break;
									default:
										this.$message({
											type: 'error',
											message: '注册失败！'
										});
										setTimeout(() => {
											this.$router.push({
												path: `/login`,
											})
										}, 1000)
								}
							})
					} else {
						return false;
					}
				});
			}

		},
        changeType() {
			this.ispassword = this.ispassword === 'password' ? 'text' : 'password';
			this.isShowPW[1] =  this.isShowPW[1] === 'eye-slash' ? 'eye' : 'eye-slash'; //密码的显示和隐藏 眼睛图标
		},
        changeType2() {
			this.ispassword2 = this.ispassword2 === 'password' ? 'text' : 'password';
			this.isShowPW2[1] =  this.isShowPW2[1] === 'eye-slash' ? 'eye' : 'eye-slash'; //密码的显示和隐藏 眼睛图标
		},
		handType() {
			this.showCheckbox = false;
		}
	},
}
</script>
<style lang="scss">
@import "@/assets/css/login.scss";
</style>
