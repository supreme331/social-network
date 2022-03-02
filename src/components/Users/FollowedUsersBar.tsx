import React, {useEffect, useState} from "react"
import User from "./User"
import {actions, FilterType, follow, requestUsers, unfollow} from "../../redux/users-reducer"
import {useDispatch, useSelector} from "react-redux"
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/users-selectors"
import {useHistory} from "react-router-dom"
import * as queryString from "querystring"
import {Button, Form, Input, Pagination, Select} from 'antd'

type PropsType = {}

type QueryParamsType = { term?: string, page?: string, friend?: string }
export const Users: React.FC<PropsType> = (props) => {

    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const [actualPage, setActualPage] = useState(currentPage)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substring(1)) as QueryParamsType

        let actualFilter = filter

        if(!!parsed.page) setActualPage(+parsed.page)

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
    }, [pageSize])

    useEffect(() => {
        const query: QueryParamsType = {}
        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (actualPage !== 1) query.page = String(actualPage)

        history.push({
            pathname: '/developers',
            search: queryString.stringify(query)
        })
    }, [filter, actualPage])

    const onPageChanged = (pageNumber: number) => {
        console.log('Page: ', pageNumber)
        setActualPage(pageNumber)
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
    const onShowSizeChange = (currentPage: number = 1, pageSize: number) => {
        console.log(currentPage, pageSize)
        dispatch(actions.setPageSize(pageSize))
        dispatch(actions.setCurrentPage(currentPage))
        dispatch(requestUsers(currentPage, pageSize, filter))
    }

    return (
        <div style={{width: 700}}>
            <>
                <Pagination
                    onChange={onPageChanged}
                    showSizeChanger
                    onShowSizeChange={onShowSizeChange}
                    defaultCurrent={currentPage}
                    current={currentPage}
                    total={totalUsersCount}
                    pageSize={pageSize}
                />
                <br />
            </>
            <UsersSearchForm onFilterChanged={onFilterChanged} />
            <div>
                {users.map(u => <User key={u.id} user={u} followingInProgress={followingInProgress}
                                      unfollow={unfollowFunc} follow={followFunc}/>
                )}
            </div>
            <>
                <Pagination
                    onChange={onPageChanged}
                    showSizeChanger
                    onShowSizeChange={onShowSizeChange}
                    defaultCurrent={currentPage}
                    current={currentPage}
                    total={totalUsersCount}
                    pageSize={pageSize}
                />
                <br />
            </>
        </div>
    )
}

type FriendFormType = "true" | "false" | "null"
type UsersSearchFormType = {
    term: string
    friend: FriendFormType
}

type UsersSearchFormPropsType = {
    onFilterChanged: (filter: FilterType) => void
}

const UsersSearchForm: React.FC<UsersSearchFormPropsType> = React.memo((props) => {
    const onFinish = (values: UsersSearchFormType) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true" ? true : false
        }
        props.onFilterChanged(filter)
        console.log('Received values of form: ', values)
    }

    return <Form
        layout="inline"
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
        style={{width: '100%'}}
        initialValues={{ term: "", friend: "null" }}
    >
        <Form.Item name="term">
            <Input />
        </Form.Item>
        <Form.Item name="friend">
            <Select style={{width: 130}}>
                <Select.Option value="null">All</Select.Option>
                <Select.Option value="true">Only followed</Select.Option>
                <Select.Option value="false">Only unfollowed</Select.Option>
            </Select>
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit">
                Find
            </Button>
        </Form.Item>
    </Form>
})