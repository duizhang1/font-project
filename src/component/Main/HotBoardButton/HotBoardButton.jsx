import React from 'react'
import { Select } from 'antd'

export default function HotBoardButton(props) {

    const {currentKey,compkey,setArticleHeader} = props

    const handleChange = (e) => {
        setArticleHeader({orderBy:compkey,hotDay:e})
    }

    return (
        <div>
            热榜
            <Select
                defaultValue="3"
                onChange={handleChange}
                options={[
                    {
                        value: '3',
                        label: '最近3天',
                    },
                    {
                        value: '7',
                        label: '最近7天',
                    },
                    {
                        value: '30',
                        label: '最近1个月',
                    },
                ]}
                style={{ display: currentKey === compkey ? 'inline-block' : 'none', width: '110px' ,marginLeft: '10px'}}
            />
        </div>
    )
}
