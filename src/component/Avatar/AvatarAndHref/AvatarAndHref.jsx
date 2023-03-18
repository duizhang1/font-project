import { Avatar } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function AvatarAndHref (props) {
  const { srcHref, uuid, center } = props
  const navigate = useNavigate()

  const clickAvatar = () => {
    navigate(`/user/${uuid}/msg`)
  }

  return (
    <Avatar
      src={srcHref}
      style={{
        alignSelf: center ? 'center' : 'auto',
        cursor: 'pointer'
      }}
      size={'large'}
      onClick={clickAvatar}
    />
  )
}
AvatarAndHref.propTypes = {
  center: PropTypes.bool,
  srcHref: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired
}
