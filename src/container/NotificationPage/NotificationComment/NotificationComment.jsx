import NotificationCommentItem from '@src/component/ListItem/NotificationCommentItem/NotificationCommentItem'
import React, { useState, useEffect } from 'react'
import { message, Pagination, Empty } from 'antd'
import { axiosReq } from '@src/util/request/axios'

export default function NotificationComment() {

    const [current, setCurrent] = useState(1)
    const [total, setTotal] = useState(0)
    const pageSize = 20
    const [data, setData] = useState([])

    const pageChange = (page, pageSize) => {
        setCurrent(page)
    }

    useEffect(() => {
        axiosReq.get('/articleComment/getCommentNotification',
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
                return <NotificationCommentItem data={item} key={item.articleComment.uuid} />
            })}
            {total === 0 ?
                (<div style={{
                    width: '700px',
                    backgroundColor: '#fff',
                    margin: '10px 0 0 50px'
                }}>
                    <Empty description='暂无评论消息' />
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
