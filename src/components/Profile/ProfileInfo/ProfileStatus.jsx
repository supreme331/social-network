import React from "react";
import s from './ProfileInfo.module.css';

class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode = () => {
        this.setState({
            editMode: true
        });
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateUserStatus(this.state.status);
    }

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div className={s.descriptionBlock}>
                <div>{this.props.profile.fullName}</div>
                <div>{this.props.profile.aboutMe}</div>
                {!this.state.editMode &&
                <div><span onClick={this.activateEditMode}>{this.props.status || "_______________"}</span></div>}
                {this.state.editMode &&
                <div><input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode}
                            value={this.state.status}/></div>}
            </div>
        )
    }
}

export default ProfileStatus;