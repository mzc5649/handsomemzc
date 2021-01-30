import request from '@/utils/request'

export function getArticleComment(id:any,params:any) {
    return request({
        url:'/blog-api/article_comment/'+id,
        method:'get',
        params
    })
}
export function saveArticleComment(params:any,token:string) {
    return request({
        url:'/blog-api/article_comment',
        method:'post',
        headers: {
            'token': token
        },
        data:params
    })
}
