import React from "react";
import s from './Post.module.css';
import userPhoto from "../../../../assets/img/user.png";
import {Button, Col, Divider, Row, Typography} from "antd";
import {LikeOutlined, LikeFilled, CloseOutlined} from "@ant-design/icons";

const {Text} = Typography

type PropsType = {
    setLiked: (postId: number) => void
    setUnLiked: (postId: number) => void
    deletePost: (postId: number) => void
    message: string
    likesCount: number
    isLiked: boolean
    id: number
}

const Post: React.FC<PropsType> = (props) => {
    return <div>
        <Row className={s.item}>
            <Col flex="60px">
                <img src={userPhoto} alt=""/>
            </Col>
            <Col flex="310px">
                <div className={s.messageText}>
                    <Text>{props.message}</Text>
                </div>
                <div>
                    {props.isLiked ? <Button size="small" shape="round" icon={<LikeFilled className={s.likeUnlikeIcon}/>} onClick={() => props.setUnLiked(props.id)}>
                            <span className={s.likesCount}>{props.likesCount}</span></Button>
                    : <Button size="small" shape="round" icon={<LikeOutlined className={s.likeUnlikeIcon}/>} onClick={() => props.setLiked(props.id)}>
                            <span className={s.likesCount}>{props.likesCount}</span></Button>}
                </div>
            </Col>
            <Col>
                <CloseOutlined className={s.removeIcon} onClick={() => props.deletePost(props.id)}/>
            </Col>
        </Row>
        <Divider/>
    </div>


}

export default Post;