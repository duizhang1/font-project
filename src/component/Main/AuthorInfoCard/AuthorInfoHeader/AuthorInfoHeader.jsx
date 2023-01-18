import React from 'react'
import { Avatar,Button } from 'antd'
import './AuthorInfoHeader.css'

export default function AuthorInfoHeader(props) {

    const { authorInfo } = props

    return (
        <div style={{minWidth: '200px'}}>
            <div className='author-header'>
                <Avatar style={{}} alt='头像' size='large' src={authorInfo.avatar} />
                <span className='author-info'>
                    <a href={`/user/${authorInfo.uuid}`}>{authorInfo.username}</a>
                    <span style={{ display: authorInfo.companyName === '' ? 'none' : 'inline' }}>{authorInfo.companyName}</span>
                </span>
            </div>
            <div className='author-button-group'>
                <Button type="primary" size='middle' style={{width: '45%'}}>
                    关注
                </Button>
                <Button size='middle' style={{width: '45%',marginLeft: '15px'}}>私信</Button>
            </div>
        </div>
    )
}
