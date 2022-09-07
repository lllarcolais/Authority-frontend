import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from "../pages/login"
import Home from "../pages/home"
import Layout from "../pages/layout"

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

export const DynamicRoutes = [
  {
    path:"",
    component:Layout,
    name:"container",
    redirect:"home",
    meta:{
      requiresAuth:true,
      name:"首页"
    },
    children:[
      {
        path:"home",
        component:Home,
        name:"home",
        meta:{
          //匹配规则
          name:"首页",
          icon:"icon-name"
        }
      }
    ]
  }
]


const router = new VueRouter({
  mode:"history",
  routes
})

export default router
