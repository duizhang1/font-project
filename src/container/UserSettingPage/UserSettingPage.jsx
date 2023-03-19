import PropTypes from 'prop-types'
import React from 'react'
import CommonHeader from '@src/component/Header/CommonHeader/CommonHeader'
import {
  LeftOutlined
} from '@ant-design/icons'
import { connect } from 'react-redux'
import UserSettingNav from '@src/container/UserSettingPage/UserSettingNav/UsetSettingNav'
import { Outlet } from 'react-router-dom'

function UserSettingPage (props) {
  const { userRedux } = props

  return (
    <>
      <CommonHeader/>
      <div style={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{
          backgroundColor: '#fff',
          marginTop: '15px'
        }}>
          <div style={{
            borderBottom: '1px solid #e5e6eb',
            height: '50px',
            lineHeight: '50px'
          }}>
            <a
              style={{
                color: '#909090',
                margin: '0 0 0 15px'
              }}
              href={`/user/${userRedux.uuid}/msg`}
            >
              <LeftOutlined/>
              返回个人主页
            </a>
          </div>
          <div style={{
            display: 'flex',
            minHeight: '500px',
            minWidth: '950px'
          }}>
            <UserSettingNav />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
export default connect(
  state => ({
    userRedux: state.user
  }),
  {}
)(UserSettingPage)

UserSettingPage.propTypes = {
  userRedux: PropTypes.any
}
