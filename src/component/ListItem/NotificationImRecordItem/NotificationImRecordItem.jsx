import React from 'react'
import { Avatar } from 'antd'
import './NotificationImRecordItem.css'

const clickItem = (e) => {
    return () => {
        const w = window.open('about:blank');
        w.location.href = '/home/user/' + e
    }
}

export default function NotificationImRecordItem(props) {
    const {data} = props
    const avatarSize = 'large'


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
                            {data.imRecord.createTime}
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
                            {data.imRecord.content}
                        </div>
                        <Avatar
                            src={data.avatar}
                            size={avatarSize}
                            style={{
                                cursor: 'pointer',
                                minWidth: '40px',
                            }}
                            onClick={clickItem(data.imRecord.userId)}
                        />
                    </div>
                ) :
                (
                    <div style={{
                        display: 'flex',
                        margin: '10px 10px'
                    }}>
                        <Avatar
                            src={data.avatar}
                            size={avatarSize}
                            style={{
                                cursor: 'pointer',
                                minWidth: '40px',
                            }}
                            onClick={clickItem(data.imRecord.userId)}
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
                            {data.imRecord.content}
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
                            {data.imRecord.createTime}
                        </div>
                    </div>
                )
            }
        </div>
    )
}
