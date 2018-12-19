/* Importação das folhas estilos ( RETIRAR O POST.CSS EM webpack,dev.conf.js*/
import "bootstrap/dist/css/bootstrap.min.css";
// import "materialize-css/dist/css/materialize.css";
/* Importação e uso do jquery */
import "jquery/dist/jquery";
window.$ = window.jQuery = require("jquery");
/* Bootstrap + Materialize */
// import "materialize-css/dist/js/materialize";
import "bootstrap/dist/js/bootstrap";
import "events/events";
/* Dependencias do Vue Js */
import Vue from "vue";
import App from "./App";
import router from "./router";
import VueSession from "vue-session";
import VueResource from "vue-resource";
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
