import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import CreatorArticleCharts from '@src/component/Charts/CreatorArticleCharts/CreatorArticleCharts'
import { axiosReq } from '@src/util/request/axios'

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
  const pageSize = 5
  const [data, setData] = useState([])

  useEffect(() => {
    axiosReq.get('/article/getApproveArticleData', { current: page, size: pageSize }).then(
      value => {
        setData(value.data.data)
        setTotal(value.data.total)
      }
    )
  }, [page])

  return (
    <div>
      <Table
        dataSource={data}
        columns={columns}
        rowKey={(record) => record.uuid}
        expandable={{
          expandedRowRender: (record) => (
            <CreatorArticleCharts key={record.uuid} articleId={record.uuid}/>
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
