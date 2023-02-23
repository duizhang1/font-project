import React from 'react'
import NotificationLikeItem from '@src/component/ListItem/NotificationLikeItem/NotificationLikeItem'
import { message, Pagination, Empty } from 'antd'
import { useState } from 'react'
import { useEffect } from 'react'
import { axiosReq } from '@src/util/request/axios'

export default function NotificationLike() {

    const [current, setCurrent] = useState(1)
    const [total, setTotal] = useState(0)
    const pageSize = 20
    const [data, setData] = useState([])

    const pageChange = (page, pageSize) => {
        setCurrent(page)
    }

    useEffect(() => {
        axiosReq.get('/articleLike/getArticleLikeNotifications',
            { size: pageSize, current: current }).then(
                (value) => {
                    setData(value.data.data)
                    setTotal(value.data.total)
                },
                (reason) => {
                    message.error(reason.message)
                }
            )
    }, [current])

    return (
        <div>
            {data.map((item) => {
                return <NotificationLikeItem data={item} key={item.relation.uuid} />
            })}
            {total === 0 ?
                (<div style={{
                    width: '700px',
                    backgroundColor: '#fff',
                    margin: '10px 0 0 50px'
                }}>
                    <Empty description='暂无点赞消息'/>
                </div>) : ''
            }
            <div
                style={{
                    backgroundColor: '#fff',
                    width: '700px',
                    margin: '10px 0 0 50px',
                }}
            >
                <Pagination current={current} total={total} pageSize={pageSize} onChange={pageChange} />
            </div>
        </div>
    )
}
