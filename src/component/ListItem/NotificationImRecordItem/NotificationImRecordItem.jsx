import React from 'react'
import { Avatar } from 'antd'
import './NotificationImRecordItem.css'

const clickItem = (e) => {
    return () => {
        const w = window.open('about:blank');
        w.location.href = '/home/user/' + e
    }
}

export default function NotificationImRecordItem() {

    const avatarSize = 'large'
    const data = {
        own: true,
        userId: 's',
        avatarHref: 'https://p3-passport.byteimg.com/img/mosaic-legacy/3795/3033762272~180x180.awebp',
        content: '你好啊sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
        createTime: '2023-02-06 19:27',
    }

    return (
        <div>
            {data.own ?
                (
                    <div style={{
                        display: 'flex',
                        margin: '10px 10px'
                    }}>
                        <div style={{
                            color: '#8a919f',
                            fontWeight: 400,
                            fontSize: '12px',
                            lineHeight: '22px',
                            textAlign: 'center',
                            // marginLeft: 'auto',
                            marginTop: '15px'
                        }}>
                            {data.createTime}
                        </div>
                        <div style={{
                            backgroundColor: 'rgba(30, 128, 255, 0.24)',
                            borderRadius: '5px',
                            fontSize: '15px',
                            lineHeight: '20px',
                            padding: '10px',
                            margin: '0 5px 0 auto',
                            maxWidth: '300px',
                            wordBreak: 'break-all',
                        }}>
                            {data.content}
                        </div>
                        <Avatar
                            src={data.avatarHref}
                            size={avatarSize}
                            style={{
                                cursor: 'pointer',
                                minWidth: '40px',
                            }}
                            onClick={clickItem(data.userId)}
                        />
                    </div>
                ) :
                (
                    <div style={{
                        display: 'flex',
                        margin: '10px 10px'
                    }}>
                        <Avatar
                            src={data.avatarHref}
                            size={avatarSize}
                            style={{
                                cursor: 'pointer',
                                minWidth: '40px',
                            }}
                            onClick={clickItem(data.userId)}
                        />
                        <div style={{
                            backgroundColor: '#e4e6eb',
                            borderRadius: '5px',
                            fontSize: '15px',
                            lineHeight: '20px',
                            padding: '10px',
                            margin: '0 0 0 5px',
                            maxWidth: '300px',
                            wordBreak: 'break-all'
                        }}>
                            {data.content}
                        </div>
                        <div style={{
                            color: '#8a919f',
                            fontWeight: 400,
                            fontSize: '12px',
                            lineHeight: '22px',
                            textAlign: 'center',
                            marginLeft: 'auto',
                            marginTop: '15px'
                        }}>
                            {data.createTime}
                        </div>
                    </div>
                )
            }
        </div>
    )
}
