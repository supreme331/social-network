import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {Redirect} from "react-router-dom";
import {ProfileType} from "../../types/types";
import { Row, Col } from "antd";
import {FollowedUsersBar} from "../Users/FollowedUsersBar";

type PropsType = {
    isAuth: boolean
    savePhoto: (file: File) => void
    isOwner: boolean
    profile: ProfileType
    status: string
    saveProfile: (profile: ProfileType) => void
    updateUserStatus: (status: string) => void
}

const Profile: React.FC<PropsType> = (props) => {
    // if (!props.isAuth) {
    //     return <Redirect to={"/login"}/>
    // }
    return (
        <div>
            <ProfileInfo savePhoto={props.savePhoto}
                         isOwner={props.isOwner}
                         profile={props.profile}
                         status={props.status}
                         saveProfile={props.saveProfile}
                         updateUserStatus={props.updateUserStatus}/>
            <Row>
                <Col flex="200px">
                    <FollowedUsersBar />
                </Col>
                <Col span={16}>
                    <MyPostsContainer />
                </Col>
            </Row>

        </div>
    )
}

export default Profile;