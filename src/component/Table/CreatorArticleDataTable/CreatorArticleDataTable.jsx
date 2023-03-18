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
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(10)
  const pageSize = 10
  const dataSource = [
    {
      key: 1,
      title: '水水水水水水水水水水水',
      createTime: '2022-06-06 19:25',
      readCount: 55,
      likeCount: 1,
      storeCount: 1,
      commentCount: 2
    },
    {
      key: 2,
      title: '水水水水水水水水水水水',
      createTime: '2022-06-06 19:25',
      readCount: 55,
      likeCount: 1,
      storeCount: 1,
      commentCount: 2
    },
    {
      key: 3,
      title: '水水水水水水水水水水水',
      createTime: '2022-06-06 19:25',
      readCount: 55,
      likeCount: 1,
      storeCount: 1,
      commentCount: 2
    },
    {
      key: 4,
      title: '水水水水水水水水水水水',
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
