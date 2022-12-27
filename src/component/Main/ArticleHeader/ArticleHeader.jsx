import React, { useState } from 'react'
import { Tabs } from 'antd'
import HotBoardButton from '../HotBoardButton/HotBoardButton'

export default function ArticleHeader() {
    const [hotActive, setHotActive] = useState(false);


    const tabClick = (key, e) => {
        if (key === '2') {
            setHotActive(true)
            console.log(hotActive)
        } else {
            setHotActive(false)
        }
    }

    return (
        <Tabs
            defaultActiveKey="1"
            items={[
                {
                    label: <span style={{ height: '32px', lineHeight: '32px' }}>最新</span>,
                    key: '1'
                },
                {
                    label: <HotBoardButton isActive={hotActive} />,
                    key: '2',
                },
            ]}
            style={{
                height: '38px',
                lineHeight: '36px',
                paddingLeft: '15px',
                marginBottom: '15px'
            }}
            size='small'
            onTabClick={tabClick}
        />
    )
}
