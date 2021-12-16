import {PhotosType, PostType, ProfileType} from "../types/types"
import {profileAPI} from "../api/profileAPI"
import {BaseThunkType, InferActionsTypes} from "./redux-store"

let initialState = {
    posts: [
        {id: 1, message: 'First post', likesCount: 12},
        {id: 2, message: 'Hello world!', likesCount: 18}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ''
}

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/PROFILE/ADD_POST': {
            let newPost = {
                id: 3,
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost]
            }
        }
        case 'SN/PROFILE/SET_USER_PROFILE': {
            return {...state, profile: action.profile}
        }
        case 'SN/PROFILE/SET_USER_STATUS': {
            return {...state, status: action.status}
        }
        case 'SN/PROFILE/DELETE_POST': {
            return {...state, posts: state.posts.filter(p => p.id != action.postId)}
        }
        case 'SN/PROFILE/SAVE_PHOTO_SUCCESS': {
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        }
        default:
            return state
    }
}

export const actions = {
    addPostAC: (newPostText: string) => ({type: 'SN/PROFILE/ADD_POST', newPostText} as const),
    deletePostAC: (postId: number) => ({type: 'SN/PROFILE/DELETE_POST', postId} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SN/PROFILE/SET_USER_PROFILE', profile} as const),
    setUserStatus: (status: string) => ({type: 'SN/PROFILE/SET_USER_STATUS', status} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photos} as const)
}

export const getProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data))
}

export const getUserStatus = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(userId)
    dispatch(actions.setUserStatus(data))
}

export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        const data = await profileAPI.updateStatus(status)
        if (data.resultCode === 0) {
            dispatch(actions.setUserStatus(status))
        }
    } catch(error) {
        //
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const data = await profileAPI.saveProfile(profile)
    if (data.resultCode === 0) {
        if (userId != null) {
            dispatch(getProfile(userId))
        } else {
            throw new Error("userId can`t be null")
        }

    }
}

export default profileReducer

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>