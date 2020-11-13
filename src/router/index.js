import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Layout from '@/views/layout'
import Aritcle from '@/views/article'
import Publish from '@/views/publish'

Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path: '/',
    component: Layout,
    children:[
      {
        path:'',//path为空，默认子路由
        name:'home',
        component: Home
      },
      {
        path:'/article',//path为空，默认子路由
        name:'article',
        component: Aritcle
      },
      {
        path:'/publish',//path为空，默认子路由
        name:'publish',
        component: Publish
      },
    ]
  },

]

const router = new VueRouter({
  routes,
  mode:'history'
})
//路由导航守卫
//所有路由都会经过这里
//to:即将要进入的目标 路由对象
//from：当前导航正要离开的路由
//next:放行方法，一定要调用该方法来 resolve 这个钩子
router.beforeEach((to, from, next) => {
  // ...
  if(to.path!='/login'){
    const user=JSON.parse(window.localStorage.getItem('user'))
    if(!user){
      next({name:'login'})
    }
  }
  next()
})

export default router
