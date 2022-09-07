import Axios from "@/utils/http";
import store from "../store";

export const fetchPermission = ()=>{
    return Axios({
        url: "/auth/"+store.state.UserId,
        method: 'get',
    })
}

export const userList = (pageNum,pageSize)=>{
    return Axios({
        url: "/index",
        method: 'post',
        data: {
            pageNum:pageNum,
            pagesize:pageSize
        }
    })
}
