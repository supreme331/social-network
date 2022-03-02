import React from "react"
import {useSelector} from "react-redux"
import {Users} from "./Users"
import Preloader from "../common/Preloader/Preloader"
import {getIsFetching} from "../../redux/users-selectors"
import {withAuthRedirect} from "../../hoc/withAuthRedirect"
import s from './Users.module.css'

const UsersPage: React.FC = () => {

    const isFetching = useSelector(getIsFetching)

    return <div className={s.usersContent}>
        <h2>Developers</h2>
        {isFetching ? <Preloader/> : null}
        <Users/>
    </div>
}

export default withAuthRedirect(UsersPage)

