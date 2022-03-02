import React from "react"
import s from './MyPosts.module.css'
import Post from "./Post/Post"
import {PostType} from "../../../types/types";
import {Button, Divider, Form, Input} from "antd";

export type MapPropsType = {
    posts: Array<PostType>
}
export type DispatchPropsType = {
    addPost: (newPostText: string) => void
    setLiked: (postId: number) => void
    setUnLiked: (postId: number) => void
    deletePost: (postId: number) => void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    const onSetLiked = (id: number) => {
        props.setLiked(id)
    }
    const onSetUnLiked = (id: number) => {
        props.setUnLiked(id)
    }
    const onDeletePost = (id: number) => {
        props.deletePost(id)
    }
    let postsElements = [...props.posts]
        .reverse()
        .map(p => <Post deletePost={onDeletePost} setLiked={onSetLiked} setUnLiked={onSetUnLiked} message={p.message} likesCount={p.likesCount} isLiked={p.isLiked} id={p.id} key={p.id}/>)

    return <div className={s.postBlock}>
        <Divider />
        <h3>My posts</h3>
        <MyPostsForm addPost={props.addPost}/>
        <Divider/>
        <div className={s.posts}>
            {postsElements}
        </div>
    </div>
}

type MyPostFormPropsType = {
    addPost: (newPostText: string) => void
}
type AddPostValuesType = {
    newPostText: string
}
const MyPostsForm: React.FC<MyPostFormPropsType> = (props) => {
    const [form] = Form.useForm()
    const onAddPost = (values: AddPostValuesType) => {
        props.addPost(values.newPostText)
    }

    const onFinish = (values: {newPostText: string}) => {
        onAddPost(values)
        form.resetFields()
    }
    return <Form
        form={form}
        size={'middle'}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
        style={{width: '100%'}}
        initialValues={{
            newPostText: ''
        }}
    >
        <Form.Item name='newPostText' >
            <Input.TextArea allowClear={true} autoSize={{ minRows: 3, maxRows: 6 }} showCount maxLength={300} placeholder='Enter your message'/>
        </Form.Item>
        <Form.Item >
            <Button type="primary" htmlType="submit">
                Send
            </Button>
        </Form.Item>
    </Form>
}

export default MyPosts