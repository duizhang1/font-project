import React from 'react'
import './NotificationFocusItem.css'
import { Avatar, Button } from 'antd'

const clickItem = (e) => {
    return () => {
        const w = window.open('about:blank');
        w.location.href = '/home/user/' + e
    }
}

export default function NotificationFocusItem() {
    const avatarSize = 'large'
    const data = {
        userId: 's',
        userName: '队长123534846',
        avatarHref: 'https://p3-passport.byteimg.com/img/mosaic-legacy/3795/3033762272~180x180.awebp',
        createTime: '2023-02-06 19:27',
        isFocus: false
    }

    return (
        <div className='notification-focus-item-div'>
            <Avatar
                src={data.avatarHref}
                size={avatarSize}
                style={{ cursor: 'pointer', minWidth: '40px' }}
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
                        {data.userName}
                    </a>
                    关注了你
                </div>
                <div style={{
                    color: '#8a9aa9'
                }}>
                    {data.createTime}
                </div>
            </div>
            <div style={{
                marginLeft: 'auto'
            }}>
                {data.isFocus ?
                    (<Button size='middle'>已关注</Button>) :
                    (<Button type="primary" size='middle'>回关</Button>)
                }
            </div>
        </div>
    )
}
