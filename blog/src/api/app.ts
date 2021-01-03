import request from '@/utils/request'
export function getWebInfo() {
    return request({
        url:'/blog-api/api/info',
        method:'get'
    })
}
