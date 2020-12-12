const snackbar = {
    namespaced: true,
    state: {
        msg: '',
        color: '',
        visible: false,
        showClose: true,
        timeout: 5000,

    },
    // 逻辑处理,同步函数
    mutations: {
        OPEN_SNACKBAR(state:any , options:any) {
            state.visible = true
            state.msg = options.msg
            state.color = options.color
        },
        CLOSE_SNACKBAR(state:any) {
            state.visible = false

        },
        setShowClose(state:any, isShow:any) {
            state.showClose = isShow
        },
        setTimeout(state:any, timeout:any) {
            state.timeout = timeout
        },
    },
    // 逻辑处理,异步函数
    actions :{
        openSnackbar (context:any,options:any){
            let timeout = context.state.timeout
            context.commit('OPEN_SNACKBAR',{
                msg:options.msg,
                color:options.color
            })
            setTimeout(()=>{
                context.commit('CLOSE_SNACKBAR')
            },timeout)
        }
    }
}
export default snackbar;
