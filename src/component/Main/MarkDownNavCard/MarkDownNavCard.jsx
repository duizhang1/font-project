import React from 'react'
import { Card } from 'antd';
import MarkdownNavbar from 'markdown-navbar';

export default function MarkDownNavCard(props) {
    const {content} = props

    return (
        <div style={{marginTop: '15px'}}>
            <Card title='目录' bodyStyle={{ padding: '5px' }}>
                <MarkdownNavbar source={content} />
            </Card>
        </div>
    )
}
