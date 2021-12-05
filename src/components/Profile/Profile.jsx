import React from "react";
import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {Redirect} from "react-router-dom";



const Profile = (props) => {
    if (!props.isAuth) {
        return <Redirect to={"/login"}/>
    }
    return (
        <div>
            <ProfileInfo savePhoto={props.savePhoto}
                         isOwner={props.isOwner}
                         profile={props.profile}
                         status={props.status}
                         saveProfile={props.saveProfile}
                         updateUserStatus={props.updateUserStatus}/>
            <MyPostsContainer />
        </div>
    )
}

export default Profile;