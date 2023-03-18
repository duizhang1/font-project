import React from 'react'
import { Card } from 'antd'
import CreatorDataItem from '@src/component/Card/CreatorDataItem/CreatorDataItem'

export default function CreatorHome () {
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
                    <CreatorDataItem />
                    <CreatorDataItem />
                    <CreatorDataItem />
                    <CreatorDataItem />
                    <CreatorDataItem />
                    <CreatorDataItem />
                </div>
            </Card>
        </div>
  )
}
