import React, {useEffect} from "react"
import Paginator from "../common/Paginator/Paginator"
import User from "./User"
import {GetStringKeys} from "../../types/types"
import {UseFormRegister} from "react-hook-form/dist/types/form"
import {SubmitHandler, useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import {FilterType, follow, requestUsers, unfollow} from "../../redux/users-reducer"
import {useDispatch, useSelector} from "react-redux"
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/users-selectors"
import {useHistory} from "react-router-dom";
import * as queryString from "querystring";
import {Input as I, Select } from 'antd';

const { Search } = I
const { Option } = Select

type PropsType = {}

type QueryParamsType = { term?: string, page?: string, friend?: string };
export const Users: React.FC<PropsType> = (props) => {

    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substring(1)) as QueryParamsType

        let actualPage = currentPage
        let actualFilter = filter

        if(!!parsed.page) actualPage = +parsed.page

        if (parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}

        switch (parsed.friend) {
            case "null":
                actualFilter = {...actualFilter, friend: null}
                break
            case "true":
                actualFilter = {...actualFilter, friend: true}
                break
            case "false":
                actualFilter = {...actualFilter, friend: false}
                break
        }
        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        const query: QueryParamsType = {}
        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)

        history.push({
            pathname: '/developers',
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }
    const followFunc = (userId: number) => {
        dispatch(follow(userId))
    }
    const unfollowFunc = (userId: number) => {
        dispatch(unfollow(userId))
    }

    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged} />
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                       totalItemsCount={totalUsersCount} pageSize={pageSize}/>
            <div>
                {users.map(u => <User key={u.id} user={u} followingInProgress={followingInProgress}
                                      unfollow={unfollowFunc} follow={followFunc}/>
                )}
            </div>
        </div>
    )
}

type InputPropsType = {
    type: string
    label: string
    name: UsersSearchFormValuesTypeKeys
    register: UseFormRegister<UsersSearchFormType>
}
type FriendFormType = "true" | "false" | "null"
type UsersSearchFormType = {
    term: string
    friend: FriendFormType
}

type UsersSearchFormValuesTypeKeys = GetStringKeys<UsersSearchFormType>

const Input: React.FC<InputPropsType> = ({type, label, name, register}) => (
    <>
        <label>{label}</label>
        <input type={type} {...register(name)} />
    </>
)

const schema = yup.object().shape({
    about: yup.string(),
    lookingForAJob: yup.boolean(),
    lookingForAJobDescription: yup.string()
});

type UsersSearchFormPropsType = {
    onFilterChanged: (filter: FilterType) => void
}

const UsersSearchForm: React.FC<UsersSearchFormPropsType> = React.memo((props) => {
    const filter = useSelector(getUsersFilter)
    const {register, setValue, handleSubmit, formState: {errors}} = useForm<UsersSearchFormType>(
        {
            mode: "onBlur",
            defaultValues: {},
            resolver: yupResolver(schema)
        })
    useEffect(() => {
        setValue("term", filter.term)
        setValue("friend", String(filter.friend) as FriendFormType )
    },[filter])


    const onSubmit: SubmitHandler<UsersSearchFormType> = (data: UsersSearchFormType) => {
        const filter: FilterType = {
            term: data.term,
            friend: data.friend === "null" ? null : data.friend === "true" ? true : false
        }
        props.onFilterChanged(filter)
    }
    return <form onSubmit={handleSubmit(onSubmit)}>
        {/*<I.Group compact>*/}
        {/*    <I placeholder="input with clear icon" onPressEnter={undefined} allowClear/>*/}
        {/*    <Select defaultValue="null" >*/}
        {/*        <Option value="null">All</Option>*/}
        {/*        <Option value="true">Only followed</Option>*/}
        {/*        <Option value="false">Only unfollowed</Option>*/}
        {/*    </Select>*/}
        {/*</I.Group>*/}
        {/*<input type="text" {...register("term")} />*/}
        <Input type="text" label="" name="term" register={register}/>
        <select {...register("friend")}>
            <option value="null">All</option>
            <option value="true">Only followed</option>
            <option value="false">Only unfollowed</option>
        </select>
        <input type="submit" value="Find"/>
    </form>
})