import React from "react";
import s from '../Dialogs.module.css';
import {NavLink} from "react-router-dom";
import userPhoto from "../../../assets/img/user.png";

type PropsType = {
    name: string
    id: number
    activeId: number
    setActiveDialog: (id: number) => void
}

const DialogItem: React.FC<PropsType> = (props) => {
    let path = "/dialogs/" + props.id
    return (
        <div className={props.activeId === props.id ? s.dialogsItems + ' ' + s.active : s.dialogsItems} onClick={() => props.setActiveDialog(props.id)}>
            <img style={{width: 30}} src={userPhoto} alt="avatar"/>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem;