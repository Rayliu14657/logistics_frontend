<template>
  <div class="breadcrumb">
    <el-breadcrumb separator=">">
      <p class="gps el-icon-location-outline">当前位置</p>
      <el-breadcrumb-item
        id="point"
        :to="v.path"
        v-for="(v,i) in breadcrumbList"
        :key="i"
      >{{v.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "breadcrumb",
  computed: {
    breadcrumbList() {
      return this.$route.matched;
    },
  },
};
</script>
<style scoped>
*{
  margin: 0;
  padding: 0;
}
.gps {
  float: left;
  height: 60px;
  line-height: 60px;
  color: rgb(187, 187, 192);
  font-weight: bold;
}
.breadcrumb {
  float: left;
}
#point {
  display: inline-block;
  line-height: 60px;
  color: rgb(242, 242, 247);
}
</style>