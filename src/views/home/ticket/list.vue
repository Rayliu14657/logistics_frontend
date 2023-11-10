<template>
  <div class="myTable">
    <!-- 条件查询表单 -->
    <div id="queryForm">
      <el-form :inline="true" :model="ticket">
      <el-form-item label="货票号">
          <el-col :span="15">
            <el-input
              size="mini"
              id="ticket_id"
              v-model="ticket.id"
              placeholder="货票号"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="querySearch(ticket.id)"
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
    <el-table :data="ticketList" border height="580" style="width: 100%">
      <el-table-column label="编号" width="50" align="center">
        <template scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column 
        label="货票号" 
        prop="id"
        width="75"
        align="center">
      </el-table-column>
      <el-table-column 
        label="货物名" 
        prop="cname"
        width="150"
        align="center">
      </el-table-column>
      <el-table-column 
        label="应到数量" 
        prop="dueNum"
        width="80"
        align="center">
      </el-table-column>
      <el-table-column 
        label="实到数量" 
        prop="actNum"
        width="80"
        align="center">
      </el-table-column>
      <el-table-column 
        label="货物单价" 
        prop="cost"
        width="80"
        align="center">
      </el-table-column>
      <el-table-column 
        label="运价" 
        prop="carriage"
        width="80"
        align="center">
      </el-table-column>
      <el-table-column label="付款状态" prop="isPaid" width="90" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.isPaid === 1">预付运费</span>
          <span v-if="scope.row.isPaid === 2">提付收费</span>
        </template>
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
           
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
            @click="cargoDelete(scope.row.id)"
            >删除</el-button
          >
          <el-button
            size="mini"
            icon="el-icon-close"
            type="danger"
            @click="returned(scope.row.id)"
            >退货</el-button
          >
          <el-button
            size="mini"
            icon="el-icon-s-check"
            type="info"
            @click="caculate(scope.row.id)"
            >计算运费</el-button
          >
        </template>
      </el-table-column>
    </el-table>
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
      ticket: {
        id: "",
      }, 
      ticketList: [],
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
        path:'/ticket/save',
        query:{
          id
        }
      })
    },
    resetForm() {
      this.ticket = {};
      this.findPages(1, 10);
    },
    querySearch(id) {
      this.$http({
          method: "get",
          url: `/cargoinfo/getById/${id}`,
        }).then((res) => {
        this.total = 1;
        this.limit = 1;
        this.current = 1;
        this.ticketList=[];
        this.ticketList.push(res.data.data.cargoinfo)
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
    returned(id){
      this.$http({
        method:"post",
        url:`cargoinfo/returned${id}`,
      }).then((res)=>{
        if(res.data.code==200){
          this.$message({
            type:"success",
            message:"退货成功！",
          })
        }
      })
    },
    caculate(id){
      this.$http({
        method:"post",
        url:`cargoinfo/getcarriage${id}`,
      }).then((res)=>{
        if(res.data.code==200){
          this.$message({
            type:"success",
            message:"计算成功！",
          })
        }
      })
    },
    cargoDelete(id) {
      this.$confirm("此操作将永久删除货票记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http({
          method: "delete",
          url: `cargoinfo/${id}`,
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
        method: "get",
        url: `cargoinfo/page/${current}/${limit}`,
        data: this.ticket,
      }).then((res) => {
        this.total = res.data.data.total;
        this.ticketList = res.data.data.rows;
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