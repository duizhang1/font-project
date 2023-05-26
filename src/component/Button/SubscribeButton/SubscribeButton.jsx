import React, { useEffect, useState } from 'react'
import { Button, message } from 'antd'
import { axiosReq } from '@src/util/request/axios'
import PropTypes from 'prop-types'

export default function SubscribeButton (props) {
  const { userId } = props
  const [subscribeLoading, setSubscribeLoading] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  useEffect(() => {
    if (!userId || userId === '') {
      return
    }
    axiosReq.get('/user/getNowUserSubscribe', { userId }).then(
      (value) => {
        if (value.data) {
          setIsSubscribed(value.data.isDel === 1)
        }
      },
      (reason) => {
        message.error(reason.message)
      }
    )
  }, [userId])

  function unsubscribe () {
    setSubscribeLoading(true)
    axiosReq.get('/user/unSubscribeUser', { userId }).then(
      (value) => {
        setSubscribeLoading(false)
        setIsSubscribed(false)
      },
      (reason) => {
        setSubscribeLoading(false)
        message.error(reason.message)
      }
    )
  }

  function subscribe () {
    setSubscribeLoading(true)
    axiosReq.get('/user/subscribeUser', { userId }).then(
      (value) => {
        setSubscribeLoading(false)
        setIsSubscribed(true)
      },
      (reason) => {
        setSubscribeLoading(false)
        message.error(reason.message)
      }
    )
  }

  function isSubscribe () {
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

SubscribeButton.propTypes = {
  userId: PropTypes.any
}
