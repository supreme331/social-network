import React from "react";
import {Link} from "react-router-dom";
import { Button, Col, Layout, Menu, Row} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {getIsAuth, getCurrentUserLogin} from "../../redux/auth-selectors";
import {logout} from "../../redux/auth-reducer";
import s from "./Header.module.css";


export type MapPropsType = {}
export type DispatchPropsType = {}

export const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {

    const {Header} = Layout;

    const isAuth = useSelector(getIsAuth)
    const login = useSelector(getCurrentUserLogin)



    const dispatch = useDispatch()

    const logoutCallBack = () => {
        dispatch(logout())
    }

    return <Header className="header"  style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <Row>
            <Col span={18}>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1"><Link to="/">Main</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/developers">Developers</Link></Menu.Item>
                    {/*<Menu.Item key="3">nav 3</Menu.Item>*/}
                </Menu>
            </Col>

                {isAuth ? <>
                        <Col span={2}>
                        <h3>{login}</h3>
                        </Col>
                    <Col className={s.loginBtn} span={4}>
                        <Button onClick={logoutCallBack}>Log out</Button>
                    </Col>
                </>
                    :
                    <Col span={6}>
                        <Button><Link to={'/login'}>Login</Link></Button>

                    </Col>
                        }

        </Row>
    </Header>

    // <header className={s.header}>
    //     <a href="/">
    //     <img src={"https://www.pinclipart.com/picdir/big/562-5622913_transparent-problem-solved-clipart-stick-figure-family-cartoon.png"}/>
    //     </a>
    //     <div className={s.loginBlock}>
    //         {props.isAuth
    //             ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
    //             : <NavLink to={'/login'}>Login</NavLink>}
    //     </div>
    // </header>
}
