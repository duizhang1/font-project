import React from 'react'
import { Tabs } from 'antd'

export default function ArticleHeader() {
    return (
        <Tabs
            defaultActiveKey="1"
            items={[
                {
                    label: 'Tab 1',
                    key: '1'
                },
                {
                    label: 'Tab 2',
                    key: '2',
                },
                {
                    label: 'Tab 3',
                    key: '3',
                },
            ]}
        />
    )
}
