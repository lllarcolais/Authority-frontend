export default {
    LOGIN_IN_TOKEN(state,token){
        state.UserToken = token;
    },
    LOGIN_IN_USERID(state,userId){
        state.UserId = userId;
    },
    LOGIN_OUT(state){
        state.UserToken = '';
        state.UserId = '';
    }
}
