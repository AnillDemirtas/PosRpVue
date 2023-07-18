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
  {
    path: "/Ayarlar",
    name: "Ayarlar",
    component: () => import("../components/fields/Ayarlar.vue"),
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
  const login = localStorage.getItem("login") ? true : false;
  const ip = localStorage.getItem("login") ? true : false;
  if (to.name !== "OturumAc" && !login && to.name !== "Ayarlar") {
    if (ip === false) {
      next({ name: "Ayarlar" });
    } else {
      next({ name: "OturumAc" });
    }
  }

  return next();
});

export default router;
