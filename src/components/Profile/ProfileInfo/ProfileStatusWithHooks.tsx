import React, {ChangeEvent, useEffect, useState} from "react";
import {Input} from 'antd'
import s from './ProfileInfo.module.css';

type PropsType = {
    status: string
    updateUserStatus: (newStatus: string) => void
    isOwner: boolean
}


const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateUserStatus(status);
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }
        return (
            <div>{props.isOwner &&
            !editMode &&
                <div className={s.ownerStatusBody} onClick={activateEditMode}><span>{props.status || "Set status"}</span></div>}
            {editMode &&
                <div>
            {/*<input onChange={onStatusChange} onBlur={deactivateEditMode} autoFocus={true}*/}
            {/*       value={status} />*/}
                <Input onChange={onStatusChange}
                onPressEnter={deactivateEditMode}
                onBlur={deactivateEditMode}
                value={status}
                placeholder="What's new?"
                autoFocus={true}/>
                </div>
            }
                {
                    !props.isOwner && <div><span>{props.status || "Set status"}</span></div>
                }

            </div>
        )
    }


export default ProfileStatusWithHooks;