import React from "react"
import s from './Login.module.css'
import {useDispatch, useSelector} from "react-redux"
import {Redirect} from "react-router-dom"
import {login} from "../../redux/auth-reducer"
import {getAuthErrorMessage, getCaptchaUrlSelector, getIsAuth, getIsWrongAuth} from "../../redux/auth-selectors"
import {Button, Checkbox, Form, Input, Typography} from 'antd'

const { Paragraph } = Typography;

type FormData = {
    username: string
    password: string
    remember: boolean
    captcha?: string
}
type LoginFormProps = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string | undefined) => void
    isWrongAuth: boolean
    message: string | null
    captchaUrl: string | null
}

const LoginForm: React.FC<LoginFormProps> = ({login, isWrongAuth, message, captchaUrl}) => {

    const [form] = Form.useForm();

    const onFinish = (values: FormData) => {
        login(values.username, values.password, values.remember, values.captcha)
        console.log(values)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: false }}
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
                    Login
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

    return <div  style={{height: '100vh', maxWidth: 800, padding: '50px 50px'}}>
            <div>
                <h2>Тестовые Email и Password</h2>
                <b>Email:</b><Paragraph copyable>free@samuraijs.com</Paragraph>
                <b>Password:</b><Paragraph copyable>free</Paragraph>
            </div>
            <LoginForm login={loginFunc} isWrongAuth={isWrongAuth} message={message} captchaUrl={captchaUrl}/>
    </div>
}

export default LoginPage