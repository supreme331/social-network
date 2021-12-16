import React from "react"
import {SubmitHandler, useForm} from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import s from './Login.module.css'
import {connect} from "react-redux"
import {login} from "../../redux/auth-reducer"
import {Redirect} from "react-router-dom"
import {getAuthErrorMessage, getCaptchaUrlSelector, getIsAuth, getIsWrongAuth} from "../../redux/auth-selectors"
import {AppStateType} from "../../redux/redux-store"
import {compose} from "redux"

const schema = yup.object().shape({
    email: yup.string().required().email().defined(),
    password: yup.string().required()
})

type FormData = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
type LoginFormProps = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string | undefined) => void
    isWrongAuth: boolean
    message: string | null
    captchaUrl: string | null
}

const LoginForm: React.FC<LoginFormProps> = ({login, isWrongAuth, message, captchaUrl}) => {

    const { register, handleSubmit, formState: {errors} } = useForm<FormData>(
        {mode: "onBlur", resolver: yupResolver(schema)})

    const onSubmit: SubmitHandler<FormData> = (data) => {

        login(data.email, data.password, data.rememberMe, data.captcha)
    }

    return <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label>Email</label>
            <input type="email" id={"email"} {...register("email")} />
        </div>
        <p className={s.error}>{errors.email?.message}</p>
        <div>
            <label>Password</label>
            <input type="password" id={"password"} {...register("password")} />
        </div>
        <p className={s.error}>{errors.password?.message}</p>
        {isWrongAuth && <p className={s.error}>{message}</p>}
        <div>
            <input type={"checkbox"} id={"rememberMe"} {...register("rememberMe")}/> remember me
        </div>
        <div>
            {captchaUrl && <img src={captchaUrl} alt="captcha"/>}
            {captchaUrl && <div><label>Symbols from image</label>
                <input type="captcha" {...register("captcha")} /></div>}
        </div>
        <div>
            <input type="submit" />
        </div>
    </form>
}

type MapStatePropsType = {
    isAuth: boolean
    isWrongAuth: boolean
    message: string | null
    captchaUrl: string | null
}

type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string | undefined) => void
}

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = ({isAuth,
                                                                       isWrongAuth,
                                                                       message,
                                                                       captchaUrl,
                                                                       login}) => {
    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginForm login={login} isWrongAuth={isWrongAuth} message={message} captchaUrl={captchaUrl}/>
    </div>
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: getIsAuth(state),
    isWrongAuth: getIsWrongAuth(state),
    message: getAuthErrorMessage(state),
    captchaUrl: getCaptchaUrlSelector(state)
})

export default compose<React.ComponentType>(connect<MapStatePropsType,
    MapDispatchPropsType,
    null, // OwnPropsType
    AppStateType>(mapStateToProps, {login}))(Login)