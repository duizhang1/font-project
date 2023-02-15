import React from 'react'
import { Avatar } from 'antd'
import './NotificationLikeItem.css'

const clickItem = (e) => {
    return () => {
        const w = window.open('about:blank');
        w.location.href = '/home/user/' + e
    }
}

export default function NotificationLikeItem() {

    const avatarSize = 'large'
    const data = {
        userId: 's',
        userName: '队长123534846',
        avatarHref: 'https://p3-passport.byteimg.com/img/mosaic-legacy/3795/3033762272~180x180.awebp',
        articleId: 'c3f9b85a896a3bad2c5e3eddf5b57449',
        articleTitle: 'JUC自定义线程池练习',
        createTime: '2023-02-06 19:27',
    }

    return (
        <div className='notification-like-item-div'>
            <Avatar
                src={data.avatarHref}
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
                        {data.userName}
                    </a>
                    点赞了你的文章
                    <a
                        href={`/home/post/${data.articleId}`}
                        style={{
                            margin: '0 5px 0 5px'
                        }}
                    >
                        {data.articleTitle}
                    </a>
                </div>
                <div style={{
                    color: '#8a9aa9'
                }}>
                    {data.createTime}
                </div>
            </div>
        </div>
    )
}
