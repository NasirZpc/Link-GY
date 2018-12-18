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
                <el-card class="box-card fix">
                    <div slot="header" class="clearfix">
                        <span class="fs22 C0">登录</span>
                        <nuxt-link to="/register" class="fr fs14 CRed">立即注册</nuxt-link>
                    </div>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                        <el-form-item label="手机号码" prop="tel">
                            <el-input v-model="ruleForm.tel" placeholder="请输入手机号" maxlength="11"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password" class="rel">
                            <el-input v-model="ruleForm.password" placeholder="请输入密码" :type="this.ispassword"></el-input>
                            <fa :icon="isShowPW" class="CRed pointer abs seePassword" @keyup.enter.native="submitForm('ruleForm')" @click="changeType()" />
                        </el-form-item>
                        <el-form-item label="验证码" prop="vcode">
                            <el-input style="width:220px;" v-model="ruleForm.vcode" placeholder="请输入验证码"></el-input>
                            <input type="button" id="code" @click="createCode" class="verification fr" v-model="checkCode" />
                        </el-form-item>
                        <el-form-item class="tr">
                            <nuxt-link class="CRed forget-password" to="/">忘记密码</nuxt-link>
                        </el-form-item>
                    </el-form>
                    <el-button class="login-btn block" type="primary" @click="submitForm('ruleForm')" :loading="btnLoading">登录</el-button>
                </el-card>
            </div>
        </el-main>
    </el-container>
</template>
<script>
var code; //在全局定义验证码
import CryptoJS from 'crypto-js'
import qs from 'qs'
export default {
    layout: 'blank',
    head() {
        return {
            title: '登录'
        }
    },
    data(){
        var validateAccount = (rule, value, callback) => {
			let regPhoneNum = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
			let regEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (value === '') {
				callback(new Error('请输入用户名'));
			} else if (!regPhoneNum.test(value) && !regEmail.test(value)) {
				callback(new Error('请输入正确格式的邮箱或手机号'));
			} else {
				callback();
			}
		};
        var validatePassword = (rule, value, callback) =>{
            if (value === '') {
				callback(new Error('请输入密码'));
			} else {
				callback();
			}
        };
        var validateVerifyCode = (rule, value, callback) => {
			value.toUpperCase(); //取得输入的验证码并转化为大写
			if (value === '') {
				callback(new Error('请输入验证码'));
			} else if (value.toUpperCase() != this.checkCode) { //若输入的验证码与产生的验证码不一致时
				callback(new Error('验证码不正确'));
				this.isD = false;
				this.createCode(); //刷新验证码
			} else {
				callback();
			}
		};
        return {
            isShowPW:['fas','eye-slash'],
            ispassword: "password",
            btnLoading:false,
            ruleForm:{
                tel:'',
                password:'',
                vcode:''
            },
            rules: {
                tel: [
                    {
                        validator: validateAccount,
                        trigger: 'blur'
                    },
                    { required: false, message: '请输入手机号', trigger: 'blur' },
                    { min: 11, max: 11, message: '请输入11位手机号', trigger: 'blur' }
                ],
                password:[
                    { required: false, message: '请输入密码', trigger: 'blur' },
                    { min: 6, message: '密码位数不能少于6位，请重新输入', trigger: 'blur' },
                    {
                        validator: validatePassword,
                        trigger: 'blur'
                    },
                ],
                vcode:[
                    { required: false, message: '请输入验证码', trigger: 'blur' },
                    { min: 4, message: '请重新输入4位验证码', trigger: 'blur' },
                    {
                        validator:validateVerifyCode,
                        trigger: 'blur'
                    }
                ]
            },
            checkCode: '',
        }
    },
    mounted(){
		this.$refs.loginPage.style.minHeight = document.documentElement.clientHeight+'px'
    },
    methods: {
        // 图片验证码
		createCode() {
            code = "";
			var codeLength = 4; //验证码的长度
			var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
				'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //随机数
			for (var i = 0; i < codeLength; i++) { //循环操作
				var index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）
				code += random[index]; //根据索引取得随机数加到code上
			}
			this.checkCode = code; //把code值赋给验证码
		},
        changeType() {
			this.ispassword = this.ispassword === 'password' ? 'text' : 'password';
			this.isShowPW[1] =  this.isShowPW[1] === 'eye-slash' ? 'eye' : 'eye-slash'; //密码的显示和隐藏 眼睛图标
		},
        //注册
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.btnLoading = true
                    this.$axios.post('/api/Member/Login',{
                        Account:this.ruleForm.tel,
                        Password:CryptoJS.MD5(this.ruleForm.password).toString(),
                        VerifyCode:this.ruleForm.vcode
                    }).then(({status,data})=>{
                        if(data.StatusCode == 200){
                            this.$cookies.set('linkToken',data.Data.Token)
                            this.$cookies.set('linkId',data.Data.AccountId)
                            this.btnLoading = false
                            this.$message({
                                type: 'success',
                                message: '登录成功！'
                            });
                            setTimeout(()=>{
                                location.href='/'
                            },500)
                        }else{
                            this.$message({
                                type: 'error',
                                message: data.Info+',请重新登录!'
                            });
                        }
                    })
                } else {
                    this.btnLoading = false
                    this.$message({
                        type: 'error',
                        message: '登录失败请重新登录！'
                    });
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    },
    created() {
		this.createCode()
	}
}
</script>
<style lang="scss">
@import "@/assets/css/login.scss";
</style>
