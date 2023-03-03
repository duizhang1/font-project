import { Avatar, Badge } from 'antd'
import React from 'react'
import './NotificationImSliderItem.css'
import {connect} from "react-redux";
import {decrNotificationUnreadImAction} from "@src/redux/action/NotificationUnreadCount";

function NotificationImSliderItem(props) {
    let { setSelectItem, selectItem, data, decrNotificationUnreadImAction } = props
    const avatarSize = 'large'

    function clickDiv() {
        setSelectItem({ userName: data.username, userId: data.toUserId })
        decrNotificationUnreadImAction(data.count)
        data.count = 0
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
                    margin: '-5px 0 0 0',
                    display: 'flex'
                }}>
                    <div className='notification-im-slider-item-name'>{data.username}</div>
                    <div className='notification-im-silder-item-time'>{data.imRecord ? data.imRecord.createTime : ' '}</div>
                </div>
                <div style={{display: 'flex'}}>
                    <div className='notification-im-silder-item-cnt'>
                        {data.imRecord ? data.imRecord.content : ''}
                    </div>
                    <Badge count={data.count} style={{ margin: '0 0 0 auto' }} />
                </div>
            </div>
        </div>
    )
}
export default connect(
  state =>({

  }),
  {decrNotificationUnreadImAction}
)(NotificationImSliderItem)