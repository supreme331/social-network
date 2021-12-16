import React from "react";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import s from './ProfileInfo.module.css';
import {ContactsType, GetStringKeys, ProfileType} from "../../../types/types";
import {UseFormRegister} from "react-hook-form/dist/types/form";

type InputPropsType = {
    type: string
    label: string
    name: ProfileDataFormValuesTypeKeys
    register: UseFormRegister<ProfileDataFormValuesType>
}
type ProfileDataFormValuesType = {
    fullName: string
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    contacts: ContactsType
}

type ProfileDataFormValuesTypeKeys = GetStringKeys<ProfileDataFormValuesType>

const Input: React.FC<InputPropsType> = ({ type, label, name, register}) => (
    <>
        <label>{label}</label>
        <input type={type} {...register(name)} />
    </>
);

const schema = yup.object().shape({
    about: yup.string()
});

type ProfileDataFormPropsType = {
    profile: ProfileType
    deActivateEditMode: () => void
    saveProfile: (profile: ProfileType) => void
}

const ProfileDataForm: React.FC<ProfileDataFormPropsType> = ({profile, deActivateEditMode, saveProfile}) => {

    const { register, handleSubmit, formState: {errors} } = useForm(
        {mode: "onBlur",
            defaultValues: {fullName: profile.fullName,
                aboutMe: profile.aboutMe,
                lookingForAJob: profile.lookingForAJob,
                lookingForAJobDescription: profile.lookingForAJobDescription,
                contacts: {
                    facebook: profile.contacts.facebook,
                    website: profile.contacts.website,
                    vk: profile.contacts.vk,
                    twitter: profile.contacts.twitter,
                    instagram: profile.contacts.instagram,
                    youtube: profile.contacts.youtube,
                    github: profile.contacts.github,
                    mainLink: profile.contacts.mainLink,
                }},
            resolver: yupResolver(schema)});

    const onSubmit = (data: ProfileType) => {
        saveProfile(data);
        deActivateEditMode();
    };

    return <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <input type="submit"  value="Save"/>
        </div>
        <Input type="text" label="Full name:" name="fullName" register={register} />
        <Input type="text" label="About me:" name="aboutMe" register={register} />
        <div>Looking for a job:
            <input type={"checkbox"} id={"lookingForAJob"} {...register("lookingForAJob")}/>
        </div>
        <div>
            <span>My professional skills:</span>
            <br/>
            <textarea placeholder='Enter your skills' cols={30} rows={10}
                      {...register("lookingForAJobDescription")} />
        </div>
        <div>Contacts: {Object.keys(profile.contacts).map(key => {
            return <div key={key} className={s.contact}>
                {/*todo: create com solution for embedded objects*/}
                {/*<Input type="text" label={key + ": "} name={"contacts." + key} register={register}/>*/}
            </div>
        })}</div>
    </form>
}

export default ProfileDataForm;