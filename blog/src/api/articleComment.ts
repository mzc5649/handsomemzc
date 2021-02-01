import request from '@/utils/request'
import qs from "qs";
export function getArticleComment(params: any) {

    return request({
        url: '/blog-api/article_comment',
        method: 'get',
        params
    })
}

export function saveArticleComment(params: any, token: string) {
    return request({
        url: '/blog-api/article_comment',
        method: 'post',
        headers: {
            'token': token
        },
        data: params
    })
}
