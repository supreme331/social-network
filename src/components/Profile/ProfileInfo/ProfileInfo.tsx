import React, {ChangeEvent, useState} from "react";
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from '../../../assets/img/user.png'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";
import {ContactsType, ProfileType} from "../../../types/types";

type ProfileInfoPropsType = {
    profile: ProfileType
    status: string
    updateUserStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => void
}

const ProfileInfo: React.FC<ProfileInfoPropsType> = ({profile,
                                                         status,
                                                         updateUserStatus,
                                                         isOwner,
                                                         savePhoto,
                                                         saveProfile}) => {

    let [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0]);
        }
    }
    return(
        <div className={s.descriptionBlock}>
            <img src={profile.photos.large != null ? profile.photos.large : userPhoto} alt="avatar" className={s.mainPhoto}/>
            {isOwner && <input type="file" onChange={onMainPhotoSelected}/>}

            <ProfileStatusWithHooks status={status}
                                    updateUserStatus={updateUserStatus}/>
            {editMode ? <ProfileDataForm profile={profile}
                                         saveProfile={saveProfile}
                                         deActivateEditMode={() => {setEditMode(false)}}/>
                : <ProfileData profile={profile}
                               isOwner={isOwner}
                               activateEditMode={() => {setEditMode(true)}}/>}
        </div>
    )
}

type ContactsPropsType = {
    contactTitle:string
    contactValue: string
}

const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return <div className={s.contact}>{contactTitle}: {contactValue}</div>
}

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    activateEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, activateEditMode}) => {
    return <div>
        {isOwner && <div>
            <button onClick={activateEditMode}>Edit</button>
        </div>}
        <div>{profile.fullName}</div>
        <div>About me: {profile.aboutMe}</div>
        <div>Looking for a job: {profile.lookingForAJob ? "yes" : "no"}</div>
        {profile.lookingForAJob &&
        <div>My professional skills: {profile.lookingForAJobDescription}</div>}
        <div>Contacts: {Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]}/>
        })}</div>
    </div>
}



export default ProfileInfo;