import React, {useEffect, useRef, useState} from "react";
import {ChatMessageAPIType} from "../../api/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {AppStateType} from "../../redux/redux-store";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {CloseOutlined, WechatOutlined} from "@ant-design/icons";
import {Button, Col, Divider, Row, Tooltip} from "antd";
import TextArea from "antd/lib/input/TextArea";
import userPhoto from "../../assets/img/user.png";
import s from "./Chat.module.css";
import {NavLink} from "react-router-dom";


const ChatPage: React.FC = () => {
    return <div>
            <Chat/>
    </div>
}

const Chat: React.FC = () => {
    const [isChatMinimized, setIsChatMinimized] = useState(true)
    const dispatch = useDispatch()
    const status = useSelector((state: AppStateType) => state.chat.status)
    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return <div>
        {status === 'error' && <div>Some error occured. Please refresh the page.</div>}
        {isChatMinimized ? <div className={s.openChatButton} >
                <Tooltip title="Chat">
                    <Button type="primary" onClick={() => {
                        setIsChatMinimized(false)
                    }} size={'large'} icon={<WechatOutlined />}>Chat
                    </Button>
                </Tooltip>
            </div> :
            <div className={s.chat}>
                <div className={s.minimizeChatButton}>
                    <Tooltip title="Minimize chat">
                        <Button type="primary" onClick={() => {
                            setIsChatMinimized(true)
                        }} size={'small'} icon={<CloseOutlined />}>
                        </Button>
                    </Tooltip>
                </div>
                <Messages/>
                <AddMessageForm/>
            </div>}

    </div>
}

const Messages: React.FC<{}> = ({}) => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)
    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        let element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 150) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }
    useEffect(() => {
        if (isAutoScroll)
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages])
    return <div className={s.messagesBlock} onScroll={scrollHandler}>
        {messages.map((m, index) => <Message key={m.id} message={m}/>)}
        <div ref={messagesAnchorRef}></div>
    </div>
}

const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(({message}) => {
    return <div className={s.messageBlock}>
    <Row>
            <Col className={s.chatPhoto} span={5}>
                <NavLink to={'/profile/' + message.userId}>
                    <img src={message.photo ? message.photo : userPhoto}/>
                </NavLink>
            </Col>
            <Col className={s.chatMessage} span={19}>
                <b>{message.userName}</b>
                <div>
                    {message.message}
                </div>
            </Col>
        </Row>
    </div>
})

const AddMessageForm: React.FC<{}> = ({}) => {

    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const status = useSelector((state: AppStateType) => state.chat.status)


    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }
    return <div className={s.chatMessageForm}>
    <Row  align="middle">
        <Col span={18}>
            <TextArea className={s.chatMessageFormInputs} maxLength={100} onPressEnter={sendMessageHandler} onChange={(e) => setMessage(e.currentTarget.value)} value={message}></TextArea>
        </Col>
        <Col span={6}>
            <Button className={s.chatMessageFormInputs} type="primary" disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</Button>
        </Col>
        </Row>
    </div>
}

export default withAuthRedirect(ChatPage)