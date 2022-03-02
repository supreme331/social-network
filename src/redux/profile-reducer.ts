import {PhotosType, PostType, ProfileType} from "../types/types"
import {profileAPI} from "../api/profileAPI"
import {BaseThunkType, InferActionsTypes} from "./redux-store"
import {usersAPI} from "../api/usersAPI";

let initialState = {
    posts: [
        {id: 1, message: 'First post', likesCount: 12, isLiked: false},
        {id: 2, message: 'Hello world!', likesCount: 18, isLiked: true},
        {id: 3, message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. ', likesCount: 0, isLiked: false}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    isFetchingProfile: false,
    isFetchingFollowed: false,
    isFollowed: null as boolean | null
}

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/PROFILE/ADD_POST': {
            let newPost = {
                id: state.posts.length + 1,
                message: action.newPostText,
                likesCount: 0,
                isLiked: false
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
        case 'SN/PROFILE/TOGGLE_IS_FETCHING_PROFILE': {
            return {...state, isFetchingProfile: action.isFetchingProfile}
        }
        case 'SN/PROFILE/TOGGLE_IS_FETCHING_FOLLOWED': {
            return {...state, isFetchingFollowed: action.isFetchingFollowed}
        }
        case 'SN/PROFILE/SET_IS_FOLLOWED': {
            return {...state, isFollowed: action.isFollowed}
        }
        case 'SN/PROFILE/SET_LIKED': {
            let changingPost = state.posts.find(p => p.id === action.postId)
            let changingPostIndex = state.posts.findIndex(p => p.id === action.postId)
            // @ts-ignore
            let changedPost = {...changingPost, likesCount: changingPost.likesCount + 1, isLiked: true}
            let postsCopy = state.posts.slice()
            // @ts-ignore
            postsCopy.splice(changingPostIndex, 1, changedPost)
            return {...state,
                posts: postsCopy}
        }
        case 'SN/PROFILE/SET_UNLIKED': {
            let changingPost = state.posts.find(p => p.id === action.postId)
            let changingPostIndex = state.posts.findIndex(p => p.id === action.postId)
            // @ts-ignore
            let changedPost = {...changingPost, likesCount: changingPost.likesCount - 1, isLiked: false}
            let postsCopy = state.posts.slice()
            // @ts-ignore
            postsCopy.splice(changingPostIndex, 1, changedPost)
            return {...state,
                posts: postsCopy}
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
    savePhotoSuccess: (photos: PhotosType) => ({type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photos} as const),
    toggleIsFetchingProfile: (isFetchingProfile: boolean) => ({type: 'SN/PROFILE/TOGGLE_IS_FETCHING_PROFILE', isFetchingProfile} as const),
    toggleIsFetchingFollowed: (isFetchingFollowed: boolean) => ({type: 'SN/PROFILE/TOGGLE_IS_FETCHING_FOLLOWED', isFetchingFollowed} as const),
    setIsFollowed: (isFollowed: boolean | null) => ({type: 'SN/PROFILE/SET_IS_FOLLOWED', isFollowed} as const),
    setLiked: (postId: number) => ({type: 'SN/PROFILE/SET_LIKED', postId} as const),
    setUnLiked: (postId: number) => ({type: 'SN/PROFILE/SET_UNLIKED', postId} as const)
}

export const fetchingProfile = () => (dispatch: any) => {
    dispatch(actions.toggleIsFetchingProfile(true))
}

export const getProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data))
    dispatch(actions.toggleIsFetchingProfile(false))
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

export const fetchingFollowed = () => (dispatch: any) => {
    dispatch(actions.toggleIsFetchingFollowed(true))
}

export const getIsUserFollowed = (userId: number): ThunkType => async (dispatch) => {
    const isFollowed = await usersAPI.getIsUserFollowed(userId)
    // @ts-ignore
    dispatch(actions.setIsFollowed(isFollowed))
    dispatch(actions.toggleIsFetchingFollowed(false))
}

export default profileReducer

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>