<template>
  <el-aside width="200px">
    <div
      id="title"
      style="
        height: 100px;
        padding-top: 30px;
        margin: 0;
        color: w;
        font-size: 20px;
      "
    >
      <img src="../../img/logo.jpg" />
      <div>
        <span>物流</span>
        <span>管理系统</span>
      </div>
    </div>
    <el-menu
      default-active="/index"
      class="el-menu-vertical-demo"
      background-color="#070833"
      router
    >
      <!-- 无子级 -->
      <el-menu-item
        index="/index"
        style="margin-top: 30px; color: rgb(255, 255, 255)"
      >
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <!-- 有子级 -->
      <el-submenu
        index="/admin"
        style="color: rgb(255, 255, 255); margin-top: 20px"
      >
        <template slot="title">
          <i class="el-icon-user-solid"></i
          ><font size="3" color="pink">管理员界面</font>
        </template>
        <el-menu-item
          index="/admin/list"
          style="margin-top: 20px; color: rgb(255, 255, 255)"
        >
          <i class="el-icon-menu"></i>管理员列表
        </el-menu-item>
      </el-submenu>

      <el-submenu
        index="/carriage"
        style="margin-top: 20px; color: rgb(255, 255, 255)"
      >
        <template slot="title">
          <i class="el-icon-s-shop"></i
          ><font size="3" color="pink">运费管理</font>
        </template>
        <el-menu-item
          index="/carriage/list"
          style="margin-top: 20px; color: rgb(255, 255, 255)"
        >
          <i class="el-icon-menu"></i>运费等级列表
        </el-menu-item>
      </el-submenu>
      <el-submenu
        index="/driver"
        style="margin-top: 20px; color: rgb(255, 255, 255)"
      >
        <template slot="title">
          <i class="el-icon-user-solid"></i
          ><font size="3" color="pink">司机管理</font>
        </template>
        <el-menu-item
          index="/driver/list"
          style="margin-top: 20px; color: rgb(255, 255, 255)"
          ><i class="el-icon-menu"></i>司机列表</el-menu-item
        >
      </el-submenu>

      <!-- 有子级 -->
      <el-submenu
        index="/ticket"
        style="margin-top: 20px; color: rgb(255, 255, 255)"
      >
        <template slot="title">
          <i class="el-icon-s-shop"></i
          ><font size="3" color="pink">货票管理</font>
        </template>
        <el-menu-item
          index="/ticket/list"
          style="margin-top: 20px; color: rgb(255, 255, 255)"
          ><i class="el-icon-menu"></i>货票列表
        </el-menu-item>
        <el-menu-item
          index="/ticket/save"
          style="margin-top: 20px; color: rgb(255, 255, 255)"
          ><i class="el-icon-plus"></i>货票登记
        </el-menu-item>
      </el-submenu>
      <!-- 有子级 -->
      <el-submenu
        index="/transinfo"
        style="margin-top: 20px; color: rgb(255, 255, 255)"
      >
        <template slot="title">
          <i class="el-icon-s-shop"></i
          ><font size="3" color="pink">运单管理</font>
        </template>
        <el-menu-item
          index="/transinfo/list"
          style="margin-top: 20px; color: rgb(255, 255, 255)"
        >
          <i class="el-icon-menu"></i>运单列表
        </el-menu-item>
      </el-submenu>
      <!-- 有子级 -->

      <el-submenu
        index="/finance"
        style="margin-top: 20px; color: rgb(255, 255, 255)"
      >
        <template slot="title">
          <i class="el-icon-s-shop"></i
          ><font size="3" color="pink">财务管理</font>
        </template>
        <el-menu-item
          index="/finance/list"
          style="margin-top: 20px; color: rgb(255, 255, 255)"
          ><i class="el-icon-menu"></i>账单列表
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  data() {
    return {
      admin: {
        adminname: "",
        level: 1,
      },
    };
  },
  created() {
    this.admin.username = localStorage.getItem("adminName");
    this.admin.level = localStorage.getItem("level");
  },
};
</script>
<style>
#title img {
  display: block;
  width: 50px;
  height: 50px;
  float: left;
  margin: 5px 0 0 10px;
}
#title div {
  float: left;
  margin-left: 20px;
}
#title span {
  display: block;
  line-height: 30px;
}
.el-aside {
  height: 100vh;
  background-color: rgb(10, 10, 10);
}
.el-menu {
  background-color: rgb(10, 10, 10);
}
</style>
