import React from 'react'
import { Select } from 'antd'

export default function HotBoardButton(props) {

    const handleChange = (e) => {
        console.log(e)
    }

    const isActive = props.isActive

    return (
        <div>
            热榜
            <Select
                defaultValue="last3day"
                onChange={handleChange}
                options={[
                    {
                        value: 'last3day',
                        label: '最近3天',
                    },
                    {
                        value: 'last5day',
                        label: '最近5天',
                    },
                    {
                        value: 'last30day',
                        label: '最近1个月',
                    },
                ]}
                style={{ display: isActive ? 'inline-flex' : 'none', width: 100 ,marginLeft: '10px'}}
            />
        </div>
    )
}
