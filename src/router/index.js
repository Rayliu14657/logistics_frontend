import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/home/layout/layout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    meta: { title: "登录" },
    component: () => import("../views/login.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: Layout,
    children: [
      {
        path: "/index",
        name: "Index",
        meta: { title: "首页" },
        component: () => import("../views/home/index/index.vue"),
      },
      {
        path: "/admin",
        name: "admin",
        meta: { title: "管理员界面" },
        component: () => import("../views/home/admin/index.vue"),
        children: [
          {
            path: "/admin/list",
            name: "AdminList",
            meta: { title: "管理员列表" },
            component: () => import("../views/home/admin/list.vue"),
          },
          {
            path: "/admin/save",
            name: "AdminSave",
            meta: { title: "管理员添加" },
            component: () => import("../views/home/admin/save.vue"),
          },
          {
            path: "getById/:id",
            name: "AdminEdit",
            component: () => import("@/views/home/admin/save.vue"),
            meta: { title: "管理员" },
            hidden: true, // 隐藏路由
          },
          {
            path: "getByAdminID/:adminID",
            name: "AdminSearch",
            component: () => import("@/views/home/admin/save.vue"),
            meta: { title: "管理员信息详情" },
            hidden: true, // 隐藏路由
          },
        ],
      },
      {
        path: "/carriage",
        name: "carriage",
        meta: { title: "运费管理界面" },
        component: () => import("../views/home/carriage/index.vue"),
        children: [
          {
            path: "/carriage/list",
            name: "carriageList",
            meta: { title: "运费等级列表" },
            component: () => import("../views/home/carriage/list.vue"),
          },
          {
            path: "/carriage/save",
            name: "carriageSave",
            meta: { title: "运费修改" },
            component: () => import("../views/home/carriage/save.vue"),
          },
        ],
      },
      {
        path: "/transinfo",
        name: "transinfo",
        meta: { title: "运单管理" },
        component: () => import("../views/home/transinfo/index.vue"),
        children: [
          {
            path: "/transinfo/list",
            name: "transinfoList",
            meta: { title: "运单列表" },
            component: () => import("../views/home/transinfo/list.vue"),
          },
          {
            path: "/transinfo/save",
            name: "transinfoSave",
            meta: { title: "运单添加" },
            component: () => import("../views/home/transinfo/save.vue"),
          },
          {
            path: "getById/:id",
            name: "transinfoEdit",
            component: () => import("@/views/home/transinfo/save.vue"),
            meta: { title: "修改运单信息" },
            //hidden: true  // 隐藏路由
          },
          {
            path: "getByUsername/:username",
            name: "UserSearch",
            component: () => import("@/views/home/transinfo/save.vue"),
            meta: { title: "运单信息详情" },
            //hidden: true  // 隐藏路由
          },
        ],
      },
      {
        path: "/dept",
        name: "Dept",
        meta: { title: "司机管理" },
        component: () => import("../views/home/driver/index.vue"),
        children: [
          {
            path: "/driver/list",
            name: "DriverList",
            meta: { title: "司机列表" },
            component: () => import("../views/home/driver/list.vue"),
          },
          {
            path: "/driver/save",
            name: "DriverSave",
            meta: { title: "司机添加" },
            component: () => import("../views/home/driver/save.vue"),
          },
          {
            path: "getById/:id",
            name: "driverEdit",
            component: () => import("@/views/home/driver/save.vue"),
            meta: { title: "修改司机信息" },
            hidden: true, // 隐藏路由
          },
          {
            path: "getByUsername/:username",
            name: "DeptSearch",
            component: () => import("@/views/home/driver/save.vue"),
            meta: { title: "司机信息详情" },
            hidden: true, // 隐藏路由
          },
        ],
      },
      {
        path: "/ticket",
        name: "Ticket",
        meta: { title: "货票管理" },
        component: () => import("../views/home/ticket/index.vue"),
        children: [
          {
            path: "/ticket/list",
            name: "TicketList",
            meta: { title: "货票列表" },
            component: () => import("../views/home/ticket/list.vue"),
          },
          {
            path: "/ticket/save",
            name: "TIcketSave",
            meta: { title: "货票添加" },
            component: () => import("../views/home/ticket/save.vue"),
          },
          {
            path: "getById/:id",
            name: "TicketEdit",
            component: () => import("@/views/home/ticket/save.vue"),
            meta: { title: "修改货票信息" },
            hidden: true, // 隐藏路由
          },
          {
            path: "getByUsername/:username",
            name: "TIcketSearch",
            component: () => import("@/views/home/ticket/save.vue"),
            meta: { title: "货票信息详情" },
            hidden: true, // 隐藏路由
          },
        ],
      },
      {
        path: "/finance",
        name: "finance",
        meta: { title: "财务管理" },
        component: () => import("../views/home/finance/index.vue"),
        children: [
          {
            path: "/finance/list",
            name: "financeList",
            meta: { title: "账单列表" },
            component: () => import("../views/home/finance/list.vue"),
          },
          {
            path: "/finance/list2",
            name: "financeList2",
            meta: { title: "未估价账单列表" },
            component: () => import("../views/home/finance/list2.vue"),
          },
          {
            path: "/finance/save",
            name: "financeSave",
            meta: { title: "账单添加" },
            component: () => import("../views/home/finance/save.vue"),
          },
          {
            path: "getById/:id",
            name: "financeEdit",
            component: () => import("@/views/home/finance/save.vue"),
            meta: { title: "修改运单信息" },
          },
        ],
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(function (to, from, next) {
  if (!sessionStorage.getItem("adminID")) {
    if (to.path !== "/login") {
      next("/login");
      alert("请先登录!");
    }
  }
  next();
});

export default router;
