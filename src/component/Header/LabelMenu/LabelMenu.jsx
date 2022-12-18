import { Header } from 'antd/lib/layout/layout'
import React, { useState } from 'react'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import './LabelMenu.css'

const items = [
    {
        label: '综合',
        key: 'all',
    },
    {
        label: '后端',
        key: 'back',
    },
    {
        label: '前端',
        key: 'font',
    },
    {
        label: '关注',
        key: 'focus',
    },
];

export default function LabelMenu() {
    const [current, setCurrent] = useState('all');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return (
        <Header className='labelheader-set'>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} className='labelmenu-set' />
        </Header>
    )
}
