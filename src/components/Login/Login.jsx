import React from "react";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import s from './Login.module.css';
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {getAuthErrorMessage, getCaptchaUrlSelector, getIsAuth, getIsWrongAuth} from "../../redux/auth-selectors";

const Input = ({ type, label, name, register, required }) => (
    <>
        <label>{label}</label>
        <input type={type} {...register(name, { required })} />
        <div></div>
    </>
);

const schema = yup.object().shape({
    email: yup.string().required().email().defined(),
    password: yup.string().required()
});

const LoginForm = ({login, isWrongAuth, message, captchaUrl}) => {

    const { register, handleSubmit, formState: {errors} } = useForm(
        {mode: "onBlur", resolver: yupResolver(schema)});

    const onSubmit = (data) => {

        login(data.email, data.password, data.rememberMe, data.captcha);
    };

    return <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <Input label="Email" id="email" name="email" register={register} required />
        </div>
        <p className={s.error}>{errors.email?.message}</p>
        <div>
            <Input type={"password"} label="Password" id={"password"} name={"password"} register={register} required />
        </div>
        <p className={s.error}>{errors.password?.message}</p>
        {isWrongAuth && <p className={s.error}>{message}</p>}
        <div>
            <input type={"checkbox"} id={"rememberMe"} {...register("rememberMe")}/> remember me
        </div>
        <div>
            {captchaUrl && <img src={captchaUrl} alt="captcha"/>}
            {captchaUrl && <Input type={"captcha"} label="Symbols from image" id={"captcha"} name={"captcha"} register={register} required />}
        </div>
        <div>
            <input type="submit" />
        </div>
    </form>
}

const Login = ({isAuth, ...props}) => {
    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginForm {...props}/>
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: getIsAuth(state),
    isWrongAuth: getIsWrongAuth(state),
    message: getAuthErrorMessage(state),
    captchaUrl: getCaptchaUrlSelector(state)
})

export default connect(mapStateToProps, {login})(Login);