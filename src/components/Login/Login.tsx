import React from "react"
import {SubmitHandler, useForm} from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import s from './Login.module.css'
import {useDispatch, useSelector} from "react-redux"
import {Redirect} from "react-router-dom"
import {login} from "../../redux/auth-reducer"
import {getAuthErrorMessage, getCaptchaUrlSelector, getIsAuth, getIsWrongAuth} from "../../redux/auth-selectors"

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

const LoginPage: React.FC = () => {

    const captchaUrl= useSelector(getCaptchaUrlSelector)
    const message= useSelector(getAuthErrorMessage)
    const isWrongAuth= useSelector(getIsWrongAuth)
    const isAuth= useSelector(getIsAuth)

    const dispatch = useDispatch()

    const loginFunc = (email: string, password: string, rememberMe: boolean, captcha: string | undefined) => {
        dispatch(login(email, password, rememberMe, captcha))
    }

    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginForm login={loginFunc} isWrongAuth={isWrongAuth} message={message} captchaUrl={captchaUrl}/>
    </div>
}

export default LoginPage