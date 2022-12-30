import React from 'react'
import { Card } from 'antd';
import AuthorInfoHeader from './AuthorInfoHeader/AuthorInfoHeader';
import { LikeTwoTone,EyeTwoTone } from '@ant-design/icons';
import './AuthorInfoCard.css'

export default function AuthorInfoCard(props) {
    const {likeNumber,allReadNumber} = props
    return (
        <Card title={<AuthorInfoHeader {...props} />}>
            <span className='card-span'><LikeTwoTone style={{ marginRight: '12px' }} />获得点赞 {likeNumber }</span>
            <span className='card-span'><EyeTwoTone style={{ marginRight: '12px' }} />文章被阅读 {allReadNumber }</span>
        </Card>
    )
}
