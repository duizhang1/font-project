import React from 'react'
import PropTypes from 'prop-types'

export default function UserNameHref (props) {
  const { name, uuid } = props

  return (
    <a
      href={`/user/${uuid}/msg`}
      // 防止事件冒泡
      onClick={(e) => { e.stopPropagation() }}
      style={{
        textDecoration: 'none',
        fontSize: '16px',
        color: '#17181a',
        fontWeight: '600'
      }}
    >{name}</a>
  )
}

UserNameHref.propTypes = {
  name: PropTypes.any,
  uuid: PropTypes.any
}
