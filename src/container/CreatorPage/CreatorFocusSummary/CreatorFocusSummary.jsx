import CreatorFocusCharts from '@src/component/Charts/CreatorFocusCharts/CreatorFocusCharts'
import React, { useEffect, useState } from 'react'
import { Card } from 'antd'
import CreatorDataItem from '@src/component/Card/CreatorDataItem/CreatorDataItem'
import { axiosReq } from '@src/util/request/axios'

export default function CreatorFocusSummary () {
  const [dataList, setDataList] = useState([])

  useEffect(() => {
    axiosReq.get('/creatorData/getFocusCardData').then(
      value => {
        setDataList(value.data)
      }
    )
  }, [])
  return (
        <div>
            <Card
                title={<span style={{}}>关注数据</span>}
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
                    return <CreatorDataItem data={item} key={item.label}/>
                  })}
                </div>
                <div style={{
                  fontSize: '17px',
                  margin: '10px 0 15px 0'
                }}
                >
                    数据趋势分析
                </div>
                <div>
                    <CreatorFocusCharts />
                </div>
            </Card>
        </div>
  )
}
