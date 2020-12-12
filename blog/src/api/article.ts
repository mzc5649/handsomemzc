import request from '@/utils/request'
export function getArticleData(params:any) {
    return request({
        url:'/blog-api/article/all',
        method:'get',
        params
    })
}
export function getArticleDataById(id:number) {
    return request({
        url:'/blog-api/article/'+id,
        method:'get'
    })
}
