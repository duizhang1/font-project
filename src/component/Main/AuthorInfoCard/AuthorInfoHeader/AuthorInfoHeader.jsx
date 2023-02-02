import React, { useEffect, useState } from 'react'
import { Avatar, Button, message } from 'antd'
import './AuthorInfoHeader.css'
import { axiosReq } from '@src/util/request/axios'

export default function AuthorInfoHeader(props) {

    const [subscribeLoading, setSubscribeLoading] = useState(false)
    const [isSubscribed, setIsSubscribed] = useState(false)

    const { authorInfo } = props

    function unsubcribe() {
        setSubscribeLoading(true)
        axiosReq.get('/user/unSubscribeUser', { userId: authorInfo.uuid }).then(
            (value) => {
                setSubscribeLoading(false)
                setIsSubscribed(false)
            },
            (reason) => {
                setSubscribeLoading(false)
            }
        )
    }

    function subcribe() {
        setSubscribeLoading(true)
        axiosReq.get('/user/subscribeUser', { userId: authorInfo.uuid }).then(
            (value) => {
                setSubscribeLoading(false)
                setIsSubscribed(true)
            },
            (reason) => {
                setSubscribeLoading(false)
            }
        )
    }

    function isSubscribe() {
        if (subscribeLoading) {
            return (
                <Button loading type="primary" size='middle' style={{ width: '45%' }}>
                    loading
                </Button>
            )
        }
        if (isSubscribed) {
            return (
                <Button type="default" size='middle' style={{ width: '45%' }} onClick={unsubcribe}>
                    已关注
                </Button>
            )
        } else {
            return (
                <Button type="primary" size='middle' style={{ width: '45%' }} onClick={subcribe}>
                    关注
                </Button>
            )
        }
    }

    useEffect(() => {
        axiosReq.get('/user/getNowUserSubscribe', { userId: authorInfo.uuid }).then(
            (value) => {
                if (value.data) {
                    setIsSubscribed(value.data.isDel === 1)
                }
            },
            (reason) => {
                message.error(reason.message)
            }
        )
    })

    return (
        <div style={{ minWidth: '200px' }}>
            <div className='author-header'>
                <Avatar style={{}} alt='头像' size='large' src={authorInfo.avatar} />
                <span className='author-info'>
                    <a href={`/user/${authorInfo.uuid}`}>{authorInfo.username}</a>
                    <span style={{ display: authorInfo.companyName === '' ? 'none' : 'inline' }}>{authorInfo.companyName}</span>
                </span>
            </div>
            <div className='author-button-group'>
                {isSubscribe()}
                <Button size='middle' style={{ width: '45%', marginLeft: '15px' }}>私信</Button>
            </div>
        </div>
    )
}
