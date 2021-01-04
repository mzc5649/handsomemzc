import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import snackbar from "@/store/modules/snackbar";
import app from '@/store/modules/app'
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        LoginOrRegisterDialog: true,
        token: localStorage.getItem("token"),
        user: localStorage.getItem("user"),
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
        serverInit({commit}, app) {
            const token = app.$cookies.get("token")
            if (token) {
                axios.get("/blog-api/user/info", {
                    headers: {
                        token: token
                    }
                }).then(function (res) {
                    commit("SET_USER", res.data.data.user)
                    commit("SET_TOKEN", res.data.data.token)
                    app.$cookies.set("token", res.data.data.token, 3600)
                })
            } else {
                commit("SET_USER", '')
                commit("SET_TOKEN", '')
            }
        },
        serverExit({commit}, app) {
            commit("SET_USER", '')
            commit("SET_TOKEN", '')
            app.$cookies.remove("token");
        }

    },
    modules: {
        snackbar,
        app
    }
});
