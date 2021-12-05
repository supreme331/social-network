import React from "react";
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

function MyPosts(props) {
    let postsElements = [...props.posts]
        .reverse()
        .map(p => <Post message={p.message} likesCount={p.likesCount} key={p.id}/>)

    return <div className={s.postBlock}>
        <h3>My posts</h3>
        <MyPostsForm {...props}/>
        <div className={s.posts}>
            {postsElements}
        </div>
    </div>
}

const Input = ({label, name, register, required}) => (
    <>
        <label>{label}</label>
        <textarea placeholder='Enter your message' cols="30" rows="10" {...register(name, {required})} />
    </>
);

const schema = yup.object().shape({
    newPostText: yup.string().max(100)
});

const MyPostsForm = (props) => {

    const {register, handleSubmit, formState: {errors}, reset} = useForm(
        {mode: "onChange",resolver: yupResolver(schema)});

    let onAddPost = (newPostText) => {
        props.addPost(newPostText);
    }

    const onSubmit = (data) => {
        onAddPost(data.newPostText);
        reset();
    };

    return <form onSubmit={handleSubmit(onSubmit)}>
        <Input label=""
               id="newPostText"
               name="newPostText"
               register={register}/>
        <p className={s.error}>{errors.newPostText?.message}</p>
        <div>
            <input type="submit"/>
        </div>
    </form>
}

export default MyPosts;