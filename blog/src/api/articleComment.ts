import request from '@/utils/request'
import qs from "qs";
/*获取文章的评论*/
export function getArticleComment(params: any) {
    return request({
        url: '/blog-api/article_comment',
        method: 'get',
        params
    })
}
/*获取评论的回复*/
export function getArticleCommentReplies(params: any) {
    return request({
        url: '/blog-api/article_comment/replies',
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
