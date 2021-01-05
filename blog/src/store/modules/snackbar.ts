const snackbar = {
    namespaced: true,
    state: {
        msg: '',
        color: 'danger',
        visible: false,
        timeout: 3000,
        progress: 0
    },
    // 逻辑处理,同步函数
    mutations: {
        OPEN_SNACKBAR(state: any, options: any) {
            state.msg = options.msg
            // state.color = options.color
            state.visible = true
        },
        CLOSE_SNACKBAR(state: any) {
            state.visible = false

        },
        setTimeout(state: any, timeout: any) {
            state.timeout = timeout
        },
    },
    // 逻辑处理,异步函数
    actions: {
        openSnackbar(context: any, options: any) {
            let timeout = context.state.timeout
            context.state.progress = timeout;
            context.commit('OPEN_SNACKBAR', {
                msg: options.msg,
                // color: options.color
            })
            var interval = setInterval(function () {
                context.state.progress -= 1000;
            }, 1000)
            setTimeout(() => {
                clearInterval(interval)
                context.commit('CLOSE_SNACKBAR')
            }, timeout)
        }
    }
}
export default snackbar;
