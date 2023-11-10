<template>
  <div class="myTable">
    <!-- 条件查询表单 -->
    <div status="queryForm">
      <el-form :inline="true" :model="carriage">
        <el-form-item label="运费等级">
          <el-col :span="15">
            <el-input
              size="mini"
              status="carriagestatus"
              v-model="carriage.status"
              placeholder="运费等级"
            ></el-input>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="querySearch(carriage.status)"
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
        </el-form-item>
      </el-form>
    </div>
    <!-- 数据表格 -->
    <el-table :data="carriageList" border height="580" style="wstatusth: 100%">
      <el-table-column label="运费等级" width="450" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <p v-if="scope.row.status === 1">市内</p>
            <p v-if="scope.row.status === 2">省内</p>
            <p v-if="scope.row.status === 3">省外</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.status }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column
        label="运费"
        prop="cost"
        wstatusth="300"
        align="center"
      ></el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="adminLevel == 1"
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="goSavePage(scope.row.status)"
            >编辑</el-button
          >
          <el-button
            v-if="adminLevel == 1"
            size="mini"
            icon="el-icon-delete"
            type="danger"
            @click="carriageDelete(scope.row.status)"
            >删除</el-button
          >
          <span v-if="adminLevel == 2">2级管理员无法操作！</span>
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
      carriage: {
        status: "",
      }, // 查询条件
      adminLevel: localStorage.getItem("level"),
      carriageList: [],
      current: 1,
      limit: 10,
      total: 0,
    };
  },
  created() {
    this.findPages(this.current, this.limit);
  },
  methods: {
    goSavePage(status) {
      this.$router.push({
        path: "/carriage/save",
        query: {
          status,
        },
      });
    },
    log() {
      console.log(this.adminLevel);
    },
    resetForm() {
      this.carriage = {};
      this.findPages(1, 10);
    },
    querySearch(id) {
      console.log(id);
      this.$http({
        method: "get",
        url: `carriage/getByStatus/${id}`,
      }).then((res) => {
        this.total = 1;
        this.limit = 1;
        this.current = 1;
        this.carriageList = [];
        this.carriageList.push(res.data.data.status);
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
    carriageDelete(status) {
      this.$confirm("此操作将永久删除用户记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http({
          method: "delete",
          url: `carriage/${status}`,
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
      this.$http({
        method: "post",
        url: `carriage/page/${current}/${limit}`,
        data: this.carriage,
      }).then((res) => {
        this.total = res.data.data.total;
        this.carriageList = res.data.data.rows;
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
