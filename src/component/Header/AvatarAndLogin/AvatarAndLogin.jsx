import React,{useEffect, useState} from 'react'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons';

export default function AvatarAndLogin() {
    const [login, setLogin] = useState(true);


    return (
        <div>
            <Avatar size="large" icon={<UserOutlined />} style={{ display: login ? 'block' : 'none' ,marginTop: '8px'}} />
            <span style={{ display: login ? 'none' : 'block' }}>登陆/注册</span>
        </div>
    )
}
