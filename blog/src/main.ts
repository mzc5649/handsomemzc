import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vuetify from 'vuetify'
// @ts-ignore
import vuetify from './plugins/vuetify.js'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import VueCookies from 'vue-cookies'
import '@/permission'
Vue.use(VueCookies)
// use
Vue.use(mavonEditor)
Vue.use(Vuetify)
Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount("#app");
