import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import snackbar from "@/store/modules/snackbar";
import app from '@/store/modules/app'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        LoginOrRegisterDialog: false,
        token: Vue.$cookies.get('token'),
        user: '',
    },
    mutations: {
        SET_LOGIN_OR_REGISTER_DIALOG(state) {
            state.LoginOrRegisterDialog = !state.LoginOrRegisterDialog;
        },
        SET_TOKEN(state, payload) {
            state.token = payload;
        },
        SET_USER(state, payload) {
            state.user = payload;
        },
    },
    actions: {
        //初始化用户信息
        serverInit({commit, state}) {
            const token = state.token;
            if (token) {
                axios.get("/blog-api/user/info", {
                    headers: {
                        token: token
                    }
                }).then(function (res) {
                    commit("SET_USER", res.data.data.user)
                    //刷新token
                    Vue.$cookies.set("token", res.data.data.token, 3600)
                }).catch(res => {
                    commit("SET_USER", '')
                    Vue.$cookies.remove("token")
                })
            } else {
                commit("SET_USER", '')
            }
        },
        //注销
        serverExit({commit}) {
            commit("SET_USER", '')
            commit("SET_TOKEN", '')
            Vue.$cookies.remove("token");
        }

    },
    modules: {
        snackbar,
        app
    }
});
