import request from '@/utils/request'
export function uploadFile(formData: object,token:string, onUploadProgress: any){
    return request({
        url:'/blog-api/img/upload',
        method:'post',
        headers: {
            'Content-Type': 'multipart/form-data' ,
            'token': token
        },
        onUploadProgress: onUploadProgress,
        timeout: 20000,
        data: formData
    })
}
