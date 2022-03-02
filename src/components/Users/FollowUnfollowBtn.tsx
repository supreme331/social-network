import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {actions, getIsUserFollowed} from "../../redux/profile-reducer";
import {Button} from "antd";
import s from "./Users.module.css";
import {updateTotalUsersCount} from "../../redux/users-reducer";

type FollowUnfollowBtnProps = {
    actualIsFollowed: boolean | null
    userId: number
    followingInProgress: Array<number> // array of users ids
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    setActualIsFollowed: (actualIsFollowed: boolean | null) => void
}


export const FollowUnfollowBtn: React.FC<FollowUnfollowBtnProps> = ({actualIsFollowed, userId, followingInProgress, unfollow, follow, setActualIsFollowed}) => {


    return <div>
        {actualIsFollowed
            ? <Button className={s.profileButton} disabled={followingInProgress.some(id => id === userId)}
                      onClick={() => {
                          unfollow(userId)
                          // setActualIsFollowed(false)
                      }}>Unfollow</Button>
            : <Button className={s.profileButton} type="primary" disabled={followingInProgress.some(id => id === userId)}
                      onClick={() => {
                          follow(userId)
                          // setActualIsFollowed(true)
                      }}>Follow</Button>}
    </div>
}