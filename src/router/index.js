import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import Level from "@/components/Level";
import Canvas from "@/components/Canvas";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Canvas",
      component: Canvas
    }
  ]
});
