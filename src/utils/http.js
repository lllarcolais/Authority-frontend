import axios from "axios";
import store from "../store"

const instance = axios.create({
    baseURL: "http://localhost:8020"
})


instance.interceptors.request.use(
    function (config){
        if (store.state.UserToken){
            config.headers.token = store.state.UserToken
        }
        if (store.state.UserId){
            config.headers.userId = store.state.UserId
        }
        return config
    },
    function (error){
        return Promise.reject(error)
    }
)

let Axios = (option) => {
    return instance({...option}).catch(err => {
        throw err
    })
}

export default Axios
