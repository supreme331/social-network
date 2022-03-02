import React, {ChangeEvent, useEffect, useState} from "react";
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from '../../../assets/img/user.png'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";
import {ContactsType, ProfileType} from "../../../types/types";
import {Row, Col, Divider, Typography, Space} from "antd";
import {follow, unfollow, updateTotalUsersCount} from "../../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {getFollowingInProgress} from "../../../redux/users-selectors";
import {getIsFollowed} from "../../../redux/profile-selectors";
import {FollowUnfollowBtn} from "../../Users/FollowUnfollowBtn";
import {actions, getIsUserFollowed} from "../../../redux/profile-reducer";


const { Text, Link } = Typography;

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
    const dispatch = useDispatch()
    const followingInProgress = useSelector(getFollowingInProgress)
    const isFollowed = useSelector(getIsFollowed)




    const [actualIsFollowed, setActualIsFollowed] = useState(isFollowed)

    useEffect(() => {
        // dispatch(updateTotalUsersCount(isFollowed))
        setActualIsFollowed(isFollowed)
    }, [isFollowed])

    // useEffect(() => {
    //     dispatch(actions.setIsFollowed(actualIsFollowed))
    //
    //     console.log(actualIsFollowed)
    // },[actualIsFollowed, isFollowed])

    if (!profile) {
        return <Preloader />
    }    

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0]);
        }
    }

    const followFunc = (userId: number) => {
        dispatch(follow(userId, true))
        // dispatch(getIsUserFollowed(userId))
    }
    const unfollowFunc = (userId: number) => {
        dispatch(unfollow(userId, false))
        // dispatch(getIsUserFollowed(userId))
    }

    return <div className={s.infoBlock}>
            <Row style={{maxWidth: 200}}>
                <div className={s.mainPhoto}>
                    <img src={profile.photos.large != null ? profile.photos.large : userPhoto} alt="avatar" />
                    {isOwner && <label className={s.loadPhotoActive}><h3>Загрузить фото</h3>
                        <input className={s.file} id="file" type="file" onChange={onMainPhotoSelected}/></label>}
                </div>
                <div>
                    {!isOwner && <FollowUnfollowBtn actualIsFollowed={isFollowed} userId={profile.userId} follow={followFunc}
                                                    unfollow={unfollowFunc} followingInProgress={followingInProgress} setActualIsFollowed={setActualIsFollowed}/>}
                </div>
            </Row>
            <div className={s.descriptionBlock} >
                <h2>{profile.fullName}</h2>
                <ProfileStatusWithHooks status={status}
                                        isOwner={isOwner}
                                        updateUserStatus={updateUserStatus}/>

                {editMode ? <ProfileDataForm profile={profile}
                                             saveProfile={saveProfile}
                                             deActivateEditMode={() => {setEditMode(false)}}/>
                    : <ProfileData profile={profile}
                                   isOwner={isOwner}
                                   activateEditMode={() => {setEditMode(true)}}/>}
            </div>
    </div>
}

type ContactsPropsType = {
    contactTitle:string
    contactValue: string
}

const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return <Link className={s.contact} href={contactValue} target="_blank">
        {contactTitle}
    </Link>
}

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    activateEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, activateEditMode}) => {


    return <div>
        {isOwner ? <div>
            <Divider orientation="right"><Text className={s.deviderText} onClick={activateEditMode}>Edit profile</Text></Divider>
        </div>
        : <Divider />
        }
        <Space direction="vertical">
        <Text><b>About me:</b> {profile.aboutMe}</Text>
        <Text><b>Looking for a job:</b> {profile.lookingForAJob ? "yes" : "no"}</Text>
        {profile.lookingForAJob &&
        <Text><b>My professional skills:</b> {profile.lookingForAJobDescription}</Text>}
        <div style={{maxWidth: 450}}>
            <Space direction="vertical">
            <b>Contacts:</b> <Space wrap split={<Divider type="vertical" />}>
            {Object.keys(profile.contacts).map(key => {
                const contactValue = profile.contacts[key as keyof ContactsType]
                if (contactValue) {
                    return <Contact key={key} contactTitle={key} contactValue={contactValue}/>
                }
            })}
            </Space>
            </Space>
            </div>
        </Space>
    </div>
}



export default ProfileInfo;