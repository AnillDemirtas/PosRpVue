import Vue from "vue";
import VueRouter from "vue-router";
import AnaSayfa from "../views/AnaSayfa.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Root",
    redirect: "/AnaSayfa",
  },
  {
    path: "/AnaSayfa",
    name: "AnaSayfa",
    component: AnaSayfa,
  },
  {
    path: "/StokSatisList",
    name: "StokSatisList",
    component: () => import("../views/StokSatisList.vue"),
  },
  {
    path: "/SubeList",
    name: "SubeList",
    component: () => import("../views/Subeler.vue"),
  },
  // {
  //   path: "/KimliklerList",
  //   name: "KimliklerList",
  //   component: () => import("../views/Kimlikler/List.vue"),
  // },
  {
    path: "/OturumAc",
    name: "OturumAc",
    component: () => import("../views/Login.vue"),
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // const jeton = localStorage.getItem("jeton") ? true : false;
  // const sube_id = localStorage.getItem("sube_id") ? true : false;
  // const donem_id = localStorage.getItem("donem_id") ? true : false;
  // if (to.name !== "OturumAc" && !jeton) {
  //   next({ name: "OturumAc" });
  // } else if (
  //   to.name !== "SubeDonem" &&
  //   to.name !== "OturumAc" &&
  //   (!sube_id || !donem_id)
  // ) {
  //   next({ name: "SubeDonem" });
  // } else {
  //   return next();
  // }
  return next();
});

export default router;
