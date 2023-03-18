import React from 'react'
import { Avatar } from 'antd'
import './NotificationLikeItem.css'
import PropTypes from 'prop-types'

const clickItem = (e) => {
  return () => {
    const w = window.open('about:blank')
    w.location.href = '/home/user/' + e
  }
}

export default function NotificationLikeItem (props) {
  const { data } = props
  const avatarSize = 'large'

  return (
        <div className='notification-like-item-div'>
            <Avatar
                src={data.avatar}
                size={avatarSize}
                style={{ cursor: 'pointer', minWidth: '40px' }}
                onClick={clickItem(data.userId)}
            />
            <div className='notification-like-item-content'>
                <div className='notification-like-item-content-title'>
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
                    点赞了你的文章
                    <a
                        href={`/home/post/${data.articleId}`}
                        style={{
                          margin: '0 5px 0 5px'
                        }}
                    >
                        {data.title}
                    </a>
                </div>
                <div style={{
                  color: '#8a9aa9'
                }}>
                    {data.relation.createTime}
                </div>
            </div>
        </div>
  )
}

NotificationLikeItem.propTypes = {
  data: PropTypes.object.isRequired
}
