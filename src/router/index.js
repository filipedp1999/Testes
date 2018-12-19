import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";

Vue.use(Router);
/* Rotas do Vue */
export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    }
  ]
});
