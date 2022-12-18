import React from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import './AvatarLoc.css'

export default function AvatarLoc() {

    return (
        <div className='avatar-set'>
            <Avatar size="large" icon={<UserOutlined />} />
        </div>
    )
}
