export default {
    get UserToken(){
        return localStorage.getItem("token");
    },
    set UserToken(value){
        localStorage.setItem("token",value);
    },
    get UserId() {
        return localStorage.getItem("userId");
    },
    set UserId(value){
        return localStorage.setItem("userId",value);
    }
}
