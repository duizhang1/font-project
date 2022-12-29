import { Avatar } from 'antd'
import React from 'react'
import './MarkDownHeader.css'

export default function MarkDownHeader(props) {
    const { title, avatarHref, creatorName, createtime, readNumber } = props

    return (
        <div>
            <h1 className='article-title'>{title}</h1>
            <div className='all-box'>
                <Avatar alt='头像' size='large' src={avatarHref} />
                <span className='info-box'>
                    <a className='creator-name' href='/ssss'>{creatorName}</a>
                    <span>
                        <span className='create-time'>{createtime}</span>
                        <span className='read-number'>阅读{readNumber}</span>
                    </span>
                </span>
            </div>
            <div>
                <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2e8ea737d484ff1a056151b0ce9b663~tplv-k3u1fbpfcp-zoom-crop-mark:3024:3024:3024:1702.awebp?" alt="" className='article-img'/>
            </div>
        </div>
    )
}
