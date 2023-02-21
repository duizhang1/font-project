import { Avatar } from 'antd'
import React from 'react'
import './NotificationImSliderItem.css'

export default function NotificationImSliderItem(props) {
    let { setSelectItem, selectItem,data } = props
    const avatarSize = 'large'

    function clickDiv() {
        setSelectItem({userName: data.username,userId: data.toUserId})
    }

    return (
        <div
            className='notification-im-slider-item-div'
            onClick={clickDiv}
            style={{
                backgroundColor: selectItem.userId === data.toUserId ? '#eaf2ff' : 'white',
            }}
        >
            <Avatar
                src={data.avatar}
                size={avatarSize}
                style={{ cursor: 'pointer', minWidth: '40px' }}
            />
            <div className='notification-im-slider-item-content'>
                <div style={{
                    margin: '-5px 0 0 0'
                }}>
                    <div className='notification-im-slider-item-name'>{data.username}</div>
                    <div className='notification-im-silder-item-time'>{data.imRecord ? data.imRecord.createTime : ' '}</div>
                </div>
                <div className='notification-im-silder-item-cnt'>
                    {data.imRecord ? data.imRecord.content : ''}
                </div>
            </div>
        </div>
    )
}
