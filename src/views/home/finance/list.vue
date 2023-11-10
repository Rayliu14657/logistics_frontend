<template>
  <div class="myTable">
    <!-- 条件查询表单 -->
    <div id="queryForm">
      <el-form :inline="true" :model="finance">
      <el-form-item label="货票号">
          <el-col :span="15">
            <el-input
              size="mini"
              id="ticket_id"
              v-model="finance.id"
              placeholder="ID"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="querySearch(finance.id)"
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
          <el-button
            size="mini"
            icon="el-icon-right"
            type="info"
            @click="goList2"
            >未估价</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- 数据表格 -->
    <el-table :data="financeList" border height="580" style="width: 100%">
      <el-table-column label="编号" width="120" align="center">
        <template scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column label="货票号"               
        prop="id"
        width="200"
        align="center">
      </el-table-column>
      <el-table-column label="运单总价"               
        prop="sum"
        width="200"
        align="center">
      </el-table-column>
      <el-table-column label="赔付金额"               
        prop="compensate"
        width="200"
        align="center">
      </el-table-column>
      
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          
          &nbsp;&nbsp;&nbsp;
          <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="goSavePage(scope.row.id)"
              >编辑</el-button
            >
          &nbsp;&nbsp;&nbsp;
          <el-button
            size="mini"
            icon="el-icon-delete"
            type="danger"
            @click="financeDelete(scope.row.id)"
            >删除</el-button
          >
          <el-button
              type="info"
              icon="el-icon-edit"
              size="mini"
              @click="compensate(scope.row.id)"
              >计算赔付金额</el-button
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
      finance: {
        id: "",
      },
      financeList: [],
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
        path:'/finance/save',
        query:{
          id
        }
      })
    },
    resetForm() {
      this.employee = {};
      this.findPages(1, 10);
    },
     querySearch(id) {
      this.$http({
          method: "get",
          url: `finance/select/${id}`,
        }).then((res) => {
        this.total = 1;
        this.limit = 1;
        this.current = 1;
        this.financeList=[];
        this.financeList.push(res.data.data.finance)
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
    financeDelete(id) {
      this.$confirm("此操作将永久删除用户记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http({
          method: "delete",
          url: `finance/delete/${id}`,
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
        url: `finance/page/${current}/${limit}`,
        data: this.finance,
      }).then((res) => {
        this.total = res.data.data.total;
        this.financeList = res.data.data.rows;
        this.limit = res.data.data.limit;
        this.current = res.data.data.current;
      });
    },
    goList2(){
      this.$router.push({
        path:'/finance/list2',
      })
    },
    compensate(id){
      this.$http({
        method: "post",
        url: `finance/compensate/${id}`,
        data: this.finance,
      }).then((res) => {
        if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "赔偿计算成功!",
            });
          }
        this.findPages(this.current, this.limit);
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