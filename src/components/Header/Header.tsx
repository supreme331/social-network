import React from "react";
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

export type MapPropsType = {
    isAuth: boolean
    login: string | null
}
export type DispatchPropsType = {
    logout: () => void
}

const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    return <header className={s.header}>
        <a href="/">
        <img src={"https://www.pinclipart.com/picdir/big/562-5622913_transparent-problem-solved-clipart-stick-figure-family-cartoon.png"}/>
        </a>
        <div className={s.loginBlock}>
            {props.isAuth
                ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
                : <NavLink to={'/login'}>Login</NavLink>}
        </div>
    </header>
}

export default Header;