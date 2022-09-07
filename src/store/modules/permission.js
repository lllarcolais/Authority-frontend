import router,{DynamicRoutes} from "@/router";
import dynamicRouter from '../../router/dynamic-router';
import {recursionRouter,setDefaultRoute} from "@/utils/recursion-router";
import {fetchPermission} from "@/api";

export default {
    namespaced:true,
    state:{
        permissionList: null,
        sidebarMenu: [],
        currentMenu: ''
    },
    getters:{},
    mutations:{
        SET_PERMISSION(state,routes){
            state.permissionList = routes;
        },
        CLEAR_PERMISSION(state){
            state.permissionList = null;
        },
        SET_MENU(state,menu){
            state.sidebarMenu = menu;
        },
        CLEAR_MENU(state){
            state.sidebarMenu = [];
        }
    },
    //异步访问
    actions:{
        async FETCH_PERMISSION({ commit, state}){
            let permissionList = await fetchPermission();
            console.log(permissionList.data.data)
            //筛选
            let routes = recursionRouter(permissionList.data.data,dynamicRouter);
            let MainContainer = DynamicRoutes.find(v => v.path === "");
            //这个children是另外的，还是是在原本的地方加入新的routes
            let children = MainContainer.children;
            children.push(...routes);

            //生成菜单
            commit("SET_MENU",children);

            //设置默认路由
            setDefaultRoute([MainContainer]);
            //初始化路由
            let initialRoutes = router.options.routes
            router.addRoutes(DynamicRoutes);
            commit("SET_PERMISSION",[...initialRoutes,...DynamicRoutes])
        }
    }
}
