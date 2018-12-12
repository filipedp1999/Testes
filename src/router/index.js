import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import Level from "@/components/Level";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Level",
      component: Level
    }
  ]
});
