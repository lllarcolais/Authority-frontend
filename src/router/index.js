import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from "../pages/login"
import Home from "../pages/home"
import Layout from "../pages/layout"
import NotFound from "../pages/NotFound"

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/404',
    name: 'NotFound',
    meta: {
      title: 'Page not found'
    },
    component: NotFound
  }
  // {
  //   path: '*',
  //   redirect: '/404'
  // }
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
