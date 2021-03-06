export type PostType = {
    id: number,
    message: string,
    likesCount: number,
    isLiked: boolean
}
export type ContactsType = {
    github: string,
    vk: string,
    facebook: string,
    instagram: string,
    twitter: string,
    website: string,
    youtube: string,
    mainLink: string
}
export type PhotosType = {
    small: string | null,
    large: string | null
}
export type ProfileType = {
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: ContactsType
    photos: PhotosType
    aboutMe: string
}
export type UserType = {
    id: number,
    name: string,
    photos: PhotosType,
    status: string | null,
    followed: boolean
}

export type DialogType = {
    id: number,
    name: string,
    messages: Array<MessageType>
}

export type MessageType = {
    id: number,
    message: string
}

export type GetStringKeys<T> = Extract<keyof T, string>