import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "jquery/dist/jquery";
import "events/events";

import Vue from "vue";
import App from "./App";
import router from "./router";
import VueSession from "vue-session";
import VueResource from "vue-resource";

window.$ = window.jQuery = require("jquery");

Vue.use(VueSession);
Vue.use(VueResource);
Vue.config.productionTip = false;

Vue.mixin({
  data() {
    return {
      host: "http://192.168.17.20/",
      server: "http://192.168.17.20:1515/",
      database: "http://192.168.17.20:3000/"
    };
  }
});
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
