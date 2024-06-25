import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VuetifyDialog from "vuetify-dialog";
import "vuetify-dialog/dist/vuetify-dialog.css";
import VueTheMask from "vue-the-mask";
import VueApexCharts from "vue-apexcharts";
import { VueMasonryPlugin } from "vue-masonry";
import DatetimePicker from "vuetify-datetime-picker";

Vue.config.productionTip = false;
Vue.use(VuetifyDialog, {
  context: {
    vuetify,
  },
});

Vue.use(VueTheMask);
Vue.use(require("vue-moment"));
Vue.use(VueApexCharts);
Vue.use(DatetimePicker);

Vue.component("apexchart", VueApexCharts);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

Vue.use(VueMasonryPlugin);
