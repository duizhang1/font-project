import React from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function EditUserProfileButton () {
  const navigate = useNavigate()

  function toUserEdit () {
    navigate('/usersetting/profile')
  }

  return (
    <div onClick={toUserEdit}>
      <Button type="primary" ghost>
        编辑个人资料
      </Button>
    </div>
  )
}
