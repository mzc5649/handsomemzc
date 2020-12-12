import request from '@/utils/request'

//获取该分类下的所有文章信息
export function getArticleDataBySort(id: number, params: object) {

    return request({
        url: '/blog-api/article/s/' + id,
        method: 'get',
        params
    })
}

//获取所有分类标签
export function getArticleSortTag() {
    return request({
        url: '/blog-api/article_sort',
        method: 'get'
    })
}
