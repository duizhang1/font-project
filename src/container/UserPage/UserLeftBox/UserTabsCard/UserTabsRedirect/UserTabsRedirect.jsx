import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function UserTabsRedirect () {
  const { userId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    navigate(`/user/${userId}/msg`)
  })

  return (
    <div>正在重定向中</div>
  )
}
