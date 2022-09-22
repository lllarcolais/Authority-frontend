import router from "./index"
import store from "../store/index";

router.beforeEach((to,from,next) =>{

    if (!store.state.UserToken | !store.state.UserId){
        //未登录，页面是否需要登录
        if (to.matched.length > 0 && !to.matched.some(record => record.meta.requiresAuth)){
            next();
        }else {
            next({
                path:"/login"
            })
        }
    }else{
        //用户已经登陆  路由的访问权限
        if (!store.state.permission.permissionList){
            if (to.path === "/login"){
                console.log("1")
                next();
            }else{
                store.dispatch("permission/FETCH_PERMISSION").then((res)=>{
                    if (res === "0") {
                        next({path:"/login"})
                    }else {
                        console.log("2")
                        next({
                            path:to.path
                        })
                    }
                })
            }
        }else{
            //store存在权限
            if (to.path !== "/login"){
                if (to.matched.length === 0) {
                    next({
                        path:"/404"
                    })
                } else {
                    next();
                }
            }else{
                next();
                // next(from.fullPath)
            }
        }
    }
})
