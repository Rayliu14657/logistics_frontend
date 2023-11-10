<template>
  <div class="myTable">
    <!-- 条件查询表单 -->
    <div id="queryForm" >
      <el-form :inline="true" :model="transinfo">
        <el-form-item label="货票号">
          <el-col :span="15">
            <el-input
              size="mini"
              id="id"
              v-model="transinfo.id"
              placeholder="货票号"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="querySearch(transinfo.id)"
            size="mini"
            >查询</el-button
          >
          <el-button
           type="info"
            icon="el-icon-refresh-right"
            @click="resetForm"
            size="mini"
            >刷新</el-button
          >
          <el-button type="primary" @click="goSavePage()" size="mini"
            ><i class="el-icon-plus el-icon--right">&nbsp;增加</i></el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- 数据表格 -->
    <el-table :data="transinfoList" border height="580" style="width: 100%">
      <el-table-column label="编号" width="50" align="center">
        <template scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column
        label="货票号"
        prop="id"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column label="货物状态" prop="status" width="90" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 0">退货</span>
          <span v-if="scope.row.status === 1">运输中</span>
          <span v-if="scope.row.status === 2">到货配送中</span>
          <span v-if="scope.row.status === 3">已确认收货</span>
        </template>
      </el-table-column>
      <el-table-column
        label="司机id"
        prop="driverID"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column
        label="发货地"
        prop="fromSpot"
        width="160"
        align="center"
      ></el-table-column>
      <el-table-column
        label="目的地"
        prop="toSpot"
        width="160"
        align="center"
      ></el-table-column>
      <el-table-column label="出发时间" width="170" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.fromTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="到达时间" width="170" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.toTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
        
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="goSavePage(scope.row.id)"
              >编辑</el-button
            >
          <el-button
            size="mini"
            icon="el-icon-delete"
            type="danger"
            @click="delete(scope.row.id)"
            >删除</el-button
          >
          <el-button
              type="success"
              icon="el-icon-check"
              size="mini"
              @click="sure1(scope.row.id)"
              >确认到货</el-button
            >
            <el-button
              type="success"
              icon="el-icon-check"
              size="mini"
              @click="sure2(scope.row.id)"
              >确认收货</el-button
            >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import router from '../../../router';

export default {
  data() {
    return {
      transinfo: {
        id: "",
      }, 
      transinfoList: [],
      current: 1,
      limit: 10,
      total: 0,
    };
  },
  created() {
    this.findPages(this.current, this.limit);
  },
  methods: {
  
    goSavePage(id) {
      this.$router.push({
        path:'/transinfo/save',
        query:{
          id
        }
      })
    },
    sure1(id){
      this.$http({
        method:"post",
        url:`transinfo/confirmArr/${id}`
      }).then((res)=>{
        if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "已确认到货!",
            });
      }
      this.findPages(this.current, this.limit);
    })},
    sure2(id){
      this.$http({
        method:"post",
        url:`transinfo/confirmRec/${id}`
      }).then((res)=>{
        if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "已确认收货!",
            });
      }
      this.findPages(this.current, this.limit);
    })},
    resetForm() {
      this.transinfo = {};
      this.findPages(1, 10);
    },
    querySearch(id) {
      this.$http({
          method: "get",
          url: `transinfo/getById/${id}`,
        }).then((res) => {
        this.total = 1;
        this.limit = 1;
        this.current = 1;
        this.transinfoList=[];
        this.transinfoList.push(res.data.data.transinfo)
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "查询成功!",
            });
          }
        });
    },
    handleSizeChange(val) {
      console.log("val: ", val);
      this.limit = val;
      this.findPages(this.current, this.limit);
    },
    handleCurrentChange(val) {
      this.current = val;
      this.findPages(this.current, this.limit);
    },
    delete(id) {
      this.$confirm("此操作将删除本条记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http({
          method: "delete",
          url: `transinfo/${id}`,
        }).then((res) => {
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          }
          this.findPages(this.current, this.limit);
        });
      });
    },
    // 分页查询
    findPages(current, limit) {
      console.log("this.transinfo: ", this.transinfo);
      this.transinfo.id = localStorage.getItem("id");
      this.$http({
        method: "get",
        url: `transinfo/page/${current}/${limit}`,
        data: this.transinfo,
      }).then((res) => {
        this.total = res.data.data.total;
        this.transinfoList = res.data.data.rows;
        this.limit = res.data.data.limit;
        this.current = res.data.data.current;
      });
    },
  },
};
</script>
<style>
.myTable {
  width: 98%;
  height: 850px;
  margin: 10px auto;
  text-align: center;
  overflow: hidden scroll;
}
.block {
  margin-top: 15px;
}
#queryForm {
  width: 100%;
  height: 50px;
  text-align: left;
  padding: 10px 0 0 15px;
  margin-bottom: 10px;
  border-radius: 5px;
}
#queryForm .el-input {
  width: 100px;
}
#introduction{
  width: 1500px;
  font-size: 16px;
  color: #000;
  line-height: 30px;
  font-weight: bold;
}
</style>