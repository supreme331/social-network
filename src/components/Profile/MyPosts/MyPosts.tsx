import React from "react"
import s from './MyPosts.module.css'
import Post from "./Post/Post"
import {useForm} from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import {PostType} from "../../../types/types";

export type MapPropsType = {
    posts: Array<PostType>
}
export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    let postsElements = [...props.posts]
        .reverse()
        .map(p => <Post message={p.message} likesCount={p.likesCount} key={p.id}/>)

    return <div className={s.postBlock}>
        <h3>My posts</h3>
        <MyPostsForm addPost={props.addPost}/>
        <div className={s.posts}>
            {postsElements}
        </div>
    </div>
}

const schema = yup.object().shape({
    newPostText: yup.string().max(100)
});

type MyPostFormPropsType = {
    addPost: (newPostText: string) => void
}
type AddPostValuesType = {
    newPostText: string
}
const MyPostsForm: React.FC<MyPostFormPropsType> = (props) => {

    const {register, handleSubmit, formState: {errors}, reset} = useForm(
        {mode: "onChange",resolver: yupResolver(schema)});

    let onAddPost = (values: AddPostValuesType) => {
        props.addPost(values.newPostText)
    }

    const onSubmit = (data: {newPostText: string}) => {
        onAddPost(data)
        reset()
    }

    return <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <textarea placeholder='Enter your message' cols={30} rows={10} {...register("newPostText")} />
        </div>
        <p className={s.error}>{errors.newPostText?.message}</p>
        <div>
            <input type="submit"/>
        </div>
    </form>
}

export default MyPosts