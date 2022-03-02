import React, {useEffect, useState} from "react"
import s from './Navbar.module.css'
import {Link, NavLink} from "react-router-dom"
import {Layout, Menu} from "antd";
import {LaptopOutlined, NotificationOutlined, UserOutlined, MessageOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {FilterType, requestUsers} from "../../redux/users-reducer";
import {getPageSize} from "../../redux/users-selectors";

const { SubMenu } = Menu
const { Sider } = Layout

const Navbar: React.FC = () => {



    const dispatch = useDispatch()
    const pageSize = useSelector(getPageSize)
    const onOnlyFriends = () => {
        dispatch(requestUsers(1, pageSize, {term: '', friend: true}))
    }
    const onAllDevelopers = () => {
        dispatch(requestUsers(1, pageSize, {term: '', friend: null}))
    }

    return <Sider width={200} style={ {
        padding: '50px 0',
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        zIndex: 1
    }}>
        <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
        >
                <Menu.Item className={s.item} key="1" icon={<UserOutlined />}><Link to="/profile">Profile</Link></Menu.Item>
                <Menu.Item className={s.item} key="2" icon={<MessageOutlined />}><Link to="/dialogs">Messages</Link></Menu.Item>
            <SubMenu className={s.item} key="sub2" icon={<LaptopOutlined />} title="Developers">
                <Menu.Item className={s.item} key="5"><Link onClick={onAllDevelopers} to="/developers">All developers</Link></Menu.Item>
                <Menu.Item className={s.item} key="6"><Link onClick={onOnlyFriends} to="/developers">Only followed</Link></Menu.Item>
            </SubMenu>
        </Menu>
    </Sider>

    // <nav className={s.nav}>
    //     <div className={s.item}>
    //         <NavLink to="/profile" activeClassName={s.activeLink}>Profile</NavLink>
    //     </div>
    //     <div className={s.item}>
    //         <NavLink to="/dialogs" activeClassName={s.activeLink}>Messages</NavLink>
    //     </div>
    //     <div className={s.item}>
    //         <NavLink to="/users" activeClassName={s.activeLink}>Users</NavLink>
    //     </div>
    //     <div className={s.item}>
    //         <NavLink to="/news" activeClassName={s.activeLink}>News</NavLink>
    //     </div>
    //     <div className={s.item}>
    //         <NavLink to="settings" activeClassName={s.activeLink}>Settings</NavLink>
    //     </div>
    // </nav>
}

export default Navbar