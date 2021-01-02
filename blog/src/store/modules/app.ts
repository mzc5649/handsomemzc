
const state = {
    device: 'desktop',
    sideNav: false,
    dark: false
}

const mutations = {
    TOGGLE_DEVICE: (state:any, device:string) => {
        state.device = device
    },
    TOGGLE_SIDENAV: (state:any, data:boolean) => {
        state.sideNav = data
    },
    TOGGLE_DARK: (state:any, data:boolean) => {
        state.dark = data
    }
}


const actions = {
    toggleDevice(context:any, device:string){
        context.commit('TOGGLE_DEVICE', device)
    },
    toggleSideNav(context:any, data:boolean){
        context.commit('TOGGLE_SIDENAV', data)
    },
    toggleDark(context:any, data:boolean){
        context.commit('TOGGLE_DARK', data)
        if(data){
            document.documentElement.style.setProperty("--theme-background",'rgb(30, 32, 35)');
            document.documentElement.style.setProperty("--theme-text",'rgb(255, 255, 255)');
        }else{
            document.documentElement.style.setProperty("--theme-background",'rgb(244, 244, 244)');
            document.documentElement.style.setProperty("--theme-text",'#2C3E50');
        }
    }
}



export default {
    namespaced: true,
    state,
    mutations,
    actions
}
