import request from "@/utils/request";

export const getAritcle=(params)=>{
    return request({
        url:'/mp/v1_0/articles',
        method:'get',
        //body参数，使用data设置，
        // query参数，使用params设置,
        // headers参数，使用headers设置
        params
    })
}

export const getArticleChannels=()=>{
    return request({
        url:'/mp/v1_0/channels',
        method:'get'
    })
}

export const deleteArticle=(articleId)=>{
    return request({
        //接口文档中写的路径参数需要在url中传递
        url:`/mp/v1_0/articles/${articleId}`,
        method:'DELETE'
    })
}

export const addArticle=(data,draft=false)=>{
    return request({
        //接口文档中写的路径参数需要在url中传递
        url:'/mp/v1_0/articles',
        method:'post',
        params:{
            draft
        },
        data:data
    })
}

export const updateArticle=(target,data,draft=false)=>{
    return request({
        //接口文档中写的路径参数需要在url中传递
        url:`/mp/v1_0/articles/${target}`,
        method:'PUT',
        params:{
            draft
        },
        data:data
    })
}

export const getArticle=(target)=>{
    return request({
        //接口文档中写的路径参数需要在url中传递
        url:`/mp/v1_0/articles/${target}`,
        method:'get',
    })
}