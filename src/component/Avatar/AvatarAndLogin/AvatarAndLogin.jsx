import React from 'react'
import { Avatar, Dropdown } from 'antd'
import { connect } from 'react-redux'
import { loginShowAction } from '@src/redux/action/Login'
import { UserOutlined, SettingOutlined, HistoryOutlined, LogoutOutlined } from '@ant-design/icons'
import './AvatarAndLogin.css'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

function AvatarAndLogin (props) {
  const { userRedux, loginShowAction } = props
  const items = [
    {
      key: `/user/${userRedux.uuid}/msg`,
      label: (<span className='dropdown-item-span'>个人主页</span>),
      icon: <UserOutlined style={{ fontSize: '15px' }} />
    },
    {
      key: '/history',
      label: (<span className='dropdown-item-span'>历史记录</span>),
      icon: <HistoryOutlined style={{ fontSize: '15px' }} />
    },
    {
      key: '/usersetting/profile',
      label: (<span className='dropdown-item-span'>设置</span>),
      icon: <SettingOutlined style={{ fontSize: '15px' }} />
    },
    {
      key: '/logout',
      label: (<span className='dropdown-item-span'>退出</span>),
      icon: <LogoutOutlined style={{ fontSize: '15px' }} />
    }
  ]
  const navigate = useNavigate()

  function clickDropDown (params) {
    navigate(params.key)
  }

  const menuProps = {
    items,
    onClick: clickDropDown
  }

  return (
        <div>
            <Dropdown
                menu={menuProps}
                placement="bottom"
                arrow
                trigger={['click']}
            >
                <Avatar
                    size="large"
                    src={userRedux.avatar}
                    style={{
                      display: userRedux.uuid !== '' ? 'block' : 'none',
                      marginTop: '8px',
                      cursor: 'pointer'
                    }}
                />
            </Dropdown>

            <Avatar
                size="large"
                style={{
                  display: userRedux.uuid !== '' ? 'none' : 'block',
                  marginTop: '8px',
                  cursor: 'pointer'
                }}
                onClick={() => { loginShowAction() }}
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
  { loginShowAction }
)(AvatarAndLogin)

AvatarAndLogin.propTypes = {
  loginShowAction: PropTypes.any,
  userRedux: PropTypes.any
}
