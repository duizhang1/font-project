import React from 'react'

export default function UserNameHref(props) {

  const {name,uuid} = props

  return (
    <a
      href={`/user/${uuid}/msg`}
      style={{
        textDecoration: 'none', 
        fontSize: '16px',
        color: '#17181a',
        fontWeight: '600'
      }}
    >{name}</a>
  )
}
