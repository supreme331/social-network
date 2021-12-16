import React from "react"
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem"
import Message from "./Message/Message"
import {useForm} from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import {InitialStateType} from "../../redux/dialogs-reducer"

type PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (newMessageText: string) => void
}

const Dialogs: React.FC<PropsType> = (props) => {
    let state = props.dialogsPage

    let dialogElements = state.dialogs
        .map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>)

    let messagesElements = state.messages
        .map(m => <Message message={m.message} key={m.id}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
            <AddMessageForm sendMessage={props.sendMessage}/>
        </div>
    )
}

const schema = yup.object().shape({
    newMessageText: yup.string().max(100)
})

type AddMessageFormPropsType = {
    sendMessage: (newMessageText: string) => void
}


const AddMessageForm: React.FC<AddMessageFormPropsType> = (props) => {

    const {register, handleSubmit, formState: {errors}, reset} = useForm(
        {mode: "onChange",resolver: yupResolver(schema)})

    let sendMessage = (newMessageText: string) => {
        props.sendMessage(newMessageText)
    }

    const onSubmit = (data: {newMessageText: string}) => {
        sendMessage(data.newMessageText)
        reset()
    }

    return <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <textarea placeholder='Enter your message' cols={30} rows={10} {...register("newMessageText")} />
            <p className={s.error}>{errors.newMessageText?.message}</p>
        </div>
        <div>
            <input type="submit"/>
        </div>
    </form>
}

export default Dialogs