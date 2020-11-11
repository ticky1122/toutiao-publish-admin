// 基于axios封装的请求
import axios from 'axios'

const request = axios.create({
    baseURL:'http://ttapi.research.itcast.cn'//请求的基础路径
})

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