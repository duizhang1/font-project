import React from 'react'
import { LikeFilled, CommentOutlined, StarFilled } from '@ant-design/icons';
import { Affix } from 'antd'
import './ArticleTool.css'

export default function ArticleTool() {
    return (
        <Affix  offsetTop={0}>
            <div className='article-tool-div'>
                <div className='article-tool-single-tool'>
                    <LikeFilled style={{ fontSize: '22px', color: '#515767' }} />
                </div>
                <div className='article-tool-single-tool' style={{ margin: '15px 0 0 0' }}>
                    <CommentOutlined style={{ fontSize: '22px', color: '#515767' }} />
                </div>
                <div className='article-tool-single-tool' style={{ margin: '15px 0 0 0' }}>
                    <StarFilled style={{ fontSize: '22px', color: '#515767' }} />
                </div>
            </div>
        </Affix>
    )
}
