import React, { useEffect, useState } from 'react'
import { Card } from 'antd'
import CreatorDataItem from '@src/component/Card/CreatorDataItem/CreatorDataItem'
import { axiosReq } from '@src/util/request/axios'

export default function CreatorHome () {
  const [dataList, setDataList] = useState([])

  useEffect(() => {
    axiosReq.get('/creatorData/getHomeCardData').then(
      value => {
        setDataList(value.data)
      }
    )
  }, [])

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
