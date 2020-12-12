import request from '@/utils/request'

export function login(data:object) {
    return request({
        url:'/blog-api/user/login',
        method:'post',
        data
    })
}

export function register(code:string,data:object) {
    return request({
        url:'/blog-api/api/validMailCode/'+code,
        method:'post',
        data
    })
}
export function sendMailCode(data:object) {
    return request({
        url:'/blog-api/api/sendMailCode',
        method:'post',
        data
    })
}
