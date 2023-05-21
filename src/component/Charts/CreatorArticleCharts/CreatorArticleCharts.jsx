import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { Segmented } from 'antd'
import { axiosReq } from '@src/util/request/axios'

const dateChoose = [
  {
    label: '最近7天',
    value: 7
  },
  {
    label: '最近14天',
    value: 14
  },
  {
    label: '最近30天',
    value: 30
  }
]
const defaultOptions = {
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
      name: '阅读量',
      type: 'line',
      smooth: true,
      data: [0, 32, 10, 13, 90, 23, 21]
    },
    {
      name: '点赞数',
      type: 'line',
      smooth: true,
      data: [0, 18, 19, 23, 29, 33, 30]
    },
    {
      name: '评论数',
      type: 'line',
      smooth: true,
      data: [15, 23, 20, 15, 19, 33, 41]
    },
    {
      name: '收藏数',
      type: 'line',
      smooth: true,
      data: [30, 32, 31, 34, 30, 30, 30]
    }

  ]
}

export default function CreatorArticleCharts (props) {
  const { articleId } = props
  const [date, setDate] = useState(7)

  const [option, setOptions] = useState(defaultOptions)

  useEffect(() => {
    if (articleId && articleId !== '') {
      axiosReq.get('/creatorData/getSingleArticleChartData', { day: date, articleId }).then(
        value => {
          const newOptions = JSON.parse(JSON.stringify(defaultOptions))
          newOptions.xAxis.data = value.data.xaxisData
          newOptions.series = value.data.series
          setOptions(newOptions)
        }
      )
    } else {
      axiosReq.get('/creatorData/getAllArticleChartData', { day: date }).then(
        value => {
          const newOptions = JSON.parse(JSON.stringify(defaultOptions))
          newOptions.xAxis.data = value.data.xaxisData
          newOptions.series = value.data.series
          setOptions(newOptions)
        }
      )
    }
  }, [articleId, date])

  return (
        <div>
            <Segmented
                size="middle"
                onChange={(e) => {
                  setDate(e)
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

CreatorArticleCharts.propTypes = {
  articleId: PropTypes.any
}
