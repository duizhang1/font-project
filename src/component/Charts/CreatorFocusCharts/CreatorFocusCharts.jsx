import React, { useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { Segmented } from 'antd'

const dateChoose = [
  {
    label: '最近7天',
    value: '7'
  },
  {
    label: '最近14天',
    value: '14'
  },
  {
    label: '最近30天',
    value: '30'
  }
]

export default function CreatorFocusCharts () {
  const [date, setDate] = useState('7')

  const option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      // data: ['Email', 'Union Ads', 'Video Ads', 'Directssss', 'Direct', 'Search Engine']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['23-04-27', '23-04-28', '23-04-29', '23-04-30', '23-05-01', '23-05-02', '23-05-03']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '总关注者数',
        type: 'line',
        smooth: true,
        data: [0, 0, 1, 1, 1, 1, 1]
      },
      {
        name: '取消关注数',
        type: 'line',
        smooth: true,
        data: [0, 0, 0, 0, 0, 0, 0]
      },
      {
        name: '新增关注数',
        type: 'line',
        smooth: true,
        data: [0, 0, 1, 0, 0, 0, 0]
      }

    ]
  }

  return (
        <div>
            <Segmented
                size="middle"
                value={date}
                onChange={(e) => {
                  setDate(e.key)
                }}
                options={dateChoose}
                style={{
                  margin: '0 0 15px 0'
                }}
            />
            <ReactECharts option={option} />
        </div>
  )
}
