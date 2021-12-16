import React from "react"
import './App.css'
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import ProfileContainer from "./components/Profile/ProfileContainer"
import HeaderContainer from "./components/Header/HeaderContainer"
import {connect, Provider} from "react-redux"
import {compose} from "redux"
import {initializeApp} from "./redux/app-reducer"
import Preloader from "./components/common/Preloader/Preloader"
import store, {AppStateType} from "./redux/redux-store"
import {withSuspense} from "./hoc/withSuspense"

const News = React.lazy(() => import('./components/News/News'))
const Settings = React.lazy(() => import('./components/Settings/Settings'))
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'))
const LoginPage = React.lazy(() => import('./components/Login/Login'))

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedUsers = withSuspense(UsersContainer)
const SuspendedLoginPage = withSuspense(LoginPage)

class App extends React.Component<MapPropsType & DispatchPropsType> {
    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert("Some error occurred")
    }
    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }
    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialized)
        return <Preloader />
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Switch>
                    <Route exact path='/' render={() => <Redirect to={"/profile"}/>}/>
                    <Route path='/dialogs' render={() => <SuspendedDialogs/>}/>
                    <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                    <Route path='/users' render={() => <SuspendedUsers/>}/>
                    <Route path='/news' render={withSuspense(News)}/>
                    <Route path='/settings' render={withSuspense(Settings)}/>
                    <Route path='/login' render={() => <SuspendedLoginPage/>}/>
                    <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
                    </Switch>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

const AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App)

const SamuraiJSApp: React.FC = () => {
    return(
    <BrowserRouter>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </BrowserRouter>)
}
export default SamuraiJSApp