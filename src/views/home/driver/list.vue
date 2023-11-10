<template>
  <div class="myTable">
    <!-- 条件查询表单 -->
    <div id="queryForm">
      <el-form :inline="true" :model="driver">
        <el-form-item label="司机id">
          <el-col :span="15">
            <el-input
              size="mini"
              id="driverID"
              v-model="driver.driverID"
              placeholder="司机id"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="querySearch(driver.driverID)"
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
    <el-table :data="driverList" border height="580" style="width: 100%">
      <el-table-column label="编号" width="70" align="center">
        <template scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column
        label="司机ID"
        prop="driverID"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column label="司机姓名" prop="dname" width="180" align="center">
      </el-table-column>
      <el-table-column
        label="车牌号"
        prop="license"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column label="是否忙碌" prop="busy" width="200" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.busy === 1">工作中</span>
          <span v-if="scope.row.busy === 0">空闲</span>
        </template>
      </el-table-column>

      <el-table-column
        label="司机电话"
        prop="tel"
        width="170"
        align="center"
      ></el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="goSavePage(scope.row.driverID)"
            >编辑</el-button
          >
          &nbsp;&nbsp;&nbsp;
          <el-button
            size="mini"
            icon="el-icon-delete"
            type="danger"
            @click="driverDelete(scope.row.driverID)"
            >删除</el-button
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
export default {
  data() {
    return {
      driver: {
        driverID: "",
      },
      driverList: [],
      current: 1,
      limit: 10,
      total: 0,
    };
  },
  created() {
    this.findPages(this.current, this.limit);
  },
  methods: {
    goSavePage(driverID) {
      this.$router.push({
        path: "/driver/save",
        query: {
          driverID,
        },
      });
    },
    resetForm() {
      this.driver = {};
      this.findPages(1, 10);
    },
    querySearch(id) {
      this.$http({
        method: "get",
        url: `driver/select/${id}`,
      }).then((res) => {
        this.total = 1;
        this.limit = 1;
        this.current = 1;
        this.driverList = [];
        this.driverList.push(res.data.data.driver);
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
    driverDelete(driverID) {
      this.$confirm("此操作将删除司机记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http({
          method: "delete",
          url: `driver/delete/${driverID}`,
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
    findPages(current, limit) {
      this.$http({
        method: "post",
        url: `driver/page/${current}/${limit}`,
        data: this.driver,
      }).then((res) => {
        this.total = res.data.data.total;
        this.driverList = res.data.data.rows;
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
#introduction {
  width: 1500px;
  font-size: 16px;
  color: #000;
  line-height: 30px;
  font-weight: bold;
}
</style>
