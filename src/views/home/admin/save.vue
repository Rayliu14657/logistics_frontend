<template>
  <div class="app-container" style="padding-top: 20px">
    <el-form label-width="120px">
      <el-form-item label="管理员编号">
        <el-col :span="3">
          <el-input v-model="admin.adminID" :disabled="adminIDFrom" />
        </el-col>
      </el-form-item>
      <el-form-item type="password" label="密码">
        <el-col :span="3">
          <el-input
            type="password"
            v-model="admin.password"
            :disabled="passwordFrom"
          />
        </el-col>
      </el-form-item>

      <el-form-item
        label="等级
      "
      >
        <el-col :span="3">
          <el-select
            v-model="admin.level"
            clearable
            placeholder="请选择"
            :disabled="levelFrom"
          >
            <el-option :value="1" label="一级管理员" />
            <el-option :value="2" label="二级管理员" />
          </el-select>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdateAdmin"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ID: "",
      imgUrl: "",
      admin: {
        adminID: "",
        password: "",
        level: "",
      },
      saveBtnDisabled: false,
      adminIDFrom: false,
      passwordFrom: false,
      levelFrom: false,
    };
  },
  created() {
    this.init();
  },
  watch: {
    $route(to, from) {
      this.init();
    },
  },
  methods: {
    init() {
      if (this.$route.query && this.$route.query.adminID) {
        this.ID = Number(this.$route.query.adminID);
        this.getAdminByAdminID(this.ID);
        this.adminIDFrom = true;
        if (this.ID == localStorage.getItem("adminID")) {
          this.levelFrom = true;
        }
      } else {
        this.admin = {};
        this.adminIDFrom = false;
        this.levelFrom = false;
      }
    },
    saveOrUpdateAdmin() {
      // 判断修改还是添加，根据 admin 是否有 id
      this.saveBtnDisabled = true;
      if (!this.ID) {
        this.saveAdmin(); // 添加
      } else {
        this.updateAdmin(); // 修改
      }
    },
    saveAdmin() {
      this.$http({
        method: "post",
        url: "admin/add",
        data: this.admin,
      })
        .then((response) => {
          this.$message({
            type: "success",
            message: "添加成功!",
          });
          this.$router.push({ path: "/admin/list" });
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: "添加失败!",
          });
        });
    },
    getAdminByAdminID(adminID) {
      this.$http({
        method: "get",
        url: `admin/getById/${adminID}`,
      }).then((response) => {
        this.admin = response.data.data.admin;
      });
    },
    updateAdmin() {
      this.$http({
        method: "post",
        url: "admin/update",
        data: this.admin,
      })
        .then((response) => {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          this.$router.push({ path: "/admin/list" });
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: "修改失败!",
          });
        });
    },
  },
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  float: left;
  background-color: #fff;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
