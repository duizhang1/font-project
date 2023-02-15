import NotificationCommentItem from '@src/component/ListItem/NotificationCommentItem/NotificationCommentItem'
import React from 'react'
import { Pagination } from 'antd'

export default function NotificationComment() {



    return (
        <div>
            <NotificationCommentItem />
            <NotificationCommentItem />
            <NotificationCommentItem />
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
