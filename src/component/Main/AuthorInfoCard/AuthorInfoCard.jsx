import React, { useState, useEffect } from 'react'
import { Card, message } from 'antd'
import AuthorInfoHeader from './AuthorInfoHeader/AuthorInfoHeader'
import { LikeTwoTone, EyeTwoTone } from '@ant-design/icons'
import './AuthorInfoCard.css'
import PropTypes from 'prop-types'
import { axiosReq } from '@src/util/request/axios'

export default function AuthorInfoCard (props) {
  const { authorInfo } = props

  const [data, setData] = useState({})

  useEffect(() => {
    if (!authorInfo.uuid || authorInfo.uuid === '') {
      return
    }
    axiosReq.get('/user/getUserDetail', { uuid: authorInfo.uuid }).then(
      value => {
        setData(value.data)
      },
      reason => {
        message.error(reason.message)
      }
    )
  }, [authorInfo.uuid])

  return (
        <Card title={<AuthorInfoHeader authorInfo={authorInfo} />}>
            <span className='card-span'><LikeTwoTone style={{ marginRight: '12px' }} />获得点赞 {data.likeCount }</span>
            <span className='card-span'><EyeTwoTone style={{ marginRight: '12px' }} />文章被阅读 {data.readCount }</span>
        </Card>
  )
}

AuthorInfoCard.propTypes = {
  authorInfo: PropTypes.object
}
