<template>
<div>
  <el-main class="login-view" :style="defaultHeight">
<!--    <div class="videoContainer">-->
<!--      &lt;!&ndash;      autoplay loop muted class="fillWidth"&ndash;&gt;-->
<!--      <video  playsinline="" autoplay="" muted="" loop=""  v-on:true>-->
<!--        <source src=".../assets/login-background.mp4" type="video/mp4"/>-->
<!--      </video>-->
<!--    </div>-->
    <el-card class="box-card">
      <el-form :model="ruleForm" :rules="rules"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="id">
          <el-input v-model="ruleForm.id"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="ruleForm.pwd" @keyup.enter.native="submitForm('ruleForm')" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-main>

</div>
</template>

<script>
import {JSEncrypt} from "jsencrypt";

export default {
  name: "index",
  created() {
    let _this = this
    _this.getHeight()
    window.addEventListener("resize", _this.getHeight);
    axios.get("http://localhost:8020/pubkey").then(function (resp){
      _this.pubKey = resp.data
      console.log("公钥为："+resp.data)
    })
  },
  data() {
    return {
      defaultHeight: {
        height: ''
      },
      ruleForm: {
        id: '',
        pwd: '',
        rsaPwd: 'default'
      },
      pubKey: '',
      rules: {
        id: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getHeight() {
      this.defaultHeight.height = window.innerHeight + "px";
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        let _this = this
        let encryptor = new JSEncrypt()
        encryptor.setPublicKey(this.pubKey)
        _this.ruleForm.rsaPwd = encryptor.encrypt(this.ruleForm.pwd)
        console.log("公钥加密后密码："+encryptor.encrypt(this.ruleForm.pwd))
        if (valid) {
          _this.$axios({
            method: 'post',
            url: 'http://localhost:8020/login',
            headers: {
              'Content-Type': "application/json;charset=UTF-8"
            },
            data: {
              id: this.ruleForm.id,
              pwd: this.ruleForm.rsaPwd
            }
          }).then(res=>{

            if (parseInt(res.data.code)){
              this.$store.commit("LOGIN_IN_USERID", res.data.data.user.id);
              this.$store.commit("LOGIN_IN_TOKEN", res.data.data.token);
              _this.$alert('登录成功！', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.$router.push({path:'/'});
                }
              });
            } else {
              alert("账号或密码错误！");
            }
          })
              .catch(err=>{
                alert("请求错误："+err.message);

              })
        } else {
          _this.$alert('填写不符合规定！', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              // this.$router.replace('/');
            }
          });
          return false;
        }
      });
    }
  }

}
</script>

<style scoped>
body, html{
  margin: 0px;
  padding: 0px;
  height: 100%;
  width: 100%;
}

.videoContainer {
  margin: 0px !important;
  padding: 0px !important;
  z-index: -100;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.demo-ruleForm{
  overflow: hidden;
}

.box-card{
  /*position: absolute;*/
  margin: 0 auto !important;
  overflow: hidden;
  padding: 30px 10px 10px 10px;
  z-index: 100;
}

.login-view {
  width: 100%;
  height: 100%;
  /*height: 90vh;*/
  display: flex;
  justify-content: center !important;
  align-items: center !important;
  overflow: hidden !important;
}
</style>
