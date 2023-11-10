<template>
  <div class="app-container" style="padding-top: 20px">
    <el-form label-width="120px" :disabled="elForm">
      <el-form-item label="司机id">
        <el-col :span="3">
          <el-input v-model="driver.driverID" :disabled="driverIDFrom" />
        </el-col>
      </el-form-item>
      <el-form-item label="司机姓名">
        <el-col :span="3">
          <el-input v-model="driver.dname" :disabled="dNameFrom" />
        </el-col>
      </el-form-item>
      <el-form-item label="车牌号">
        <el-col :span="10">
          <el-input v-model="driver.license" :disabled="licenseFrom" />
        </el-col>
      </el-form-item>
      <el-form-item label="是否忙碌">
        <el-col :span="3">
          <el-select
            v-model="driver.busy"
            clearable
            placeholder="请选择"
            :disabled="busyFrom"
          >
            <el-option :value="1" label="工作中" />
            <el-option :value="0" label="空闲" />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="司机电话">
        <el-col :span="4">
          <el-input v-model="driver.tel" />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdateDriver"
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
      imgUrl:'',
      driver: {
        driverID: 1,
        dname: "",
        license: "",
        tel: "",
        busy: "",
      },
      saveBtnDisabled: false, 
      elForm: false,
      driverIDFrom: false,
      dNameFrom: false,
      licenseFrom: false,
      busyFrom: false,
      driverID:this.$route.query.driverID,
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
      if (this.$route.query && this.$route.query.driverID) {
        const driverID = Number(this.$route.query.driverID);
        this.getDriverInfo(driverID);
        this.elForm = false;
        this.driverIDFrom=true;
      } else {
        this.driver = {};
        this.elForm = false;
        this.driverIDFrom = false;
        this.dNameFrom = false;
        this.busyFrom = false;
      }
      
    },
    saveOrUpdateDriver() {
      this.saveBtnDisabled = true;
      if (!this.driverID) {
        this.savedriver(); // 添加
      } else {
        this.updatedriver(); // 修改
      }
    },
    savedriver() {
      this.$http({
        method: "post",
        url: "driver/add",
        data: this.driver,
      })
        .then((response) => {
          this.$message({
            type: "success",
            message: "添加成功!",
          });
          this.$router.push({ path: "/driver/list" });
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: "添加失败!",
          });
        });
    },
    getDriverInfo(driverID) {
      this.$http({
        method: "get",
        url: `driver/select/${driverID}`,
      }).then((response) => {
        this.driver = response.data.data.driver;
      });
    },
    updatedriver() {
      this.$http({
        method: "post",
        url: "driver/update",
        data: this.driver,
      })
        .then((response) => {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          this.$router.push({ path: "/driver/list" });
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