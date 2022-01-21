import {AppStateType} from "./redux-store"

export  const getProfileSelector = (state: AppStateType) => {
    return state.profilePage.profile

}

export  const getIsFetchingProfile = (state: AppStateType) => {
    return state.profilePage.isFetchingProfile

}