<template>
  <div class="app-container" style="padding-top: 20px">
    <el-form label-width="120px" :disabled=false>
      <el-form-item label="货票号">
        <el-col :span="3">
          <el-input v-model="ticket.id" :disabled=false />
        </el-col>
      </el-form-item>

      <el-form-item label="货物名">
        <el-col :span="2">
          <el-input v-model="ticket.cname" :disabled="nameFrom"/>
        </el-col>
      </el-form-item>
      <el-form-item label="应到数量">
        <el-col :span="2">
          <el-input v-model="ticket.dueNum" :disabled="numFrom"/>
        </el-col>  
      </el-form-item>
      <el-form-item label="实到数量">
        <el-col :span="2">
          <el-input v-model="ticket.actNum" :disabled="numFrom"/>
        </el-col>  
      </el-form-item>
      <el-form-item label="货物单价">
        <el-col :span="2">
          <el-input v-model="ticket.cost" :disabled="priceFrom" />
        </el-col>
      </el-form-item>
       <!--el-form-item label="运价">
        <el-col :span="1">
          <el-input v-model="ticket.carriage" :disabled="priceFrom" />
        </el-col>
      </el-form-item-->
      <el-form-item label="付款状态">
        <el-col :span="3">
          <el-select
            v-model="ticket.isPaid"
            placeholder="请选择"
            :disabled="payFrom"
          >
            <el-option :value="1" label="预付运费" />
            <el-option :value="2" label="提付收费" />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdateTicket"
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
      ticket: {
        id: 1001,
        cname: "",
        dueNum: "",
        actNum: "",
        cost:"",
        carriage:"",
        isPaid:""
      },
      elForm:false,
      saveBtnDisabled: false,
      nameFrom: false,
      numFrom: false,
      priceFrom: false,
      payFrom: false,
      id:this.$route.query.id,
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
        this.getCargoInfo(id);
        this.elForm = false;
        this.cargoIDFrom = true;
      } else {
        this.ticket = {};
        this.elForm = false;
        this.usernameFrom = false;
    
      }
      
    },
    saveOrUpdateTicket() {
      this.saveBtnDisabled = true;
      if (!this.id) {
        this.saveTicket(); // 添加
      } else {
        this.updateTicket(); // 修改
      }
    },
    saveTicket() {
      this.$http({
        method: "post",
        url: "cargoinfo/add",
        data: this.ticket,
      })
        .then((response) => {
          this.$message({
            type: "success",
            message: "添加成功!",
          });
          this.$router.push({ path: "/ticket/list" });
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: "添加失败!",
          });
        });
    },
    getCargoInfo(id) {
      this.$http({
        method: "get",
        url: `cargoinfo/getById/${id}`,
      }).then((response) => {
        this.ticket = response.data.data.cargoinfo;
      });
    },
    updateTicket() {
      this.$http({
        method: "post",
        url: "cargoinfo/update",
        data: this.ticket,
      })
        .then((response) => {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          this.$router.push({ path: "/ticket/list" });
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