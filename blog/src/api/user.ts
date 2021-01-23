import request from '@/utils/request'

export function getUserInfoById(id:string) {
    return request({
        url:'/blog-api/user/'+id,
        method:'get'
    })
}
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

/**
 * 保存头像
 * @param data
 */
export function saveAvatar(data:object,token:string) {
    return request({
        url:'/blog-api/user/saveAvatar',
        method:'put',
        headers:{
            "token":token
        },
        data:data
    })
}
/**
 * 保存封面
 * @param data
 */
export function saveCover(data:object,token:string) {
    return request({
        url:'/blog-api/user/saveCover',
        method:'put',
        headers:{
            "token":token
        },
        data:data
    })
}
/**
 * 保存用户名
 * @param data
 */
export function saveUname(data:object,token:string) {
    return request({
        url:'/blog-api/user/saveUname',
        method:'put',
        headers:{
            "token":token
        },
        data:data
    })
}
/**
 * 保存性别
 * @param data
 */
export function saveSex(data:object,token:string) {
    return request({
        url:'/blog-api/user/saveSex',
        method:'put',
        headers:{
            "token":token
        },
        data:data
    })
}
/**
 * 保存签名
 * @param data
 */
export function saveSign(data:object,token:string) {
    return request({
        url:'/blog-api/user/saveSign',
        method:'put',
        headers:{
            "token":token
        },
        data:data
    })
}
/**
 * 保存邮箱
 * @param data
 */
export function saveEmail(data:object,token:string) {
    return request({
        url:'/blog-api/user/saveEmail',
        method:'put',
        headers:{
            "token":token
        },
        data:data
    })
}
/**
 * 修改密码
 * @param data
 */
export function savePassword(data:object,token:string) {
    return request({
        url:'/blog-api/user/savePassword',
        method:'put',
        headers:{
            "token":token
        },
        data:data
    })
}

