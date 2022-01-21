import {AppStateType} from "./redux-store";

export  const getIsAuth = (state: AppStateType) => {
    return state.auth.isAuth;
}
export  const getCurrentUserId = (state: AppStateType) => {
    return state.auth.userId;
}

export  const getIsWrongAuth = (state: AppStateType) => {
    return state.auth.isWrongAuth;
}
export  const getCurrentUserLogin = (state: AppStateType) => {
    return state.auth.login;
}

export  const getAuthErrorMessage = (state: AppStateType) => {
    return state.auth.authErrorMessage;
}

export  const getCaptchaUrlSelector = (state: AppStateType) => {
    return state.auth.captchaUrl;
}

