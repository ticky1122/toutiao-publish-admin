// 基于axios封装的请求
import axios from 'axios'
import bigInt from 'json-bigint'


const request = axios.create({
    baseURL:'http://ttapi.research.itcast.cn',//请求的基础路径
    transformResponse:[function (data){
        try{
            return bigInt.parse(data)
        }catch{
            return data
        }
    }]
    
})
//拦截器：在发送请求前，都加上authoriztions
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么，所有请求都会经过这里
    //config是当前请求相关的配置信息对象，是可以修改的
    //return config才会真正的把请求发出去
    const user=JSON.parse(window.localStorage.getItem('user'))
    if(user){
        config.headers.Authorization=`Bearer ${user.token}`
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

export default request

//谁要使用，谁就加载
// import request from 'request.js'
// request.get({
//
// })
//
// request({
//
// })