import React from 'react'
import { Avatar } from 'antd'
import { connect } from 'react-redux'
import { loginShowAction } from '@src/redux/action/Login'
import { useNavigate } from 'react-router-dom'
import './AvatarAndName.css'

function AvatarAndName(props) {
    const { userRedux } = props
    const navigate = useNavigate()

    function clickToUser() {
        navigate(`/user/${userRedux.uuid}`);
    }

    return (
        <div style={{height: '40px'}}>
            <Avatar
                size="large"
                src={userRedux.avatar}
                style={{
                    display: userRedux.uuid !== '' ? 'block' : 'none',
                    cursor: 'pointer',
                    float: 'left'
                }}
                onClick={clickToUser}
            />
            <div className='avatar-and-name-span' onClick={clickToUser}>
                {userRedux.username}
            </div>
        </div>
    )
}
export default connect(
    state => ({
        userRedux: state.user
    }),
    { loginShowAction }
)(AvatarAndName)