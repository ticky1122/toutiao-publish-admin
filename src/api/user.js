// 用户相关请求
import request from "@/utils/request";
export const login = (data) => {
    return request({
        url:"/mp/v1_0/authorizations",
        method:'post',//post方法用data，get方法用params传递参数
        data:data
    })
}

export const getUserProfile = ()=>{
    return request({
        url:"/mp/v1_0/user/profile",
        method:'get',
    })
}