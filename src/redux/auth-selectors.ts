import {AppStateType} from "./redux-store";

export  const getIsAuth = (state: AppStateType) => {
    return state.auth.isAuth;
}

export  const getIsWrongAuth = (state: AppStateType) => {
    return state.auth.isWrongAuth;
}

export  const getAuthErrorMessage = (state: AppStateType) => {
    return state.auth.authErrorMessage;
}

export  const getCaptchaUrlSelector = (state: AppStateType) => {
    return state.auth.captchaUrl;
}

