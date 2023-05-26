import React, { useEffect, useState } from 'react'
import { Card, message } from 'antd'
import { LikeTwoTone, EyeTwoTone, ApiTwoTone, HeartTwoTone, FireTwoTone } from '@ant-design/icons'
import { axiosReq } from '@src/util/request/axios'
import { useParams } from 'react-router-dom'

export default function UserRightBox () {
  const { userId } = useParams()
  const [data, setData] = useState({})

  useEffect(() => {
    if (!userId || userId === '') {
      return
    }
    axiosReq.get('/user/getUserDetail', { uuid: userId }).then(
      value => {
        setData(value.data)
      },
      reason => {
        message.error(reason.message)
      }
    )
  }, [userId])

  return (
    <div style={{
      margin: '0 0 0 15px'
    }}>
      <Card
        title={<span style={{
          fontWeight: '600',
          color: '#31445b',
          fontSize: '15px'
        }}>个人总结</span>}
        style={{
          maxWidth: 300,
          minWidth: 250
        }}
      >
        <div>
          <ApiTwoTone style={{ fontSize: '18px' }}/>
          <span style={{ fontSize: '16px', paddingLeft: '5px' }}>加入于 {data.createTime}</span>
        </div>
        <div style={{ marginTop: '12px' }}>
          <LikeTwoTone style={{ fontSize: '18px' }}/>
          <span style={{ fontSize: '16px', paddingLeft: '5px' }}>文章被点赞 {data.likeCount} 次</span>
        </div>
        <div style={{ marginTop: '12px' }}>
          <EyeTwoTone style={{ fontSize: '18px' }}/>
          <span style={{ fontSize: '16px', paddingLeft: '5px' }}>文章被阅读 {data.readCount} 次</span>
        </div>
        <div style={{ marginTop: '12px' }}>
          <HeartTwoTone style={{ fontSize: '18px' }}/>
          <span style={{ fontSize: '16px', paddingLeft: '5px' }}>关注了 {data.followingCount} 人</span>
        </div>
        <div style={{ marginTop: '12px' }}>
          <FireTwoTone style={{ fontSize: '18px' }}/>
          <span style={{ fontSize: '16px', paddingLeft: '5px' }}>被关注 {data.followerCount} 人</span>
        </div>
      </Card>
    </div>
  )
}
