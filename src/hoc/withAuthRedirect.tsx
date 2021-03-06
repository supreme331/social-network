import React from "react"
import {Redirect} from "react-router-dom"
import {connect} from "react-redux"
import {AppStateType} from "../redux/redux-store"

let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})


type mapStatePropsForRedirectType = ReturnType<typeof mapStateToPropsForRedirect>
type mapDispatchPropsForRedirectType = {
}

export function withAuthRedirect<WCP> (WrappedComponent: React.ComponentType<WCP>) {
    const RedirectComponent: React.FC<mapStatePropsForRedirectType & mapDispatchPropsForRedirectType> = (props) => {
        let {isAuth, ...restProps} = props
        if (!isAuth) return <Redirect to={'login'}/>
        return <WrappedComponent {...restProps as WCP}/>
    }

    let ConnectedAuthRedirectComponent = connect<mapStatePropsForRedirectType, {}, WCP, AppStateType>(
        mapStateToPropsForRedirect, {})
    (RedirectComponent)

    return ConnectedAuthRedirectComponent
}