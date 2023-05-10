import { Avatar, Image } from 'antd'
import React from 'react'
import './MarkDownHeader.css'
import PropTypes from 'prop-types'

export default function MarkDownHeader (props) {
  const { data } = props
  const { article, author } = data

  return (
        <div>
            <h1 className='markdown-header-article-title'>{article.title}</h1>
            <div className='markdown-header-all-box'>
                <Avatar alt='头像' size='large' src={author.avatar} />
                <span className='markdown-header-info-box'>
                    <a className='markdown-header-creator-name' href={`/user/${author.uuid}`}>{author.username}</a>
                    <span>
                        <span className='markdown-header-create-time'>{author.createTime}</span>
                        <span className='markdown-header-read-number'>阅读{article.readCount}</span>
                    </span>
                </span>
            </div>
            <div>
              {article.img !== null && article.img.length > 0
                ? (<Image src={article.img} alt="" className='markdown-header-article-img' style={{ height: '200px' }}/>)
                : ''}
            </div>
        </div>
  )
}

MarkDownHeader.propTypes = {
  data: PropTypes.object
}
