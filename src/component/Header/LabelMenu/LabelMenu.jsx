import { Header } from 'antd/lib/layout/layout'
import React, { useState,useEffect } from 'react'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import './LabelMenu.css'
import { useNavigate, useLocation } from "react-router-dom";

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
    const navigate = useNavigate();
    const location = useLocation();

    const onClick = (e) => {
        setCurrent(e.key);
        navigate(`/mainpage/${e.key}`);
    };

    useEffect(() => {
        if (location.pathname.split('/').length >= 3 && location.pathname.split('/')[2] !== '') {
            setCurrent(location.pathname.split('/')[2]);
        }
    })
    
    return (
        <Header className='labelheader-set'>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} className='labelmenu-set' />
        </Header>
    )
}
