<template>
    <div class="login-container">
        <div class="login-head">

        </div>
        <el-form
        ref="login-form"
        :model="user"
        :rules="formRules"
        class="login-form"
        >
            <el-form-item prop="mobile">
                <el-input placeholder="请输入手机号" v-model="user.mobile"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input  placeholder="请输入密码" v-model="user.code"></el-input>
            </el-form-item>
            <el-form-item prop="isAgree">
                <el-checkbox label="我已阅读并同意用户协议和隐私条款" name="type" v-model="user.isAgree"></el-checkbox>
            </el-form-item>

            <el-form-item>
                <el-button
                type="primary"
                @click="onLogin"
                class="login-button"
                :loading="buttonLoading"
                >提交</el-button>

            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    //导入自己封装的请求模块
    import {login} from "@/api/user"
    export default {
        name: "loginIndex",
        data() {
            return {
                user: {
                   mobile:'13911111111',
                    code:'246810',
                    isAgree:false

                },
                buttonLoading:false,//默认loading为false
                formRules:{
                    mobile: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { min: 11,  message: '长度至少 11 位', trigger: 'blur' },
                        { pattern: /^1[3|5|8|7|9]\d{9}$/,  message: '手机号格式不正确', trigger: 'blur' },
                    ],
                    code: [
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                        { min: 6,max:6, message: '验证码长度为6', trigger: 'blur' },
                    ],
                    isAgree:[
                        {validator:(rule,value,callback)=>{
                            if(value){
                                callback()
                            }else{
                                callback(new Error('请勾选用户协议'))
                            }
                            },trigger:'blur'}
                    ]
                }
            }
        },
        methods: {
            onLogin() {
                //表单验证
                this.$refs['login-form'].validate((valid,err) => {
                    if (!valid) {
                       //表单验证失败
                        return false
                    }else{
                        //验证通过，提交登录
                        this.login()
                    }
                })


                //处理后端响应结果
            },
            login(){
                this.buttonLoading=true
                login(this.user).then(res=>{
                    this.$message({
                        message: '登录成功',
                        type: 'success'
                    });
                    this.buttonLoading=false
                    this.$router.push({name:'home'})
                }).catch(err=>{
                    this.$message.error('登录失败，手机号或验证码不正确');
                    this.buttonLoading=false
                })
            },
        }
    }
</script>

<style scoped lang="less">
    .login-container{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom:0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: url("login_bg.jpg") no-repeat;
        background-size: cover;
        .login-head{
            height:57px;
            background: url("logo_index.png") no-repeat white center;
            width: 400px;
            margin-bottom: 0;
        }
    }
    .login-form{
        background-color: white;
        padding: 50px;
        min-width: 300px;
        .login-button{
            width: 100%;
        }
    }

</style>