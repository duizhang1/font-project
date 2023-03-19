import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'

const tabItem = [
  {
    label: '动态',
    key: 'msg'
  },
  {
    label: '文章',
    key: 'posts'
  },
  {
    label: '收藏夹',
    key: 'store'
  },
  {
    label: '关注',
    key: 'focus'
  }
]

export default function UserTabsCard () {
  const navigate = useNavigate()
  const { userId } = useParams()
  const [activeKey, setActiveKey] = useState('msg')
  const location = useLocation()

  function onTabUrl (key) {
    navigate(`/user/${userId}/${key}`)
  }

  useEffect(() => {
    const arr = location.pathname.split('/')
    const locate = arr[arr.length - 1]
    const keys = tabItem.filter((item) => {
      return locate === item.key
    })
    if (keys && keys.length > 0) {
      setActiveKey(keys[0].key)
    }
  }, [location])

  return (
    <div style={{
      backgroundColor: '#fff',
      padding: '0 15px',
      width: '700px'
    }}>
      <Tabs
        activeKey={activeKey}
        onChange={onTabUrl}
        items={tabItem}
      />
      <Outlet />
    </div>
  )
}
