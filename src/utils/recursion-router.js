/**
 * 方法一：比对路由权限
 * 方法二：指定返回的默认路由
 */

export function recursionRouter(userRouter = [], allRouter = []) {
    var realRoutes = [];
    allRouter.forEach((v,i) => {
        userRouter.forEach((item,index) =>{
            if (item.name === v.meta.name) {
                if (item.children && item.children.length > 0){
                    v.children = recursionRouter(item.children,v.children);
                }
                realRoutes.push(v)
            }
        })
    })
    return realRoutes;
}


export function setDefaultRoute(routes){
    routes.forEach((v,i) =>{
        if (v.children && v.children.length > 0){
            v.redirect = { name : v.children[0].name}
            setDefaultRoute(v.children);
        }
    })
}
