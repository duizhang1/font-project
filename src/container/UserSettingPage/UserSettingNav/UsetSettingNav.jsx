import React, { useEffect, useState } from 'react'
import { Menu } from 'antd'
import { SettingOutlined, ProfileOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { splitLastWordFromLocation } from '@src/util/LocationUtil'

export default function UserSettingNav () {
  const items = [
    {
      label: '个人资料',
      key: 'profile',
      icon: <ProfileOutlined />
    },
    {
      label: '账号设置',
      key: 'account',
      icon: <SettingOutlined />
    }
  ]
  const [current, setCurrent] = useState('mail')
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const locate = splitLastWordFromLocation(location)
    const keys = items.filter((item) => {
      return item.key === locate
    })
    setCurrent(keys[0].key)
  })

  const onClick = (e) => {
    navigate(`/usersetting/${e.key}`)
  }

  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="inline"
        items={items}
        style={{
          minWidth: '150px'
        }}
      />
    </>
  )
}
