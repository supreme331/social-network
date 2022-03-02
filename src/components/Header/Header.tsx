import React from "react"
import {NavLink} from "react-router-dom"
import {Button, Col, Layout, Row, Tooltip} from "antd"
import {useDispatch, useSelector} from "react-redux"
import {getCurrentUserLogin, getIsAuth} from "../../redux/auth-selectors"
import {logout} from "../../redux/auth-reducer"
import s from "./Header.module.css"
import siteLogo from "../../assets/img/logo.png"

export type MapPropsType = {}
export type DispatchPropsType = {}

export const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {

    const {Header} = Layout
    const isAuth = useSelector(getIsAuth)
    const login = useSelector(getCurrentUserLogin)
    const dispatch = useDispatch()
    const logoutCallBack = () => {
        dispatch(logout())
    }

    return <Header className="header"  style={{ position: 'fixed', zIndex: 2, width: "100%" }}>
        <div style={{maxWidth: 1000, margin: "auto"}}>
            <Row justify="center">
                <Col span={16}>
                    <NavLink to={'/profile'}>
                        <img className={s.logo} src={siteLogo}/>
                    </NavLink>
                </Col>
                {isAuth ? <>
                        <Col span={4}>
                            <Tooltip title="It`s you">
                            <NavLink to={'/profile'}>
                                <h3>{login}</h3>
                            </NavLink>
                            </Tooltip>
                        </Col>
                        <Col className={s.loginBtn} span={4}>
                            <Button type="primary" onClick={logoutCallBack}>Log out</Button>
                        </Col>
                    </>
                    :
                    <Col span={8}>
                    </Col>
                }
            </Row>
        </div>
    </Header>
}
