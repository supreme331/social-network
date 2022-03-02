import React, {useState} from "react"
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem"
import {InitialStateType} from "../../redux/dialogs-reducer"
import {DialogType} from "../../types/types";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import Message from "./Message/Message";
import {Button, Form, Input} from "antd";

type DialogsPropsType = {
    dialogsPage: InitialStateType
    sendMessage: (dialogId: number, newMessageText: string) => void
    state: Array<DialogType>
}

const Dialogs: React.FC<DialogsPropsType> = (props) => {

    const [isActive, setIsActive] = useState(false)
    const [activeId, setActiveId] = useState(1)

    const setActiveDialog = (id: number) => {
        setIsActive(true)
        setActiveId(id)
    }

    let state = props.dialogsPage.dialogs
    let dialogElements = state
        .map(d => <DialogItem name={d.name} key={d.id} id={d.id} activeId={activeId} setActiveDialog={setActiveDialog}/>)
    return (
        <div className={s.dialogs}>
            <div>
                {dialogElements}
            </div>
            <div>
                <div className={s.messages}>
                    <Messages id={activeId} state={state} />
                </div>
                <div className={s.messageForm}>
                    <AddMessageForm2 id={activeId} sendMessage={props.sendMessage}/>
                </div>
            </div>
        </div>
    )
}

type MessagesPropsType = {
    state: Array<DialogType>
    id: number
}

const Messages: React.FC<MessagesPropsType> = (props) => {
    let dialog = props.state.find(d => d.id === props.id)
    if (dialog) {
        let messagesElements = dialog.messages
            .map(m => <Message message={m.message} key={m.id}/>)
        return (
            <div>
                <div>
                    {messagesElements}
                </div>
            </div>
        )
    } else {
        let messagesElements = <div>Messages is not found</div>
        return (
            <div>
                    {messagesElements}
            </div>
        )
    }
}

// const schema = yup.object().shape({
//     newMessageText: yup.string().max(100)
// })

type AddMessageFormPropsType = {
    sendMessage: (dialogId: number, newMessageText: string) => void
    id: number
}

// const AddMessageForm: React.FC<AddMessageFormPropsType> = (props) => {
//
//     const {register, handleSubmit, formState: {errors}, reset} = useForm(
//         {mode: "onChange", resolver: yupResolver(schema)})
//
//     const onSubmit = (data: { newMessageText: string }) => {
//         props.sendMessage(props.id, data.newMessageText)
//         reset()
//     }
//
//     return <form onSubmit={handleSubmit(onSubmit)}>
//         <div>
//             <textarea placeholder='Enter your message' cols={30} rows={10} {...register("newMessageText")} />
//             <p className={s.error}>{errors.newMessageText?.message}</p>
//         </div>
//         <div>
//             <input type="submit"/>
//         </div>
//     </form>
// }

const AddMessageForm2: React.FC<AddMessageFormPropsType> = (props) => {
    const [form] = Form.useForm()
    const onAddPost = (values: { newMessageText: string }) => {
        props.sendMessage(props.id, values.newMessageText)
    }

    const onFinish = (values: { newMessageText: string }) => {
        onAddPost(values)
        form.resetFields()
        console.log('Received values of form: ', {values})
    }
    return <Form
        form={form}
        size={'middle'}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
        style={{width: '100%'}}
        initialValues={{
            newMessageText: ''
        }}
    >
        <Form.Item name='newMessageText' >
            <Input.TextArea allowClear={true} autoSize={{ minRows: 3, maxRows: 6 }} showCount maxLength={300} placeholder='Enter your message'/>
        </Form.Item>
        <Form.Item >
            <Button type="primary" htmlType="submit">
                Send
            </Button>
        </Form.Item>
    </Form>
}

export default Dialogs