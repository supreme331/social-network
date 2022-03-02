import React from "react";
import {actions} from "../../../redux/profile-reducer";
import MyPosts, {DispatchPropsType, MapPropsType} from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";


let mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts
    }
}

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(
    mapStateToProps, {addPost: actions.addPostAC, setLiked: actions.setLiked, setUnLiked: actions.setUnLiked, deletePost: actions.deletePostAC})(MyPosts);

export default MyPostsContainer;