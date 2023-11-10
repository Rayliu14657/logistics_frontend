<template>
  <div class="app-container" style="padding-top: 20px">
    <el-form label-width="120px" :disabled="elForm">
      <el-form-item label="货票号">
        <el-col :span="3">
          <el-input v-model="transinfo.id" :disabled="idFrom" />
        </el-col>
      </el-form-item>
      <el-form-item label="出发省">
        <el-col :span="3">
          <el-input v-model="transinfo.fromProvince" :disabled="fromProFrom" />
        </el-col>
      </el-form-item>
      <el-form-item label="目的省">
        <el-col :span="3">
          <el-input v-model="transinfo.toProvince" :disabled="toProFrom" />
        </el-col>
      </el-form-item>
      <el-form-item label="出发地">
        <el-col :span="3">
          <el-input v-model="transinfo.fromSpot" :disabled="fromSpotFrom" />
        </el-col>
      </el-form-item>
      <el-form-item label="目的地">
        <el-col :span="3">
          <el-input v-model="transinfo.toSpot" :disabled="toSpotFrom" />
        </el-col>
      </el-form-item>
       <el-form-item label="发货时间">
          <el-date-picker
            v-model="transinfo.fromTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="00:00:00"
            placeholder="请选择"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="收货时间">
          <el-date-picker
            v-model="transinfo.toTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="00:00:00"
            placeholder="请选择"
            size="mini"
          />
        </el-form-item>
     
      <el-form-item label="货物状态">
        <el-col :span="3">
          <el-select
            v-model="transinfo.status"
            clearable
            placeholder="请选择"
            :disabled="statusFrom"
          >
            <el-option :value="0" label="退货" />
            <el-option :value="1" label="运输中" />
            <el-option :value="2" label="到货配送中" />
            <el-option :value="3" label="已确认收货" />
          </el-select>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdatetransinfo"
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
      transinfo: {
        id: "",
        fromProvince:"",
        toProvince:"",
        fromSpot: "",
        toSpot: "",
        fromTime: "",
        toTime: "",
        driverID: "",
        status: "",
      },
      saveBtnDisabled: false, 
      elForm: false,
      idFrom: false,
      fromProFrom:false,
      toProFrom:false,
      fromSpotFrom: false,
      toSpotFrom: false,
      statusFrom: false,
      driverIDFrom: false,
      fromTimeFrom: false,
      toTimeFrom: false,
      id:this.$route.query.id,
    };
  },
  created() {
    console.log(this.$route.query.id,'this.$route.query.id');
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
        this.gettransinfo(id);
        this.elForm = false;
        this.idFrom = true;
        }else {
        this.transinfo = {};
        this.elForm = false;
        this.idFrom = false;
      }
    },
    saveOrUpdatetransinfo() {
      this.saveBtnDisabled = true;
      if (!this.id) {
        this.savetransinfo(); // 添加
      } else {
        this.updatetransinfo(); // 修改
      }
    },
    savetransinfo() {
      this.$http({
        method: "post",
        url: "transinfo/add",
        data: this.transinfo,
      })
        .then((response) => {
          this.$message({
            type: "success",
            message: "添加成功!",
          });
          this.$router.push({ path: "/transinfo/list" });
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: "添加失败!",
          });
        });
    },
    gettransinfo(id) {
      this.$http({
        method: "get",
        url: `transinfo/getById/${id}`,
      }).then((response) => {
        this.transinfo = response.data.data.transinfo;
      });
    },
    updatetransinfo() {
      this.$http({
        method: "post",
        url: "transinfo/update",
        data: this.transinfo,
      })
        .then((response) => {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          this.$router.push({ path: "/transinfo/list" });
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