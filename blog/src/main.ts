import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import VueCookies from 'vue-cookies'
import '@/permission'
Vue.use(VueCookies)
// use
Vue.use(mavonEditor)
Vue.config.productionTip = false;
Vue.use(ElementUI);
// @ts-ignore
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
Vue.use(Vuesax, {
    // options here
})
//fontawesome
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all'
//longgu
// @ts-ignore
import VueContentPlaceholders from 'vue-content-placeholders'
Vue.use(VueContentPlaceholders)


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
