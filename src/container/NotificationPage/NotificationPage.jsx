import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import CommonHeader from '@src/component/Header/CommonHeader/CommonHeader'
import './NotificationPage.css'

export default function NotificationPage () {
  // 获得当前路由并获得后缀
  const location = useLocation().pathname.split('/')
  const menuSelect = location[location.length - 1]

  const navigate = useNavigate()

  const notificationItem = [
    {
      label: '点赞',
      key: 'like'
    },
    {
      label: '评论',
      key: 'comment'
    },
    {
      label: '关注',
      key: 'focus'
    },
    {
      label: '私信',
      key: 'im'
    }
  ]

  function clickMenu (e) {
    navigate(`/notification/${e.key}`)
  }

  return (
    <Layout>
      <CommonHeader />
      <div className='notification-page-header-div'>
        <Menu
          onClick={clickMenu}
          selectedKeys={[menuSelect]}
          mode="horizontal"
          items={notificationItem}
          className='notification-page-header-menu'
        />
      </div>
      <Outlet />
    </Layout>
  )
}
