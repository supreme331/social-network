import React, {ChangeEvent, useEffect, useState} from "react";

type PropsType = {
    status: string
    updateUserStatus: (newStatus: string) => void
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
            <div>
                {!editMode &&
                <div>Status: <span onClick={activateEditMode}>{props.status || "_______________"}</span></div>}
                {editMode &&
                <div><input onChange={onStatusChange} onBlur={deactivateEditMode} autoFocus={true}
                           value={status} /></div>}
            </div>
        )
    }


export default ProfileStatusWithHooks;