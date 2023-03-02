import NotificationFocusItem from '@src/component/ListItem/NotificationFocusItem/NotificationFocusItem'
import React, {useEffect,useState} from 'react'
import {Empty, message, Pagination} from 'antd'
import {axiosReq} from "@src/util/request/axios";

export default function NotificationFocus() {

  const [current, setCurrent] = useState(1)
  const [total, setTotal] = useState(0)
  const pageSize = 20
  const [data, setData] = useState([])

  const pageChange = (page, pageSize) => {
    setCurrent(page)
  }

  useEffect(() => {
    axiosReq.get("/userSubscribe/getUserSubscribeNotification",{ size: pageSize, current: current }).then(
      (value)=>{
        setData(value.data.data)
        setTotal(value.data.total)
      },
      (reason)=>{
        message.error(reason.message)
      }
    )
  },[current])

  return (
    <div>
      {data.map((item)=>{
        return <NotificationFocusItem data={item} key={item.userSubscribe.uuid}/>
      })}
      {total === 0 ?
        (<div style={{
          width: '700px',
          backgroundColor: '#fff',
          margin: '10px 0 0 50px'
        }}>
          <Empty description='暂无关注消息' />
        </div>) : ''
      }
      <div
        style={{
          backgroundColor: '#fff',
          width: '700px',
          margin: '10px 0 0 50px',
          display: total === 0 ?  'none' : 'block'
        }}
      >
        <Pagination current={current} total={total} pageSize={pageSize} onChange={pageChange} />
      </div>
    </div>
  )
}
