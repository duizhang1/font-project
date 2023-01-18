import { Avatar } from 'antd'
import React from 'react'
import './MarkDownHeader.css'

export default function MarkDownHeader(props) {
    const { data } = props
    const {article,author} = data

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
                <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2e8ea737d484ff1a056151b0ce9b663~tplv-k3u1fbpfcp-zoom-crop-mark:3024:3024:3024:1702.awebp?" alt="" className='markdown-header-article-img'/>
            </div>
        </div>
    )
}
