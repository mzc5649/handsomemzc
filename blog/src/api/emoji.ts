import request from '@/utils/request'

/*获取表情*/
export function getEmojiList(params: any) {
    return request({
        url: '/blog-api/emoji',
        method: 'get',
        params
    })
}
