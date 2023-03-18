import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import React from 'react'
import { connect } from 'react-redux'
import { loginShowAction } from '@src/redux/action/Login'
import PropTypes from 'prop-types'

function AvatarOrDefault (props) {
  const { userRedux, loginShowAction, right = '0px' } = props
  return (
        <>
            <Avatar
                size="large"
                icon={<UserOutlined />}
                style={{
                  display: userRedux.uuid === '' ? 'block' : 'none',
                  cursor: 'pointer',
                  marginRight: right
                }}
                onClick={() => { loginShowAction() }}
            />
            <Avatar
                size="large"
                src={userRedux.avatar}
                style={{
                  display: userRedux.uuid !== '' ? 'block' : 'none',
                  cursor: 'pointer',
                  marginRight: right
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

AvatarOrDefault.propTypes = {
  loginShowAction: PropTypes.any,
  right: PropTypes.string,
  userRedux: PropTypes.any
}
