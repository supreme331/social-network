import {GetItemsType, instance, APIResponseType} from "./api"


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 100, term: string, friend: null | boolean = null) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}`
            + (friend === null ? '' : `&friend=${friend}`))
            .then(res => res.data)
    },
    follow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`).then(res => res.data)
    },
    unfollow(userId: number) {
        return instance.delete<APIResponseType>(`follow/${userId}`).then(res => res.data)
    },
    getIsUserFollowed(userId: number) {
        return instance.get<APIResponseType>(`follow/${userId}`).then(res => res.data)
    }
}