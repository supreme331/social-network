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
import {NavLink, useHistory} from "react-router-dom"
import * as queryString from "querystring"
import {Avatar, Button, Col, Divider, Form, Input, Pagination, Row, Tooltip, Space, Typography} from 'antd'
import s from "./Users.module.css";
import {UserOutlined} from "@ant-design/icons";

const { Text, Link } = Typography;

type PropsType = {}

type QueryParamsType = { term?: string, page?: string, friend?: string }
export const FollowedUsersBar: React.FC<PropsType> = (props) => {

    const users = useSelector(getUsers)

    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = 1
    const pageSize = 8

    const filter: FilterType = {
        term: '',
        friend: true
    }

    const [actualTotalUsersCount, setActualTotalUsersCount] = useState(totalUsersCount)

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    },[])

    useEffect(() => {
        setActualTotalUsersCount(totalUsersCount)
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [totalUsersCount])


    const followingInProgress = useSelector(getFollowingInProgress)

    // const [actualPage, setActualPage] = useState(currentPage)
    const dispatch = useDispatch()



    // const onPageChanged = (pageNumber: number) => {
    //     console.log('Page: ', pageNumber)
    //     setActualPage(pageNumber)
    //     dispatch(requestUsers(pageNumber, pageSize, filter))
    // }
    // const onFilterChanged = (filter: FilterType) => {
    //     dispatch(requestUsers(1, pageSize, filter))
    // }
    // const followFunc = (userId: number) => {
    //     dispatch(follow(userId, true))
    // }
    // const unfollowFunc = (userId: number) => {
    //     dispatch(unfollow(userId, true))
    // }
    // const onShowSizeChange = (currentPage: number = 1, pageSize: number) => {
    //     console.log(currentPage, pageSize)
    //     dispatch(actions.setPageSize(pageSize))
    //     dispatch(actions.setCurrentPage(currentPage))
    //     dispatch(requestUsers(currentPage, pageSize, filter))
    // }

    return (
        <div>
            {/*<>*/}
            {/*    <Pagination*/}
            {/*        onChange={onPageChanged}*/}
            {/*        showSizeChanger*/}
            {/*        onShowSizeChange={onShowSizeChange}*/}
            {/*        defaultCurrent={currentPage}*/}
            {/*        current={currentPage}*/}
            {/*        total={totalUsersCount}*/}
            {/*        pageSize={pageSize}*/}
            {/*    />*/}
            {/*    <br />*/}
            {/*</>*/}

            <div className={s.followedBar}>
                <NavLink to={'/developers?friend=true'}>
                    <h4 className={s.moreBtn}>Your followed users:</h4>
                </NavLink>
                <Row justify="space-around">
                    {users.map(u => <div key={u.id} className={s.userItem}>
                            <NavLink to={'/profile/' + u.id}>
                                <Col span={24}>
                                    <Tooltip title={u.name}>
                                        <Avatar shape="square" size={80} icon={u.photos.small ? <img src={u.photos.small} alt="avatar"
                                        /> : <UserOutlined />} />
                                        <h4 className={s.userName}>
                                            {u.name}
                                        </h4>
                                    </Tooltip>
                                </Col>
                            </NavLink>

                        </div>
                    )}
                </Row>
                <NavLink to={'/developers?friend=true'}>
                <h4 className={s.moreBtn}>More...</h4>
                </NavLink>
            </div>

            {/*<>*/}
            {/*    <Pagination*/}
            {/*        onChange={onPageChanged}*/}
            {/*        showSizeChanger*/}
            {/*        onShowSizeChange={onShowSizeChange}*/}
            {/*        defaultCurrent={currentPage}*/}
            {/*        current={currentPage}*/}
            {/*        total={totalUsersCount}*/}
            {/*        pageSize={pageSize}*/}
            {/*    />*/}
            {/*    <br />*/}
            {/*</>*/}
        </div>
    )
}

