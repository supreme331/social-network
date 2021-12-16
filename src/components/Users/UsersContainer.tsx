import React from "react"
import {connect} from "react-redux"
import {
    follow,
    requestUsers,
    unfollow
} from "../../redux/users-reducer"
import Users from "./Users"
import Preloader from "../common/Preloader/Preloader"
import {withAuthRedirect} from "../../hoc/withAuthRedirect"
import {compose} from "redux"
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsers
} from "../../redux/users-selectors"
import {UserType} from "../../types/types"
import {AppStateType} from "../../redux/redux-store"

type MapStatePropsType = {
    pageTitle: string,
    currentPage: number,
    pageSize: number,
    isFetching: boolean,
    totalUsersCount: number,
    followingInProgress: Array<number> // array of users ids,
    users: Array<UserType>
}

type MapDispatchPropsType = {
    requestUsers: (currentPage: number, pageSize: number) => void,
    unfollow: (userId: number) => void,
    follow: (userId: number) => void
}

type OwnPropsType = {} // coming from outside

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType



class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        const {requestUsers, currentPage, pageSize} = this.props
        requestUsers(currentPage, pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        const {requestUsers, pageSize} = this.props
        requestUsers(pageNumber, pageSize)
    }

    render() {
        return <div>
            <h2>{this.props.pageTitle}</h2>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   onPageChanged={this.onPageChanged}
                   currentPage={this.props.currentPage}
                   users={this.props.users}
                   unfollow={this.props.unfollow}
                   follow={this.props.follow}
                   followingInProgress={this.props.followingInProgress}
            />
        </div>
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        pageTitle: "Самураи"
    }
}

//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState

export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
        follow,
        unfollow,
        requestUsers
    }),
    withAuthRedirect
)(UsersContainer)