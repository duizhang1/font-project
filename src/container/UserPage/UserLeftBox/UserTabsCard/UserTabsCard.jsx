import React from 'react'
import { Tabs } from 'antd';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

const tabItem = [
  {
    label: `动态`,
    key: 'msg',
  },
  {
    label: `文章`,
    key: 'posts',
  },
  {
    label: `收藏夹`,
    key: 'store',
  },
  {
    label: `关注`,
    key: 'store',
  },
]

export default function UserTabsCard() {

  const navigate = useNavigate()
  const { userId } = useParams();

  function onTabUrl(key) {
    navigate(`/user/${userId}/${key}`)
  }

  return (
    <div style={{
      backgroundColor: '#fff',
      padding: '0 15px'
    }}>
      <Tabs
        defaultActiveKey="1"
        onChange={onTabUrl}
        items={tabItem}
      />
      <Outlet />
    </div>
  )
}
