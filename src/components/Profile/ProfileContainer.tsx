import React from "react"
import Profile from "./Profile"
import {connect} from "react-redux"
import {getProfile,
    getUserStatus,
    savePhoto,
    saveProfile,
    updateUserStatus} from "../../redux/profile-reducer"
import {RouteComponentProps, withRouter} from "react-router-dom"
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux"
import {getIsAuth} from "../../redux/auth-selectors"
import {ProfileType, UserType} from "../../types/types"
import {AppStateType} from "../../redux/redux-store"
import Preloader from "../common/Preloader/Preloader";

type MapStatePropsType = {
    profile: ProfileType | null
    status: string
    authorizedUserId: number | null
    isAuth: boolean
}

// type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateUserStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => void
}

type OwnPropsType = {} // coming from outside

type PathParamsType = {
    userId: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType & RouteComponentProps<PathParamsType>;

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        if (!userId) {
            throw new Error( "ID should exists in URI params or in state ('authorizedUserId')")
        } else {
            this.props.getProfile(userId)
            this.props.getUserStatus(userId)
        }
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: PropsType, prevState: AppStateType) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        if (!this.props.profile) {
            return <Preloader/>
        }
        return (
            <div>
                <Profile {...this.props}
                         isOwner={!this.props.match.params.userId}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateUserStatus={this.props.updateUserStatus}
                         savePhoto={this.props.savePhoto}
                         isAuth={this.props.isAuth}
                         saveProfile={this.props.saveProfile}
                />

            </div>
        )
    }
}

// @ts-ignore
let mapStateToProps = (state:AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: getIsAuth(state)
})

export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {getProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile}),
    withRouter,
    // withAuthRedirect
)(ProfileContainer)