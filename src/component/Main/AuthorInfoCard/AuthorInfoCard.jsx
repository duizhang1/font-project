import React from 'react'
import { Card } from 'antd';
import AuthorInfoHeader from './AuthorInfoHeader/AuthorInfoHeader';

export default function AuthorInfoCard(props) {
    return (
        <Card title={<AuthorInfoHeader {...props} />}>
            <div>
            </div>
        </Card>
    )
}
