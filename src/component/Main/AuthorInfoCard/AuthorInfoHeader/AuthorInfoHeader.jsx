import React from 'react'
import { Avatar,Button } from 'antd'
import './AuthorInfoHeader.css'

export default function AuthorInfoHeader(props) {

    const { avatarHref, creatorName, jobAndCompany } = props

    return (
        <div>
            <div className='author-header'>
                <Avatar style={{}} alt='头像' size='large' src={avatarHref} />
                <span className='author-info'>
                    <a href='/ssss'>{creatorName}</a>
                    <span style={{ display: jobAndCompany === '' ? 'none' : 'inline' }}>{jobAndCompany}</span>
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
