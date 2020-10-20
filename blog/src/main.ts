import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vuetify from 'vuetify'
// @ts-ignore
import vuetify from './plugins/vuetify.js'

Vue.use(Vuetify)
Vue.config.productionTip = false;
Vue.use(ElementUI);
new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount("#app");
