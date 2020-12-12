import request from '@/utils/request'
//获取留言数据
export function getMessageData(params:any) {
    return request({
        url:'/blog-api/msg',
        method:'get',
        params
    })
}
//获取留言的回复数据
export function getMessageOfReply(id:number,params:any) {
    return request({
        url:'/blog-api/msgr/'+id,
        method:'get',
        params
    })
}
