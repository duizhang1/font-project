import AvatarOrDefault from '@src/component/Avatar/AvatarOrDefalut/AvatarOrDefault'
import React, { useRef, useState } from 'react'
import ArticleCommentEditor from '../ArticleCommentEditor/ArticleCommentEditor'
import ArticleCommentSquare from '../ArticleCommentSquare/ArticleCommentSquare'
import './ArticleComment.css'

export default function ArticleComment() {

    return (
        <div>
            <div>
                <h2>评论</h2>
                <div className='article-comment-write-comment'>
                    <AvatarOrDefault right='10px'/>
                    <ArticleCommentEditor/>
                </div>
            </div>
            <div className='article-comment-all-comment'>
                <h2>全部评论</h2>
                <ArticleCommentSquare/>
            </div>
        </div>
    )
}
