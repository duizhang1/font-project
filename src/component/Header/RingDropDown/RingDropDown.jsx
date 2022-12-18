import React from 'react'
import { Dropdown } from 'antd';
import { BellOutlined } from '@ant-design/icons'

const items = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item
            </a>
        ),
    },
    {
        key: '3',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                3rd menu item
            </a>
        ),
    },
];

export default function RingDropDown() {
    return (
        <Dropdown
            menu={{
                items,
            }}
            placement="bottomRight"
            arrow
        >
            <BellOutlined style={{ fontSize: '20px' }} />
        </Dropdown>
    )
}
