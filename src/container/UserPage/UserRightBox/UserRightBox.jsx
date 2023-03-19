import React, { useEffect } from 'react'
import { Card } from 'antd'
import { LikeTwoTone, EyeTwoTone, ApiTwoTone, HeartTwoTone, FireTwoTone } from '@ant-design/icons'

export default function UserRightBox () {
  const data = {
    likenumber: 99111111,
    looknumber: 88,
    birthday: '2022-06-27',
    subscribe: 99,
    beSubscribe: 88
  }
  useEffect(() => {

  })

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
          <span style={{ fontSize: '16px', paddingLeft: '5px' }}>加入于 {data.birthday}</span>
        </div>
        <div style={{ marginTop: '12px' }}>
          <LikeTwoTone style={{ fontSize: '18px' }}/>
          <span style={{ fontSize: '16px', paddingLeft: '5px' }}>文章被点赞 {data.likenumber} 次</span>
        </div>
        <div style={{ marginTop: '12px' }}>
          <EyeTwoTone style={{ fontSize: '18px' }}/>
          <span style={{ fontSize: '16px', paddingLeft: '5px' }}>文章被阅读 {data.looknumber} 次</span>
        </div>
        <div style={{ marginTop: '12px' }}>
          <HeartTwoTone style={{ fontSize: '18px' }}/>
          <span style={{ fontSize: '16px', paddingLeft: '5px' }}>关注了 {data.subscribe} 人</span>
        </div>
        <div style={{ marginTop: '12px' }}>
          <FireTwoTone style={{ fontSize: '18px' }}/>
          <span style={{ fontSize: '16px', paddingLeft: '5px' }}>被关注 {data.beSubscribe} 人</span>
        </div>
      </Card>
    </div>
  )
}
