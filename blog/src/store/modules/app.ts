
const state = {
    device: 'desktop',
    sideNav: false
}

const mutations = {
    TOGGLE_DEVICE: (state:any, device:string) => {
        state.device = device
    },
    TOGGLE_SIDENAV: (state:any, data:boolean) => {
        state.sideNav = data
    }
}


const actions = {
    toggleDevice(context:any, device:string){
        context.commit('TOGGLE_DEVICE', device)
    },
    toggleSideNav(context:any, data:boolean){
        context.commit('TOGGLE_SIDENAV', data)
    }
}



export default {
    namespaced: true,
    state,
    mutations,
    actions
}
