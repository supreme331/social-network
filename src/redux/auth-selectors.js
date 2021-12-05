export  const getIsAuth = (state) => {
    return state.auth.isAuth;
}

export  const getIsWrongAuth = (state) => {
    return state.auth.isWrongAuth;
}

export  const getAuthErrorMessage = (state) => {
    return state.auth.authErrorMessage;
}

export  const getCaptchaUrlSelector = (state) => {
    return state.auth.captchaUrl;
}

