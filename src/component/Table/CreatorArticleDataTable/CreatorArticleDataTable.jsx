import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import CreatorArticleCharts from '@src/component/Charts/CreatorArticleCharts/CreatorArticleCharts'

const columns = [
  {
    title: '文章标题',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '发布时间',
    dataIndex: 'createTime',
    key: 'createTime'
  },
  {
    title: '阅读数',
    dataIndex: 'readCount',
    key: 'readCount'
  },
  {
    title: '点赞数',
    dataIndex: 'likeCount',
    key: 'likeCount'
  },
  {
    title: '收藏数',
    dataIndex: 'storeCount',
    key: 'storeCount'
  },
  {
    title: '评论数',
    dataIndex: 'commentCount',
    key: 'commentCount'
  }
]

export default function CreatorArticleDataTable () {
  const [page, setPage] = useState(2)
  const [total, setTotal] = useState(10)
  const pageSize = 5
  const dataSource = [
    {
      key: 1,
      title: '阿里云centos7安装RabbitMQ',
      createTime: '2022-06-06 19:25',
      readCount: 55,
      likeCount: 1,
      storeCount: 1,
      commentCount: 2
    },
    {
      key: 2,
      title: 'JUC自定义线程池练习',
      createTime: '2022-06-06 19:25',
      readCount: 55,
      likeCount: 1,
      storeCount: 1,
      commentCount: 2
    },
    {
      key: 3,
      title: 'Eureka服务注册中心以及服务发现',
      createTime: '2022-06-06 19:25',
      readCount: 55,
      likeCount: 1,
      storeCount: 1,
      commentCount: 2
    },
    {
      key: 4,
      title: '前几天在看别人的项目的时候，发现一个问题，简单复现一下这个问题',
      createTime: '2022-06-06 19:25',
      readCount: 55,
      likeCount: 1,
      storeCount: 1,
      commentCount: 2
    }
  ]

  useEffect(() => {
    setTotal(10)
  })

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <CreatorArticleCharts/>
          )
        }}
        pagination={
          {
            current: page,
            pageSize,
            onChange: (page, pageSize) => {
              setPage(page)
            },
            total
          }
        }
      />
    </div>
  )
}
