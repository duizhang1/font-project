import { Avatar } from 'antd'
import React from 'react'
import './NotificationImSliderItem.css'

export default function NotificationImSliderItem(props) {
    let { setSelectItem, selectItem } = props
    const avatarSize = 'large'
    const data = {
        userId: 'sssss',
        userName: '队长123534846',
        avatarHref: 'https://p3-passport.byteimg.com/img/mosaic-legacy/3795/3033762272~180x180.awebp',
        createTime: '2023-02-06 19:27',
        content: '44444444444444444444444444444444444444444444444444444444444444'
    }

    function clickDiv() {
        setSelectItem({userName: data.userName,userId: data.userId})
    }

    return (
        <div
            className='notification-im-slider-item-div'
            onClick={clickDiv}
            style={{
                backgroundColor: selectItem.userId === data.userId ? '#eaf2ff' : 'white',
            }}
        >
            <Avatar
                src={data.avatarHref}
                size={avatarSize}
                style={{ cursor: 'pointer', minWidth: '40px' }}
            />
            <div className='notification-im-slider-item-content'>
                <div style={{
                    margin: '-5px 0 0 0'
                }}>
                    <div className='notification-im-slider-item-name'>{data.userName}</div>
                    <div className='notification-im-silder-item-time'>{data.createTime}</div>
                </div>
                <div className='notification-im-silder-item-cnt'>
                    {data.content}
                </div>
            </div>
        </div>
    )
}
