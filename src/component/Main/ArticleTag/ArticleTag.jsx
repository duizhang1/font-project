import React from 'react'
import { Tag } from 'antd'
import './ArticleTage.css'

export default function ArticleTag () {
  return (
        <div className='article-page-tag-div'>
            <div>
                <span>分类:</span>
                <Tag color="default" className='article-page-tag-tagcontent'>前端</Tag>
            </div>
            <div style={{ marginLeft: '15px' }}>
                <span>标签:</span>
                <Tag color="processing" className='article-page-tag-tagcontent'>React</Tag>
            </div>
        </div>
  )
}
