<template>
  <div class="login-bg">
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">数据服务查询系统</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号" class="login-input"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码" class="login-input"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining" class="login-btn">登录</el-button>
        <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { requestLogin } from '../api/api';
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: '',
          checkPass: ''
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            //_this.$router.replace('/table');
            this.logining = true;
            //NProgress.start();
            var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };
            requestLogin(loginParams).then(result => {
              this.logining = false;
              //NProgress.done();
              let { message, success, data } = result;
              if (!success) {
                this.$message({
                  message,
                  type: 'error'
                });
              } else {
                let data = {
                  id:1,
                  name:"user",
                  username:"user",
                  avatar: "https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png",
                }
                sessionStorage.setItem('user', JSON.stringify(data));
                this.$router.push({ path: '/orders' });
              }
            });
          } else {
            console.log('error submit!!');
            resolve([200, { errorCode: 10, errorMsg: '账号或密码错误' }]);
            return false;
          }
        });
      }
    }
  }

</script>

<style lang="scss">
  .login-bg{
    position: absolute;
    top:0;left:0;right:0;bottom:0;
    background:url(../assets/bg.png) center;
    background-size:cover;
    -moz-background-size:cover;
    -webkit-background-size:cover;
    -o-background-size:cover;
  }
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 10px;
    border-radius: 10px;
    -moz-border-radius: 10px;
    background-clip: padding-box;
    margin:auto;
    position: absolute;
    top:0;right:0;bottom:0;left:0;
    width: 350px;
    height:300px;
    padding: 35px 35px 15px 35px;
    background:rgba(0,64,128,0.6);
    // border: 1px solid #eaeaea;
    // box-shadow: 0 0 25px #cac6c6;
    }
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #fff;
      font-size:26px;
    }
    .remember {
      margin: 0px 0px 35px 0px;
      color:#fff;
    }
    .login-btn{font-size:22px;letter-spacing: 5px;}
    .login-input{
      border-color:#fff;
      .el-input__inner{
        background-color:transparent;
        color:#fff;
      }
      .el-input__inner::-webkit-input-placeholder {
        color: #ddd;
      }
      .el-input__inner:-moz-placeholder {/* Firefox 18- */
        color: #ddd;
      }
      .el-input__inner::-moz-placeholder{/* Firefox 19+ */
      color: #ddd;
      }
      .el-input__inner:-ms-input-placeholder {
        color: #ddd;
      }
    }
    
</style>