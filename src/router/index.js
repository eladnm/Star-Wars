import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Chart from "../views/Chart.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/chart",
    name: "Chart",
    component: Chart,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
  linkActiveClass: "active",
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }

    return { x: 0, y: 0 };
  },
});
export default router;
