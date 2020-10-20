import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        LoginOrRegisterDialog: false,
        token: ''
    },
    mutations: {
        SET_LOGIN_OR_REGISTER_DIALOG(state) {
            state.LoginOrRegisterDialog = !state.LoginOrRegisterDialog;
        }
    },
    actions: {},
    modules: {}
});
