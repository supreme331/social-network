import React from "react";
import s from './Users.module.css';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../../types/types";

type PropsType = {
    currentPage: number,
    onPageChanged: (pageNumber: number) => void,
    totalUsersCount: number,
    pageSize: number,
    users: Array<UserType>,
    followingInProgress: Array<number> // array of users ids,
    unfollow: (userId: number) => void,
    follow: (userId: number) => void
}

let Users: React.FC<PropsType> = ({currentPage, onPageChanged, totalUsersCount, pageSize, users,
                 followingInProgress, unfollow, follow}) => {
    return (
        <div>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                       totalItemsCount={totalUsersCount} pageSize={pageSize}/>
            <div>
                {users.map(u => <User key={u.id} user={u} followingInProgress={followingInProgress}
                                      unfollow={unfollow} follow={follow}/>
                )}
            </div>
        </div>
    )
}


export default Users;