import CreatorFocusCharts from '@src/component/Charts/CreatorFocusCharts/CreatorFocusCharts'
import React from 'react'
import { Card } from 'antd'
import CreatorDataItem from '@src/component/Card/CreatorDataItem/CreatorDataItem'

export default function CreatorFocusSummary () {
  const dataList = [
    {
      label: '总关注者',
      count: 1,
      beforeChange: '0'
    },
    {
      label: '新增关注者',
      count: 0,
      beforeChange: '0'
    },
    {
      label: '取消关注',
      count: 0,
      beforeChange: '0'
    }
  ]

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
