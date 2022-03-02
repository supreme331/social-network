import React from "react";
import * as yup from "yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup"
import s from './ProfileInfo.module.css'
import {ContactsType, GetStringKeys, ProfileType} from "../../../types/types"
import {UseFormRegister} from "react-hook-form/dist/types/form"
import {Button, Input, Form, Checkbox, Divider, Typography} from "antd";
import {FilterType} from "../../../redux/users-reducer";

const {Text} = Typography;

// type InputPropsType = {
//     type: string
//     label: string
//     name: ProfileDataFormValuesTypeKeys
//     register: UseFormRegister<ProfileType>
// }

type ProfileDataFormValuesTypeKeys = GetStringKeys<ProfileType>

// const Input: React.FC<InputPropsType> = ({type, label, name, register}) => (
//     <>
//         <label>{label}</label>
//         <input type={type} {...register(name)} />
//     </>
// )

// const schema = yup.object().shape({
//     about: yup.string(),
//     lookingForAJob: yup.boolean(),
//     lookingForAJobDescription: yup.string()
// });

type ProfileDataFormPropsType = {
    profile: ProfileType
    deActivateEditMode: () => void
    saveProfile: (profile: ProfileType) => void
}

// const ProfileDataForm: React.FC<ProfileDataFormPropsType> = ({profile, deActivateEditMode, saveProfile}) => {
//
//     const {register, handleSubmit, formState: {errors}} = useForm<ProfileType>(
//         {
//             mode: "onBlur",
//             defaultValues: {
//                 fullName: profile.fullName,
//                 aboutMe: profile.aboutMe,
//                 lookingForAJob: profile.lookingForAJob,
//                 lookingForAJobDescription: profile.lookingForAJobDescription,
//                 contacts: {
//                     facebook: profile.contacts.facebook,
//                     website: profile.contacts.website,
//                     vk: profile.contacts.vk,
//                     twitter: profile.contacts.twitter,
//                     instagram: profile.contacts.instagram,
//                     youtube: profile.contacts.youtube,
//                     github: profile.contacts.github,
//                     mainLink: profile.contacts.mainLink,
//                 }
//             },
//             resolver: yupResolver(schema)
//         })
//
//     const onSubmit: SubmitHandler<ProfileType> = (data: ProfileType) => {
//         saveProfile(data)
//         deActivateEditMode()
//     }
//
//     return <form onSubmit={handleSubmit(onSubmit)}>
//         <div>
//             <input type="submit" value="Save"/>
//         </div>
//         <Input type="text" label="Full name:" name="fullName" register={register}/>
//         <Input type="text" label="About me:" name="aboutMe" register={register}/>
//         <div>Looking for a job:
//             <input type={"checkbox"} id={"lookingForAJob"} {...register("lookingForAJob")}/>
//         </div>
//         <div>
//             <span>My professional skills:</span>
//             <br/>
//             <textarea placeholder='Enter your skills' cols={30} rows={10}
//                       {...register("lookingForAJobDescription")} />
//         </div>
//         <div>Contacts: {Object.keys(profile.contacts).map(key => {
//             if (key === "vk" || "github" || "facebook" || "instagram" || "twitter" || "website" || "youtube" || "mainLink") {
//                 // @ts-ignore
//                 const name: ProfileDataFormValuesTypeKeys = "contacts." + key
//                 // @ts-ignore
//                 return <div key={key} className={s.contact}>
//                     {/*<label>{key + ": "}</label>*/}
//                     {/*<input type={"text"} {...register(name)} />*/}
//                     <Input type="text" label={key + ": "} name={name} register={register}/>
//                 </div>
//             }
//         })}</div>
//     </form>
// }


const ProfileDataForm2: React.FC<ProfileDataFormPropsType> = ({profile, deActivateEditMode, saveProfile}) => {

    // const {register, handleSubmit, formState: {errors}} = useForm<ProfileType>(
    //     {
    //         mode: "onBlur",
    //         defaultValues: {
    //             fullName: profile.fullName,
    //             aboutMe: profile.aboutMe,
    //             lookingForAJob: profile.lookingForAJob,
    //             lookingForAJobDescription: profile.lookingForAJobDescription,
    //             contacts: {
    //                 facebook: profile.contacts.facebook,
    //                 website: profile.contacts.website,
    //                 vk: profile.contacts.vk,
    //                 twitter: profile.contacts.twitter,
    //                 instagram: profile.contacts.instagram,
    //                 youtube: profile.contacts.youtube,
    //                 github: profile.contacts.github,
    //                 mainLink: profile.contacts.mainLink,
    //             }
    //         },
    //         resolver: yupResolver(schema)
    //     })

    // const onSubmit: SubmitHandler<ProfileType> = (data: ProfileType) => {
    //     saveProfile(data)
    //     deActivateEditMode()
    // }

    const onFinish = (values: any) => {
        const {fullName, aboutMe, lookingForAJob, lookingForAJobDescription, facebook, website, vk, twitter, instagram, youtube, github, mainLink} = values
        values = {fullName, aboutMe, lookingForAJob, lookingForAJobDescription, contacts: {facebook, website, vk, twitter, instagram, youtube, github, mainLink}}
        // @ts-ignore
        saveProfile(values)
        deActivateEditMode()
        // @ts-ignore
        console.log('Received values of form: ', {fullName, aboutMe, lookingForAJob, lookingForAJobDescription, contacts: {facebook, website, vk, twitter, instagram, youtube, github, mainLink}})
    }

    return <Form
        size={'small'}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
        style={{width: '100%'}}
        initialValues={{
            fullName: profile.fullName,
            aboutMe: profile.aboutMe,
            lookingForAJob:profile.lookingForAJob,
            lookingForAJobDescription: profile.lookingForAJobDescription,

                facebook: profile.contacts.facebook,
                website: profile.contacts.website,
                vk: profile.contacts.vk,
                twitter: profile.contacts.twitter,
                instagram: profile.contacts.instagram,
                youtube: profile.contacts.youtube,
                github: profile.contacts.github,
                mainLink: profile.contacts.mainLink,

        }}
    >
        <Divider />
        <Form.Item className={s.profileFormInput} label="Full name:" >
            <Form.Item name="fullName" noStyle>
            <Input />
            </Form.Item>
        </Form.Item>
        <Form.Item className={s.profileFormInput} label="About me:" >
            <Form.Item name="aboutMe" noStyle>
                <Input />
            </Form.Item>
        </Form.Item>
        <Form.Item className={s.profileFormInput} label="Looking for a job: " name="lookingForAJob" valuePropName="checked" wrapperCol={{ span: 24 }}>
            <Checkbox></Checkbox>
        </Form.Item>
        <span>My professional skills:</span>
        <Form.Item className={s.profileFormInput} name="lookingForAJobDescription" >
            <Input.TextArea placeholder='Enter your skills'/>
        </Form.Item>
        <div>Contacts: {Object.keys(profile.contacts).map(key => {
            if (key === "vk" || "github" || "facebook" || "instagram" || "twitter" || "website" || "youtube" || "mainLink") {
                // @ts-ignore
                const name: ProfileDataFormValuesTypeKeys = "contacts." + key
                // @ts-ignore
                return <div key={key} className={s.contact}>
                    <Form.Item className={s.profileFormInput} label={key + ": "} >
                        <Form.Item name={key} noStyle>
                            <Input />
                        </Form.Item>
                    </Form.Item>
                </div>
            }
        })}</div>
        <Form.Item >
            <Button type="primary" htmlType="submit">
                Save
            </Button>
        </Form.Item>
    </Form>


}


export default ProfileDataForm2