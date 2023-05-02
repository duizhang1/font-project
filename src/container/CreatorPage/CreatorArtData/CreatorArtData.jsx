import React, { useState } from 'react'

import { Tabs, Pagination } from 'antd'
import './CreatorArtData.css'
import CreatorArticleList from './CreatorArticleList/CreatorArticleList'

export default function CreatorArtData () {
  const pageSize = 5
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(pageSize)

  const [approveState, setApproveState] = useState([0, 1, 2, 3])

  const onChange = (key) => {
    if (key === '1') {
      setApproveState([0, 1, 2, 3])
      setPage(1)
    } else if (key === '2') {
      setApproveState([2])
      setPage(1)
    } else if (key === '3') {
      setApproveState([0, 1])
      setPage(1)
    } else if (key === '4') {
      setApproveState([3])
      setPage(1)
    }
  }

  return (
        <div className='creator-article-data-div'>
            <Tabs
                defaultActiveKey="1"
                onChange={onChange}
                items={[
                  {
                    label: (<span className='creator-article-data-tabs-span'>全部</span>),
                    key: '1'
                  },
                  {
                    label: (<span className='creator-article-data-tabs-span'>已发布</span>),
                    key: '2'
                  },
                  {
                    label: (<span className='creator-article-data-tabs-span'>审核中</span>),
                    key: '3'
                  },
                  {
                    label: (<span className='creator-article-data-tabs-span'>未通过</span>),
                    key: '4'
                  }
                ]}
            />
            <CreatorArticleList type={approveState} current={page} size={pageSize} setTotal={setTotal}/>
            <div className='creator-article-data-page'>
                <Pagination
                    current={page}
                    pageSize={pageSize}
                    onChange={(page, pageSize) => {
                      setPage(page)
                    }}
                    total={total}
                />
            </div>
        </div>
  )
}
