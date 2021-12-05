import React from "react";
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";


const Dialogs = (props) => {

    let dialogElements = props.messagesPage.dialogs
        .map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>);

    let messagesElements = props.messagesPage.messages
        .map(m => <Message message={m.message} key={m.id}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
            <AddMessageForm {...props}/>
        </div>
    )
}

const Input = ({label, name, register, required}) => (
    <>
        <label>{label}</label>
        <textarea placeholder='Enter your message' cols="30" rows="10" {...register(name, {required})} />
    </>
);

const schema = yup.object().shape({
    newMessageText: yup.string().max(100)
});

const AddMessageForm = (props) => {

    const {register, handleSubmit, formState: {errors}, reset} = useForm(
        {mode: "onChange",resolver: yupResolver(schema)});

    let sendMessage = (newMessageText) => {
        props.sendMessage(newMessageText);
    }

    const onSubmit = (data) => {
        console.log(data);
        sendMessage(data.newMessageText);
        reset();
    };

    return <form onSubmit={handleSubmit(onSubmit)}>

        <Input label=""
               id="newMessageText"
               name="newMessageText"
               register={register}
               required/>
        <p className={s.error}>{errors.newMessageText?.message}</p>
        <div>
            <input type="submit"/>
        </div>
    </form>
}

export default Dialogs;