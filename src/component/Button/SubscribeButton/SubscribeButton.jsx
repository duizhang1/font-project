import React, {useEffect, useState} from 'react'
import {Button, message} from 'antd'
import { axiosReq } from '@src/util/request/axios'

export default function SubscribeButton(props) {
    const {userId} = props
    const [subscribeLoading, setSubscribeLoading] = useState(false)
    const [isSubscribed, setIsSubscribed] = useState(false)

    useEffect(()=>{
        axiosReq.get('/user/getNowUserSubscribe', { userId: userId }).then(
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

    function unsubscribe() {
        setSubscribeLoading(true)
        axiosReq.get('/user/unSubscribeUser', { userId: userId }).then(
            (value) => {
                setSubscribeLoading(false)
                setIsSubscribed(false)
            },
            (reason) => {
                setSubscribeLoading(false)
            }
        )
    }

    function subscribe() {
        setSubscribeLoading(true)
        axiosReq.get('/user/subscribeUser', { userId: userId }).then(
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
                <Button loading type="primary" size='middle' style={{ width: '90px' }}>
                    loading
                </Button>
            )
        }
        if (isSubscribed) {
            return (
                <Button type="default" size='middle' style={{ width: '90px' }} onClick={unsubscribe}>
                    已关注
                </Button>
            )
        } else {
            return (
                <Button type="primary" size='middle' style={{ width: '90px  ' }} onClick={subscribe}>
                    关注
                </Button>
            )
        }
    }

    return (
      isSubscribe()
    )
}
