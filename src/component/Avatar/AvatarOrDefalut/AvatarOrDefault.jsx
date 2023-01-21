import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import React from 'react'
import { connect } from 'react-redux';
import { loginShowAction } from '@src/redux/action/Login'

function AvatarOrDefault(props) {
    const { userRedux, loginShowAction,top='0px' } = props
    return (
        <>
            <Avatar
                size="large"
                icon={<UserOutlined />}
                style={{
                    display: userRedux.uuid === '' ? 'block' : 'none',
                    cursor: 'pointer',
                    marginTop: top
                }}
                onClick={() => { loginShowAction() }}
            />
            <Avatar
                size="large"
                src={userRedux.avatar}
                style={{
                    display: userRedux.uuid !== '' ? 'block' : 'none',
                    cursor: 'pointer',
                    marginTop: top
                }}
            />
        </>
    )
}
export default connect(
    state => ({
        userRedux: state.user
    }),
    { loginShowAction }
)(AvatarOrDefault)