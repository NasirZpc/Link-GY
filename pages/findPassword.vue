<template>
    <el-container class="layout-default">
        <el-header style="height:60px;" class="clearfix login-header">
            <nuxt-link class="fl" to="/"><img class="index-logo rel" src="~/assets/img/logo.png"></nuxt-link>
            <nuxt-link class="fr" to="/">
                <span class="fs18 inlin-b mr10">返回首页</span>
                <i class="el-icon-arrow-right rel"></i>
            </nuxt-link>
        </el-header>
        <el-main class="login-main login-page">
            <div ref="loginPage">
                <!-- 第一个card -->
            	<el-card class="box-card fix" v-show="card1" style="height:240px">
                    <div slot="header" class="clearfix">
                        <span style="font-size:28px">找回密码</span>
            	        <el-progress :percentage="33.33" :show-text="false" class="pt20"></el-progress>
                    </div>
                    <el-form :model="oneForm" label-position="right" :rules="oneRules" ref="oneForm" label-width="120px" class="demo-ruleForm">
                        <el-form-item label="手机号码" prop="inputTel">
                            <el-input type="tel" maxlength="11" v-model="oneForm.inputTel" placeholder="请输入注册过的手机号" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-button class="login-btn block" type="primary" @click="submitForm('oneForm')">下一步</el-button>
                    </el-form>
                </el-card>
                <!-- 第二个card -->
            	<el-card class="box-card fix" v-show="card2">
            		<div slot="header" class="clearfix">
            	        <span style="font-size:28px">找回密码</span>
            		    <el-progress :percentage="66.66" :show-text="false" class="pt20"></el-progress>
            	    </div>
            		<el-form :model="twoForm" label-position="right" :rules="twoRules" ref="twoForm" label-width="120px" class="demo-ruleForm">
            			<el-form-item label="手机验证码" prop="ValidateCode">
            				<el-input style="width:125px;" type="text" placeholder="请输入短信验证码" v-model="twoForm.ValidateCode" auto-complete="off"></el-input>
            				<el-button style="margin-left:20px;" :disabled="disabled" @click="sendcode">{{ getBtnTxt }}</el-button>
            			</el-form-item>
            			<el-button class="login-btn block" type="primary" @click="submitForm2('twoForm')">提交</el-button>
            		</el-form>
            	</el-card>
                <!-- 通过手机号修改成功 -->
            	<el-card class="box-card fix" v-show="card3">
            		<div slot="header" class="clearfix">
            	      <span style="font-size:28px">找回密码</span>
            		  <el-progress :percentage="100" :show-text="false" class="pt20"></el-progress>
            	    </div>
            		<el-form :model="threeForm" label-position="right" :rules="threeRules" ref="threeForm" label-width="120px" class="demo-ruleForm">
            			<el-form-item label="新密码" prop="Password">
            				<el-input :type="this.ispassword" @keyup.32.native="inputFunc(1)" placeholder="请输入新密码" v-model="threeForm.Password" auto-complete="off"></el-input>
            				<fa :icon="isShowPW" class="CRed pointer abs seePassword" @click="changeType()" />
            			</el-form-item>
            			<el-form-item label="确定密码" prop="confirm_pass">
            				<el-input :type="this.ispassword2" @keyup.32.native="inputFunc(2)" placeholder="请确认新密码" v-model="threeForm.confirm_pass" auto-complete="off"></el-input>
            				<fa :icon="isShowPW2" class="CRed pointer abs seePassword" @click="changeType2()" />
            			</el-form-item>
            			<el-button class="login-btn block" type="primary" @click="submitForm3('threeForm')">确认修改</el-button>
            		</el-form>
            	</el-card>
            	<el-card class="box-card" v-show="card4">
            		<div style="font-size:28px;margin: 20px 0px 15px 0;">手机验证找回密码成功！！！</div>
            		<router-link :to="`/login`">
            			<el-button class="login-btn block" type="primary" style="float:left;margin-bottom:30px;">点这里返回登录页面>>></el-button>
            		</router-link>
            	</el-card>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import CryptoJS from 'crypto-js'
var codeFindPassword; //在全局定义验证码
export default {
    layout: 'blank',
    head() {
        return {
            title: '登录'
        }
    },
	data() {
		var validatePhoneNum = (rule, value, callback) => {
			let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
			if (value === '') {
				callback(new Error('手机号码不能为空'));
			} else if (!reg.test(value)) {
				callback(new Error('请输入正确的手机号码'));
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
			} else if (value !== this.threeForm.Password) {
				callback(new Error('两次输入密码不一致!'))
			} else {
				callback()
			}
		};
		var validateValidateCode = (rule, value, callback) => {
			let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
			if (value === '') {
				callback(new Error('手机验证码不能为空'));
			} else if (CryptoJS.MD5(value).toString() != this.SMCode_phone) {
				callback(new Error('短信验证码不正确'));
			} else {
				callback();
			}
		};
		return {
            isShowPW:['fas','eye-slash'],
            isShowPW2:['fas','eye-slash'],
			card1: true,
			card2: false,
			card3: false,
			card4: false,
			activeName: 'first',
			checkCode: '', //验证码value值
			disabled: false,
			time: 0,
			getBtnTxt: "免费获取验证码",
			SMCode_phone: '', //短信接口返回的验证码
			ispassword: "password",
			fa_eyes: 'fa fa-eye-slash',
			ispassword2: "password",
			fa_eyes2: 'fa fa-eye-slash',
			oneForm: {
				inputTel: ''
			},
			oneRules: {
				inputTel: [{
					validator: validatePhoneNum,
					trigger: 'blur'
				}]
			},
			twoForm: {
				ValidateCode: ''
			},
			twoRules: {
				ValidateCode: [{
					validator: validateValidateCode,
					trigger: 'blur'
				}]
			},
			threeForm: {
				Password: '',
				confirm_pass: ''
			},
			threeRules: {
				Password: [{
					validator: validatePassword,
					trigger: 'blur'
				}],
				confirm_pass: [{
					validator: validateConfirm_pass,
					trigger: 'blur'
				}]
			}
		};
	},
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.$store.commit('SET_HEADTOGGLE', 1)
		})
	},
	beforeRouteLeave(to, from, next) {
		this.$store.commit('SET_HEADTOGGLE', 0)
		next()
	},
	methods: {
		inputFunc(type) {
			switch (type) {
				case 1:
					this.threeForm.Password = this.threeForm.Password.replace(/[\u4e00-\u9fa5]/g, '');
					break;
				case 2:
					this.threeForm.confirm_pass = this.threeForm.confirm_pass.replace(/[\u4e00-\u9fa5]/g, '');
					break;
				default:
			}
		},
		handleClick(tab, event) {
		},
		// 图片验证码
		createCode() {
			codeFindPassword = "";
			var codeLength = 4; //验证码的长度
			var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
				'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //随机数
			for (var i = 0; i < codeLength; i++) { //循环操作
				var index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）
				codeFindPassword += random[index]; //根据索引取得随机数加到code上
			}
			this.checkCode = codeFindPassword; //把code值赋给验证码
		},
		sendcode() {
			this.time = 60;
			this.disabled = true;
			this.timer();
			let params = {
				Type: 2, //找回密码
				PhoneNum: this.oneForm.inputTel
			}
			console.log(params)
			this.$axios.post(`/api/Common/SendSMS`,params).then((response) => {
				var errorText = response.data.Info;
				switch (response.data.StatusCode) {
					case 200:
						this.$message({
							type: 'success',
							message: '短信验证码发送成功，请注意查收！'
						});
						this.SMCode_phone = response.data.Data.RegisterCode.toLowerCase();
						break;
					case 500:
						this.$message({
							type: 'error',
							message: errorText
						});
						this.time = 0;
						this.getBtnTxt = "免费获取验证码";
						this.disabled = false;
						break;
					default:
						this.$message({
							type: 'error',
							message: '短信验证码发送失败！'
						});
						this.time = 0;
						this.getBtnTxt = "免费获取验证码";
						this.disabled = false;
				}
			})
		},
		timer() {
			if (this.time > 0) {
				this.time--;
				this.getBtnTxt = this.time + "s后重新获取";
				setTimeout(this.timer, 1000);
			} else {
				this.time = 0;
				this.getBtnTxt = "免费获取验证码";
				this.disabled = false;
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
		submitForm(formName) {
		    this.$refs[formName].validate((valid) => {
			    if (valid) {
					let params = {
						PhoneNum: this.oneForm.inputTel
					}
					this.$axios.post(`/api/Member/IsExistPhone`,params).then((response) => {//判断手机号是否注册过
						var errorText = response.data.Info;
						switch (response.data.StatusCode) {
							case 200:
							if(response.data.Data == true){
								this.card1 = false;
								this.card2 = true;
							}else {
								this.$message({
									type: 'error',
									message: "您的手机号未注册！"
								});
							}
								break;
							case 500:
								this.$message({
									type: 'error',
									message: errorText
								});
								break;
							default:
								this.$message({
									type: 'error',
									message: errorText
								});
								break;

						}
					})
			    } else {
			        return false;
			    }
		    });
		},
		submitForm2(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
	  		      	this.card2 = false;
					this.card3 = true;
				} else {
					return false;
				}
			});
		},
		submitForm3(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					let params = {
						Type: 1,
						PhoneNum: this.oneForm.inputTel,
						Password: CryptoJS.MD5(this.threeForm.Password).toString()
					}
                    this.$axios.post(`/api/Member/FindPassword`,params).then((response) => {
						var errorText = response.data.Info;
						switch (response.data.StatusCode) {
							case 200:
								this.card3 = true;
								this.card4 = false;
									this.$message({
										type: 'success',
										message: "密码找回成功"
									});
								setTimeout(() => {
									this.$router.push("/login");
								}, 1500)
								break;
							case 500:
								this.$message({
									type: 'error',
									message: errorText
								});
								break;
							default:
								this.$message({
									type: 'error',
									message: errorText
								});
								break;

						}
					})
				} else {
					return false;
				}
			});
		},
	},
	mounted() {
		this.$refs.loginPage.style.minHeight = document.documentElement.clientHeight+'px'
	},
	created() {
		this.createCode();
	}
}
</script>
<style lang="scss">
@import "@/assets/css/login.scss";
</style>
