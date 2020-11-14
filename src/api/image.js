//素材请求相关接口封装

import request from "@/utils/request";

export const uploadImage=(data)=>{
    return request({
        url:'/mp/v1_0/user/images',
        method:'post',
        //一般文件上传都要把请求头中的content-type设置为multipart/form-data
        //但axios不需要特意去设置，只要给data一个formData对象即可
        data
    })

}