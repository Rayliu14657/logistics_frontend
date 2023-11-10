<template>
<div id='building'>
    <div class="login">
      <p class="title">物流管理系统</p>
      <el-form
        :model="admin"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户ID" prop="adminID">
          <el-input v-model="admin.adminID"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="admin.password"></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="login('ruleForm')">登录</el-button>
          <span></span>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      admin: {
        adminID: "",
        password: "",
        level:"",
      },

      rules: {
        adminID: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "长度在 3 到 12 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 16,
            message: "长度在 3 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 登录方法
    // 登录方法
    login() {
      this.$http({
        method: "post",
        url: "/admin/login",
        data: this.admin,
      }).then((res) => {
        let code = res.data.code;
        if (code == 200) {
          this.admin = res.data.data.admin;
          console.log("adminID: ", this.admin.adminID);
          // 将用户名全局存储
          localStorage.setItem("adminID", this.admin.adminID);
          sessionStorage.setItem("adminID", this.admin.adminID);
          console.log("level: ", this.admin.level);
          // 将用户名全局存储
          localStorage.setItem("level", this.admin.level);
          sessionStorage.setItem("level", this.admin.level);
          // 页面跳转
          this.$router.push("/index");
        }else{
          alert('用户名或密码错误！');
        }
      });
    },
    // 清空表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style>
*{
    margin:0;
    padding:0;
}
.login {
  padding-top: 200px;
}
.title{
    font-size: 30px;
    font-weight: bold;
    letter-spacing: 20px;
    text-shadow: 2px 2px rgba(32, 126, 203, 0.461);
}
.demo-ruleForm {
  width: 350px;
  margin: 40px auto;
  padding: 40px 50px 10px 0;
  text-align: center;
  box-shadow: 0 50px 50px 0 rgba(16, 17, 130, 0.1);
  background-color: rgb(254, 254, 254,0.7);
}

.login p {
  text-align: center;
}
.btn {
  text-align: center;
}
.btn span {
  display: inline-block;
  width: 30px;
}
#building{
  background:url("../../src/views/img/12.jpg");
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}

</style>