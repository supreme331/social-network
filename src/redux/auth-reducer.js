import {authAPI, securityAPI} from "../api/api";

const SET_USER_DATA = '/auth/SET_USER_DATA';
const WRONG_AUTH_DATA = '/auth/WRONG_AUTH_DATA';
const GET_CAPTCHA_URL_SUCCESS = '/auth/GET_CAPTCHA_URL_SUCCESS';


let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    isWrongAuth: false,
    authErrorMessage: "",
    captchaUrl: null // if null, then captcha is not required
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        case WRONG_AUTH_DATA:
            return {
                ...state, isWrongAuth: action.isWrongAuth, authErrorMessage: action.message
            }
        default:
            return state;
    }
}

export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.me()
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }

}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Authorisation error";
        dispatch(wrongAuthData(true, message))
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}


export const setAuthUserData = (userId, email, login, isAuth) => (
    {type: SET_USER_DATA, payload: {userId, email, login, isAuth}});

export const getCaptchaUrlSuccess = (captchaUrl) => (
    {type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}});

export const wrongAuthData = (isWrongAuth, message) => (
    {type: WRONG_AUTH_DATA, isWrongAuth, message});
export default authReducer;