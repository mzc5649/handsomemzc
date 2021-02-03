// darken
import darken from "darken";

const darkmode = new darken({
    container: null,
    toggle: null,
    default: "light",
    remember: 'darken-mode',
    usePrefersColorScheme: true,
    class: "darkmode-active",
    variables: {
        "--primary-color": ["#2c3e50", "#fafafa"],
        "--background-color": ["#f4f5f7", "rgb(13, 17, 23)"],
        "--card-background-color": ["#ffffff", "rgb(13, 17, 23)"],
        "--md-background-color": ["#f6f8fa", "rgb(30, 32, 35)"],
        "--border-color": ["#e1e4e8", "#30363d"],
        "--unactive-color": ['rgba(49,67,84,0.6)', 'rgba(255,255,255,0.6)'],
        "--active-color": ['rgb(49,67,84)', 'rgb(255,255,255)']
    },
});
const state = {
    device: 'desktop',
    sideNav: false,
    dark: localStorage.getItem('darken-mode') || 'light',
    darkmode: darkmode,
    emojiPos: {
        top: '0',
        left: '0'
    },
    emojiBoxShow: false,
    commentContent:''
}

const mutations = {
    TOGGLE_DEVICE: (state: any, device: string) => {
        state.device = device
    },
    TOGGLE_SIDENAV: (state: any, data: boolean) => {
        state.sideNav = data
    },
    TOGGLE_DARK: (state: any, data: boolean) => {
        state.dark = data
    },
    TOGGLE_EMOJIPOS: (state: any, data: object) => {
        state.emojiPos = data

    },
    TOGGLE_EMOJIBOXSHOW: (state: any, data: boolean) => {
        state.emojiBoxShow = data

    },
}


const actions = {
    toggleDevice(context: any, device: string) {
        context.commit('TOGGLE_DEVICE', device)
    },
    toggleSideNav(context: any, data: boolean) {
        context.commit('TOGGLE_SIDENAV', data)
        if (data) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }

    },
    toggleDark(context: any, data: boolean) {
        context.commit('TOGGLE_DARK', data)
        darkmode.toggle()
        if (data) {
            //md 黑暗模式切换
            var ele = document.createElement("link");
            ele.rel = "stylesheet";
            ele.classList.add('hl-theme');
            ele.href = "https://cdn.jsdelivr.net/gh/mzc5649/CDN/css/atom-one-dark.min.css";
            var headEl = document.getElementsByTagName("head")[0];
            var linkEl = headEl.getElementsByClassName('hl-theme')[0];
            if (linkEl != null) {
                headEl.removeChild(linkEl);
            }
            headEl.appendChild(ele);
        } else {
            var ele = document.createElement("link");
            ele.rel = "stylesheet";
            ele.classList.add('hl-theme');
            ele.href = "https://cdn.jsdelivr.net/gh/mzc5649/CDN/css/atom-one-light.min.css";
            var headEl = document.getElementsByTagName("head")[0];
            var linkEl = headEl.getElementsByClassName('hl-theme')[0]
            if (linkEl != null) {
                headEl.removeChild(linkEl);
            }
            headEl.appendChild(ele);
        }
    },
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}
