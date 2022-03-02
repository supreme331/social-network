import React, {useEffect, useState} from "react"
import s from './Users.module.css'
import {NavLink} from "react-router-dom"
import {UserType} from "../../types/types"
import {Avatar, Button, Col, Divider, Row} from "antd"
import userPhoto from "./../../assets/img/user.png"
import { UserOutlined } from "@ant-design/icons"
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../redux/profile-reducer";
import {getIsFollowed} from "../../redux/profile-selectors";
import {FollowUnfollowBtn} from "./FollowUnfollowBtn";

type PropsType = {
    user: UserType
    followingInProgress: Array<number> // array of users ids
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}



const User: React.FC<PropsType> = ({user, followingInProgress, unfollow, follow}) => {
    return <div className={s.item}>
        <Divider />
        <Row>
            <Col>
                <NavLink to={'/profile/' + user.id}>
                    <Avatar className={s.userPhoto} shape="square" size={100} icon={user.photos.small
                        ? <img src={user.photos.small} alt="avatar"/> : <img src={userPhoto} alt="avatar"/>} />
                </NavLink>
                <div>
                    {user.followed
                        ? <Button className={s.usersButton} disabled={followingInProgress.some(id => id === user.id)}
                                  onClick={() => {
                                      unfollow(user.id)
                                  }}>Unfollow</Button>
                        : <Button className={s.usersButton} type="primary" disabled={followingInProgress.some(id => id === user.id)}
                                  onClick={() => {
                                      follow(user.id)
                                  }}>Follow</Button>}
                </div>
            </Col>
            <Col>
                <NavLink to={'/profile/' + user.id}>
                    <h3 className={s.userName}>{user.name}</h3>
                    <h4>{user.status}</h4>
                </NavLink>
            </Col>
        </Row>
    </div>

}


export default User