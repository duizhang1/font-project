import React, { useState } from 'react'
import { Tabs } from 'antd'
import HotBoardButton from '../HotBoardButton/HotBoardButton'

export default function ArticleHeader(props) {
    const [currentKey, setCurrentKey] = useState('1');
    const {setArticleHeader} = props

    const tabChange = (key, e) => {
        setCurrentKey(key)
        if (key === '1') {
            setArticleHeader({orderBy:key,hotDay:'0'})
        } else {
            setArticleHeader({orderBy:key,hotDay:'3'})
        }
    }

    return (
        <Tabs
            defaultActiveKey="1"
            items={[
                {
                    label: <span style={{ height: '32px', lineHeight: '32px',marginLeft: '15px' }}>最新</span>,
                    key: '1'
                },
                {
                    label: <HotBoardButton
                        currentKey={currentKey}
                        compkey={'2'}
                        setArticleHeader={setArticleHeader}
                    />,
                    key: '2',
                },
            ]}
            style={{
                height: '38px',
                lineHeight: '36px',
                marginBottom: '15px'
            }}
            size='small'
            onChange={tabChange}
        />
    )
}
