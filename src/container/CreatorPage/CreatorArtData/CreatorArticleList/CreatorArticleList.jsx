import PropTypes from 'prop-types'
import CreatorArticleItem from '@src/component/ListItem/CreatorArticleItem/CreatorArticleItem'
import React, { useEffect, useState } from 'react'
import { axiosReq } from '@src/util/request/axios'
import { message, Empty } from 'antd'

export default function CreatorArticleList (props) {
  const { type, current, size, setTotal } = props

  const [data, setData] = useState([])

  useEffect(() => {
    refreshData()
  }, [type, current])

  function refreshData () {
    axiosReq.get('/article/getArticleByApproveState', { approveState: type, current, size }).then(
      value => {
        setData(value.data.data)
        setTotal(value.data.total)
      },
      reason => {
        message.error(reason.message)
      }
    )
  }

  return (
    <div>
      {data.length > 0
        ? data.map((item) => {
          return (
          <CreatorArticleItem data={item} key={item.uuid} afterDelete={refreshData}/>
          )
        })
        : (<Empty description={'暂无文章'}/>)}
    </div>
  )
}

CreatorArticleList.propTypes = {
  current: PropTypes.any,
  setTotal: PropTypes.any,
  size: PropTypes.any,
  type: PropTypes.array
}
