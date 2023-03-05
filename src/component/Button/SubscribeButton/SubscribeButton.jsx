import React, { useState } from 'react'
import { Button } from 'antd'
import { axiosReq } from '@src/util/request/axios'

export default function SubscribeButton() {
    const [subscribeLoading, setSubscribeLoading] = useState(false)
    const [isSubscribed, setIsSubscribed] = useState(false)

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

    return (
        <div>SubscribeButton</div>
    )
}
