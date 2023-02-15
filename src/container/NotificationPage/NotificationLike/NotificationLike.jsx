import React from 'react'
import NotificationLikeItem from '@src/component/ListItem/NotificationLikeItem/NotificationLikeItem'
import { Pagination } from 'antd'

export default function NotificationLike() {
    return (
        <div>
            <NotificationLikeItem />
            <NotificationLikeItem />
            <NotificationLikeItem />
            <div
                style={{
                    backgroundColor: '#fff',
                    width: '700px',
                    margin: '10px 0 0 50px',
                }}
            >
                <Pagination defaultCurrent={1} total={50} />
            </div>
        </div>
    )
}
