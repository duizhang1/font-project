import React from 'react'
import { Avatar, Button } from 'antd'
import './AuthorInfoHeader.css'
import { useNavigate } from 'react-router-dom'
import SubscribeButton from '@src/component/Button/SubscribeButton/SubscribeButton'
import PropTypes from 'prop-types'

export default function AuthorInfoHeader (props) {
  const { authorInfo } = props
  const navigate = useNavigate()

  function clickChat () {
    navigate(`/notification/im?addChat=${authorInfo.uuid}`)
  }

  return (
        <div style={{ minWidth: '200px' }}>
            <div className='author-header'>
                <Avatar alt='头像' size='large' src={authorInfo.avatar} />
                <span className='author-info'>
                    <a href={`/user/${authorInfo.uuid}`}>{authorInfo.username}</a>
                    <span style={{ display: authorInfo.companyName === '' ? 'none' : 'inline' }}>{authorInfo.companyName}</span>
                </span>
            </div>
            <div className='author-button-group'>
                <SubscribeButton userId={authorInfo.uuid} />
                <Button
                    size='middle'
                    style={{ width: '45%', marginLeft: '15px' }}
                    onClick={clickChat}
                >
                    私信
                </Button>
            </div>
        </div>
  )
}

AuthorInfoHeader.propTypes = {
  authorInfo: PropTypes.object
}
