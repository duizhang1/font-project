import React from 'react'
import './NotificationFocusItem.css'
import {Avatar, Button} from 'antd'
import {axiosReq} from "@src/util/request/axios";

const clickItem = (e) => {
  return () => {
    const w = window.open('about:blank');
    w.location.href = '/home/user/' + e
  }
}

export default function NotificationFocusItem(props) {
  const avatarSize = 'large'
  const {data} = props

  const clickFocus = (e) => {
    data.isFocus = true
    axiosReq.get('/user/subscribeUser', { userId: data.userId }).then(
      (value) => {
      },
      (reason) => {
        data.isFocus = false
      }
    )
  }

  return (
    <div className='notification-focus-item-div'>
      <Avatar
        src={data.avatar}
        size={avatarSize}
        style={{cursor: 'pointer', minWidth: '40px'}}
        onClick={clickItem(data.userId)}
      />
      <div className='notification-focus-item-content'>
        <div className='notification-focus-item-content-title'>
          <a
            href={`/user/${data.userId}`}
            style={{
              textDecoration: 'none',
              color: 'black',
              margin: '0 5px 0 0'
            }}
          >
            {data.username}
          </a>
          关注了你
        </div>
        <div style={{
          color: '#8a9aa9'
        }}>
          {data.userSubscribe.updateTime}
        </div>
      </div>
      <div style={{
        marginLeft: 'auto'
      }}>
        {data.isFocus ?
          (<Button size='middle'>已关注</Button>) :
          (<Button type="primary" size='middle' onClick={clickFocus}>回关</Button>)
        }
      </div>
    </div>
  )
}
