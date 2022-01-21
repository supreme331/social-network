import React from "react"
import {SubmitHandler, useForm} from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import s from './Login.module.css'
import {useDispatch, useSelector} from "react-redux"
import {Redirect} from "react-router-dom"
import {login} from "../../redux/auth-reducer"
import {getAuthErrorMessage, getCaptchaUrlSelector, getIsAuth, getIsWrongAuth} from "../../redux/auth-selectors"
import { Form, Input, Button, Select, Checkbox, Typography } from 'antd'

const schema = yup.object().shape({
    email: yup.string().required().email().defined(),
    password: yup.string().required()
})

const { Paragraph } = Typography;

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

const LoginForm2: React.FC<LoginFormProps> = ({login, isWrongAuth, message, captchaUrl}) => {

    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Success:', values);
        login(values.username, values.password, values.remember, values.captcha)
        console.log(form.getFieldsError())
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 10 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Email"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>
            {/*<p className={s.error}>{errorInfo.password?.message}</p>*/}
            {isWrongAuth && <p className={s.error}>{message}</p>}

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <div>
                {captchaUrl && <img src={captchaUrl} alt="captcha"/>}
                {captchaUrl && <Form.Item
                        label="Symbols from image"
                        name="captcha"
                        rules={[{ required: true, message: 'Please input symbols from image' }]}
                    >
                        <Input />
                    </Form.Item>}
            </div>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};



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

    return <div  style={{height: '100vh', padding: '50px 0'}}>
        <div>
            <h2>Тестовые Email и Password</h2>
            <b>Email:</b><Paragraph copyable>free@samuraijs.com</Paragraph>
            <b>Password:</b><Paragraph copyable>free</Paragraph>
        </div>
        {/*<LoginForm login={loginFunc} isWrongAuth={isWrongAuth} message={message} captchaUrl={captchaUrl}/>*/}
        <LoginForm2 login={loginFunc} isWrongAuth={isWrongAuth} message={message} captchaUrl={captchaUrl}/>
    </div>
}

export default LoginPage