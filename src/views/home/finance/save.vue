<template>
  <div class="app-container" style="padding-top: 20px">
    <el-form label-width="120px" :disabled="elForm">
      <el-form-item label="货票id">
        <el-col :span="3">
          <el-input v-model="finance.id" :disabled="idFrom" />
        </el-col>
      </el-form-item>
      <el-form-item label="运单总价（新增时不填写！）">
        <el-col :span="3">
          <el-input v-model="finance.sum" :disabled="sumFrom" />
        </el-col>
      </el-form-item>
      <el-form-item label="赔付金额（新增时不填写！）">
        <el-col :span="3">
          <el-input v-model="finance.compensate" :disabled="comFrom" />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdateFinance"
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
      imgUrl: "",
      finance: {
        id: 1,
        sum: "",
        compensate: "",
      },
      saveBtnDisabled: false,
      elForm: false,
      idFrom: false,
      sumFrom: false,
      comFrom: false,
      id: this.$route.query.id,
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
      if (this.$route.query && this.$route.query.id) {
        const id = Number(this.$route.query.id);
        this.getFinanceInfo(id);
        this.elForm = false;
        this.idFrom = true;
      } else {
        this.finance = {};
        this.elForm = false;
        this.idFrom = false;
        this.sumFrom = false;
        this.comFrom = false;
      }
    },
    saveOrUpdateFinance() {
      this.saveBtnDisabled = true;
      if (!this.id) {
        this.saveFinance();
      } else {
        this.updateFinance();
      }
    },
    saveFinance() {
      this.$http({
        method: "post",
        url: "finance/add",
        data: this.finance,
      })
        .then((response) => {
          this.$message({
            type: "success",
            message: "添加成功!",
          });
          this.$router.push({ path: "/finance/list" });
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: "添加失败!",
          });
        });
    },
    getFinanceInfo(id) {
      this.$http({
        method: "get",
        url: `finance/select/${id}`,
      }).then((response) => {
        this.finance = response.data.data.finance;
      });
    },
    updateFinance() {
      this.$http({
        method: "post",
        url: "finance/update",
        data: this.finance,
      })
        .then((response) => {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          this.$router.push({ path: "/finance/list" });
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
