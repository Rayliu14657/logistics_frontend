<template>
  <div>
    <el-container>
      <!-- 左侧导航菜单 -->
      <Nav />
      <!-- 右侧主体 -->
      <el-container>
        <!-- 右侧主体——头部 -->
        <el-header>
          <div id="msg">
            <span>当前用户：{{ admin.adminID }}</span>
            <span>管理员等级：{{ admin.adminLevel }}</span>
            <a @click="logout" href="#" class="logout">退出</a>
          </div>
          <!-- 面包屑 -->
          <BreadCrumb />
        </el-header>
        <!-- 右侧主体——主体 -->
        <el-main style="padding-top: 0; height: 700px">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Nav from "./Nav.vue";
import BreadCrumb from "../layout/BreadCrumb.vue";
export default {
  components: {
    Nav,
    BreadCrumb,
  },
  data() {
    return {
      admin: {
        adminID: "000",
        adminLevel: "",
      },
    };
  },
  mounted() {},
  created() {
    // this.admin.adminID = localStorage.getItem("adminID");
    // this.admin.adminLevel = localStorage.getItem("level");
    this.admin.adminID = sessionStorage.getItem("adminID");
    this.admin.adminLevel = sessionStorage.getItem("level");
  },
  methods: {
    logout() {
      // localStorage.removeItem('adminID');
      // localStorage.removeItem('level');
      sessionStorage.removeItem("adminID");
      sessionStorage.removeItem("level");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
.logout {
  display: block;
  float: right;
  text-decoration: none;
  color: #fff;
  background-color: rgba(0, 0, 255, 0.7);
  width: 70px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin-top: 10px;
  border-radius: 20px;
}
.logout:hover {
  text-decoration: underline;
  background-color: rgba(0, 0, 255, 0.5);
  color: red;
}
.el-header {
  background-color: rgb(7, 8, 51);
  color: rgb(249, 249, 248);
  text-align: center;
  line-height: 50px;
}

.el-aside {
  background-color: rgb(7, 8, 51);
  color: rgb(247, 246, 249);
  text-align: center;
}

.el-main {
  background-color: rgb(238, 240, 244);
  color: rgb(245, 242, 242);
  text-align: center;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
#msg {
  width: 400px;
  height: 60px;
  line-height: 60px;
  float: right;
  text-align: left;
  padding-right: 80px;
}
#msg span {
  margin-right: 40px;
}
</style>
