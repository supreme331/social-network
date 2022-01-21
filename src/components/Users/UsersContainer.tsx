import React from "react"
import {useSelector} from "react-redux"
import {Users} from "./Users"
import Preloader from "../common/Preloader/Preloader"
import {getIsFetching} from "../../redux/users-selectors"
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

type UsersPagePropsType = {
    pageTitle: string
}

const UsersPage: React.FC<UsersPagePropsType> = (props) => {

    const isFetching = useSelector(getIsFetching)

    return <div>
        <h2>{props.pageTitle}</h2>
        {isFetching ? <Preloader/> : null}
        <Users/>
    </div>
}

export default withAuthRedirect(UsersPage)

