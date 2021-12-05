import React from "react";
import s from './Users.module.css';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

let Users = ({currentPage, onPageChanged, totalUsersCount, pageSize, users,
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