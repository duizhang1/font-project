import React,{useEffect, useState} from 'react'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import {} from ''

function AvatarAndLogin(props) {
    const {userRedux} = props

    return (
        <div>
            <Avatar
                size="large"
                src={userRedux.avatar}
                style={{
                    display: userRedux.uuid !== '' ? 'block' : 'none',
                    marginTop: '8px'
                }}
            />
            <Avatar
                size="large"
                style={{
                    display: userRedux.uuid !== '' ? 'none' : 'block',
                    marginTop: '8px',
                    cursor: 'pointer'
                }}
            >
                登陆
            </Avatar>
        </div>
    )
}
export default connect(
    store => ({
        userRedux: store.user
    }),
    {}
)(AvatarAndLogin)