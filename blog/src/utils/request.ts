import Axios from "axios";
import store from "@/store";
const service = Axios.create({
    timeout: 5000
})

service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code != 0 && res.code != 200) {
            store.dispatch('snackbar/openSnackbar',{
                msg: res.msg||'服务器繁忙',
            });
            return Promise.reject(new Error(res.msg || 'Error'))
        }
        return res
    },
    error => {
        store.dispatch('snackbar/openSnackbar',{
            msg: '服务器繁忙',
        });
        return Promise.reject(error)
    }
)
export default service
