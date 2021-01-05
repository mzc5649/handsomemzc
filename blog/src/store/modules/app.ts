const state = {
    device: 'desktop',
    sideNav: false,
    dark: false
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
}


const actions = {
    toggleDevice(context: any, device: string) {
        context.commit('TOGGLE_DEVICE', device)
    },
    toggleSideNav(context: any, data: boolean) {
        context.commit('TOGGLE_SIDENAV', data)
    },
    toggleDark(context: any, data: boolean) {
        context.commit('TOGGLE_DARK', data)
        if (data) {
            document.documentElement.style.setProperty("--theme-background", 'rgb(30, 32, 35)');
            document.documentElement.style.setProperty("--theme-text", 'rgb(255, 255, 255)');
            document.documentElement.style.setProperty("--theme-card-bg", 'rgb(30, 32, 35)');
            document.documentElement.style.setProperty("--theme-md-bg", '#282c34');
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
            document.documentElement.style.setProperty("--theme-background", 'rgb(244, 244, 244)');
            document.documentElement.style.setProperty("--theme-text", '#2C3E50');
            document.documentElement.style.setProperty("--theme-card-bg", 'rgb(255, 255, 255)');
            document.documentElement.style.setProperty("--theme-md-bg", '#f6f8fa');
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
