import React from "react";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import s from './ProfileInfo.module.css';

const Input = ({ type, label, name, register, required }) => (
    <>
        <label>{label}</label>
        <input type={type} {...register(name, { required })} />
        <div></div>
    </>
);

const schema = yup.object().shape({
    about: yup.string()
});

const LoginForm = ({login, isWrongAuth, message}) => {

    const { register, handleSubmit, formState: {errors} } = useForm(
        {mode: "onBlur", resolver: yupResolver(schema)});

    const onSubmit = (data) => {
        login(data.email, data.password, data.rememberMe);
    };

    return <form onSubmit={handleSubmit(onSubmit)}>

        <div>
            <Input label="Email" id="email" name="email" register={register} required />
        </div>
        <p className={s.error}>{errors.email?.message}</p>
        <div>
            <Input type={"password"} label="Password"
                   id={"password"} name={"password"} register={register} required />
        </div>
        <p className={s.error}>{errors.password?.message}</p>
        {isWrongAuth && <p className={s.error}>{message}</p>}
        <div>
            <input type={"checkbox"} id={"rememberMe"} {...register("rememberMe")}/> remember me
        </div>
        <div>
            <input type="submit" />
        </div>
    </form>
}

const ProfileDataForm = ({profile, deActivateEditMode, saveProfile}) => {

    const { register, handleSubmit, formState: {errors} } = useForm(
        {mode: "onBlur",
            defaultValues: {fullName: profile.fullName,
                aboutMe: profile.aboutMe,
                lookingForAJob: profile.lookingForAJob,
                lookingForAJobDescription: profile.lookingForAJobDescription, contacts: {
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

    const onSubmit = (data) => {
        saveProfile(data);
        deActivateEditMode();
    };

    return <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <input type="submit"  value="Save"/>
        </div>
        <Input label="Full name:" id="fullName" name="fullName" register={register} />
        <Input label="About me:" id="aboutMe" name="aboutMe" register={register} />
        <div>Looking for a job:
            <input type={"checkbox"} id={"lookingForAJob"} {...register("lookingForAJob")}/>
        </div>
        <div>
            <span>My professional skills:</span>
            <br/>
            <textarea placeholder='Enter your skills' cols="30" rows="10"
                      id="lookingForAJobDescription" name="lookingForAJobDescription"
                      {...register("lookingForAJobDescription")} />
        </div>
        <div>Contacts: {Object.keys(profile.contacts).map(key => {
            return <div key={key} className={s.contact}>
                <Input label={key + ": "} id="fullName" name={"contacts." + key} register={register}/>
            </div>
        })}</div>
    </form>
}

export default ProfileDataForm;