import React from 'react'
import { Card } from 'antd'
import CreatorDataItem from '@src/component/Card/CreatorDataItem/CreatorDataItem'

export default function CreatorHome () {
  const dataList = [
    {
      label: '总粉丝数',
      count: 1,
      beforeChange: '0'
    },
    {
      label: '文章阅读数',
      count: 230,
      beforeChange: '+5'
    },
    {
      label: '文章点赞数',
      count: 3,
      beforeChange: '0'
    },
    {
      label: '文章评论数',
      count: 3,
      beforeChange: '0'
    },
    {
      label: '文章收藏数',
      count: 15,
      beforeChange: '0'
    }
  ]

  return (
        <div>
            <Card
                title={<span style={{}}>数据概览</span>}
                bordered={false}
                style={{
                  width: '100%'
                }}
            >
                <div style={{
                  display: 'flex',
                  flexFlow: 'row wrap'
                }}>
                  {dataList.map(item => {
                    return <CreatorDataItem data={item} key={item.label} />
                  })}
                </div>
            </Card>
        </div>
  )
}
