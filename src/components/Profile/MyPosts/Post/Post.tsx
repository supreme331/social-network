import React from "react";
import s from './Post.module.css';

type PropsType = {
    message: string
    likesCount: number
}

const Post: React.FC<PropsType> = (props) => {
    return <div className={s.item}>
        <img src="https://i.mycdn.me/i?r=AyH4iRPQ2q0otWIFepML2LxRDFBSgrW2Tyx1ySSawCxkbA" alt=""/>
        {props.message}
        <div>
            <span>like</span> {props.likesCount}
        </div>
    </div>

}

export default Post;