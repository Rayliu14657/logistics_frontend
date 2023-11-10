<template>
  <div class="myTable">
    <!-- 条件查询表单 -->
    <div id="queryForm">
      <el-form :inline="true" :model="admin">
        <el-form-item label="管理员ID">
          <el-col :span="15">
            <el-input
              v-model="admin.adminID"
              :disabled="false"
              placeholder="管理员ID"
            />
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="querySearch(admin.adminID)"
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
          <el-button
            type="primary"
            @click="goSavePage()"
            size="mini"
            v-if="admin.adminLevel == 1"
            ><i class="el-icon-plus el-icon--right">&nbsp;增加</i></el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- 数据表格 -->
    <el-table :data="adminList" border height="580" style="width: 100%">
      <el-table-column
        label="管理员ID"
        width="450"
        prop="adminID"
        align="center"
      >
      </el-table-column>
      <el-table-column label="等级" width="450" align="center">
        <template slot-scope="scope">
          {{ scope.row.level == 1 ? "一级管理员" : "二级管理员" }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="admin.adminLevel == 1"
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="goSavePage(scope.row.adminID)"
            >编辑</el-button
          >
          <el-button
            v-if="admin.adminLevel == 1"
            size="mini"
            icon="el-icon-delete"
            type="danger"
            @click="adminDelete(scope.row.adminID)"
            >删除</el-button
          >
          <span v-if="admin.adminLevel == 2">2级管理员无法操作！</span>
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
      admin: {
        adminID: "",
        adminLevel: "",
      }, // 查询条件
      adminList: [],
      current: 1,
      limit: 10,
      total: 0,
    };
  },
  created() {
    this.admin.adminID = localStorage.getItem("adminID");
    this.admin.adminLevel = localStorage.getItem("level");
    this.findPages(this.current, this.limit);
  },
  methods: {
    // 跳转到增加页面
    goSavePage(adminID) {
      this.$router.push({
        path: "/admin/save",
        query: {
          adminID,
        },
      });
    },
    // 清空表单
    resetForm() {
      this.findPages(1, 10);
    },
    // 条件查询
    querySearch(id) {
      this.$http({
        method: "get",
        url: `admin/getById/${id}`,
      }).then((res) => {
        this.total = 1;
        this.limit = 1;
        this.current = 1;
        this.adminList = [];
        this.adminList.push(res.data.data.admin);
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
    // 删除
    adminDelete(id) {
      this.$confirm("此操作将永久删除管理员记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http({
          method: "delete",
          url: `admin/${id}`,
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
        url: `admin/page/${current}/${limit}`,
        data: this.admin,
      }).then((res) => {
        this.total = res.data.data.total;
        this.adminList = res.data.data.rows;
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
