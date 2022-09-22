import router,{DynamicRoutes} from "@/router";
import dynamicRouter from '../../router/dynamic-router';
import {recursionRouter,setDefaultRoute} from "@/utils/recursion-router";
import {fetchPermission} from "@/api";
import {store} from "core-js/internals/reflect-metadata";

export default {
    namespaced:true,
    state:{
        currentMenu: '',
        permissionList: null,
        // get permissionList(){
        //     return JSON.parse(localStorage.getItem("permissionList"));
        // },
        // set permissionList(value){
        //     localStorage.setItem("permissionList", JSON.stringify(value));
        // },
        sidebarMenu: []
        // get sidebarMenu(){
        //     return localStorage.getItem("sidebarMenu");
        // },
        // set sidebarMenu(value){
        //     localStorage.setItem("sidebarMenu", value);
        // },
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
            if (permissionList.data.code === "1") {
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
                // commit("SET_PERMISSION",[...initialRoutes,...DynamicRoutes])
                commit("SET_PERMISSION",DynamicRoutes)
                console.log("原DynamicRoutes:",DynamicRoutes)
                console.log("store后:",store.permissionList)
            } else {
                console.log("0")
                return "0"
            }
        }
    }
}
