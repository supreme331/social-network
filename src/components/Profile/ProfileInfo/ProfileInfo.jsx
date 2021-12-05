import React, {useState} from "react";
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from '../../../assets/img/user.png'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = ({profile, status, updateUserStatus, isOwner, savePhoto, saveProfile, ...props}) => {

    let [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }
    return(
        <div className={s.descriptionBlock}>
            <img src={profile.photos.large != null ? profile.photos.large : userPhoto} alt="avatar" className={s.mainPhoto}/>
            {isOwner && <input type="file" onChange={onMainPhotoSelected}/>}

            <ProfileStatusWithHooks status={status}
                                    profile={profile}
                                    {...props}
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

const Contact = ({contactTitle, contactValue}) => {
    return <div className={s.contact}>{contactTitle}: {contactValue}</div>
}

const ProfileData = ({profile, isOwner, activateEditMode}) => {
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
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        })}</div>
    </div>
}



export default ProfileInfo;