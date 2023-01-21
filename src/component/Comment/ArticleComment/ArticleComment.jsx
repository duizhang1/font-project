import AvatarOrDefault from '@src/component/Avatar/AvatarOrDefalut/AvatarOrDefault'
import React, { useRef, useState } from 'react'
import ArticleCommentEditor from '../ArticleCommentEditor/ArticleCommentEditor'
import './ArticleComment.css'

export default function ArticleComment() {

    return (
        <div>
            <div>
                <h2>评论</h2>
                <div className='article-comment-write-comment'>
                    <AvatarOrDefault top='8px'/>
                    <ArticleCommentEditor />
                </div>
            </div>
        </div>
    )
}
