import React from 'react'
import { Card } from 'antd';
import AuthorInfoHeader from './AuthorInfoHeader/AuthorInfoHeader';
import { LikeTwoTone,EyeTwoTone } from '@ant-design/icons';
import './AuthorInfoCard.css'

export default function AuthorInfoCard(props) {
    const {authorInfo} = props
    return (
        <Card title={<AuthorInfoHeader authorInfo={authorInfo} />}>
            <span className='card-span'><LikeTwoTone style={{ marginRight: '12px' }} />获得点赞 {0 }</span>
            <span className='card-span'><EyeTwoTone style={{ marginRight: '12px' }} />文章被阅读 {0 }</span>
        </Card>
    )
}
