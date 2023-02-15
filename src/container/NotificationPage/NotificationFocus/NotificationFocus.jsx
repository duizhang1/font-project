import NotificationFocusItem from '@src/component/ListItem/NotificationFocusItem/NotificationFocusItem'
import React from 'react'
import { Pagination } from 'antd'

export default function NotificationFocus() {
    return (
        <div>
            <NotificationFocusItem />
            <NotificationFocusItem />
            <NotificationFocusItem />
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
