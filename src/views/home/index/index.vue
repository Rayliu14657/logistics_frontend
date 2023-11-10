<template>
  <div id="system">
    <el-button @click="show2 = !show2" style="float: left"
      >物流管理系统功能介绍</el-button
    >
    <div style="margin-top: 20px; height: 100px">
      <transition name="el-zoom-in-center">
        <div v-show="show2" class="transition-box">
          <p>
            <img src="../../img/plane.jpg" style="float: right" />
            物流管理（Logistics
            Management），是指在社会再生产过程中，根据物质资料实体流动的规律，应用管理的基本原理和科学方法，对物
            流活动进行计划、组织、指挥、协调、控制和监督，使各项物流活动实现最佳的协调与配合，以降低物流成本，提高物流效率和经济效益。
          </p>
          <p>
            互联网时代，物流市场的不断扩大，传统的物流管理模式已不能满足愈加繁重的业务负担，相关企业急需做出改变————不论是为了工作效率的提高，
            还是为了经营收入的提升。要想更好的迎接新时代、新浪潮，经营货运是必定离不开物流管理系统的，互联网技术的加持，对物流企业无疑是最好的帮助。
          </p>
          <p>
            物流管理系统是为中小物流企业开发的综合物流管理网站，解决当下物流公司点多面广，管理难度大，沟通不及时，监控不到位，
            服务标准不统一，数据不能共享，无法做到同步协调，更不能实现一票到底的监控等问题。我们组实现的物流管理系统主要功能模块有系统管理员分级管理、运费管理、运单管理、货票管理、财务管理、司机管理。
            各模块功能在下方列出。
          </p>
        </div>
      </transition>
      <el-row :gutter="10">
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
          ><div class="grid-content bg-purple"></div
        ></el-col>
        <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
          ><div class="grid-content bg-purple-light"></div
        ></el-col>
        <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
          ><div class="grid-content bg-purple"></div
        ></el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
          ><div class="grid-content bg-purple-light"></div
        ></el-col>
      </el-row>
      <el-collapse>
        <el-collapse-item title="管理员信息管理  AdminInformation" name="1">
          <p>
            可以查看管理员编号、管理员等级，一级管理员可以增加和修改管理员；
          </p>
          <p>查询依据：管理员编号。</p>
        </el-collapse-item>
        <el-collapse-item
          title="运费等级信息管理  CarriageInformation"
          name="2"
        >
          <p>可以查看运费等级和对应的运费，一级管理员可以修改运费；</p>
          <p>查询依据：运费等级。</p>
        </el-collapse-item>
        <el-collapse-item title="货物信息查询功能  CargoInformation" name="3">
          <p>
            可以查看货物名称、应到数量、实到数量、货物单价、运费、货物是否收讫；
          </p>
          <p>查询依据：货票号。</p>
        </el-collapse-item>
        <el-collapse-item
          title="运单信息查询功能  TransformInformation"
          name="4"
        >
          <p>可以查看收发货地点、收发货时间、运输司机编号、货物运输状态；</p>
          <p>查询依据：货票号。</p>
        </el-collapse-item>
        <el-collapse-item title="司机信息查询功能  DriverInformation" name="5">
          <p>可以查询司机姓名、车牌号、司机电话号码、司机运输状态；</p>
          <p>查询依据：司机编号。</p>
        </el-collapse-item>
        <el-collapse-item title="财务信息查询功能  FinanceInformation" name="6">
          <div>可以查询运单总价，如果损坏可查询赔付金额；</div>
          <div>查询依据：货票号。</div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show2: true,
      message: "不二组物流管理系统功能介绍",
    };
  },
};
</script>
<style>
#system {
  display: block;
  float: left;
  background-image: url(../../img/13.jpg);
}
.transition-box {
  float: left;
  margin: 40px 40px 40px 0;
  width: 100%;
  height: 350px;
  border-radius: 4px;
  background-color: #14314d;
  text-align: left;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  padding-top: 0%;
  text-indent: 2em;
}
</style>
