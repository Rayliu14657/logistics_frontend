<template>
  <div class="app-container" style="padding-top: 20px">
    <el-form label-width="120px" >
      <el-form-item label="运费等级">
        <el-col :span="3">
          <el-input v-model="carriage.status" :disabled="statusFrom" />
        </el-col>
      </el-form-item>
      <el-form-item type="cost" label="运费">
        <el-col :span="3">
          <el-input
            type="cost"
            v-model="carriage.cost"
            :disabled="costFrom"
          />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="updateCarriage"
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
      carriage: {
        status: "",
        cost: "",
      },
      saveBtnDisabled: false, 
      statusFrom: false,
      costFrom: false,
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
        const status = Number(this.$route.query.status);
        this.carriage.status=status;
        this.getCarriageByStatus(status);
        this.statusFrom = true;
    },
    getCarriageByStatus(status) {
      this.$http({
        method: "get",
        url: `carriage/getByStatus/${status}`,
      }).then((response) => {
        this.carriage = response.data.data.status;
      });
    },
    updateCarriage() {
      this.$http({
        method: "post",
        url: "carriage/update",
        data: this.carriage,
      })
        .then((response) => {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          this.$router.push({ path: "/carriage/list" });
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