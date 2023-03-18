import AvatarOrDefault from '@src/component/Avatar/AvatarOrDefalut/AvatarOrDefault'
import React, { useState } from 'react'
import ArticleCommentEditor from '../ArticleCommentEditor/ArticleCommentEditor'
import ArticleCommentSquare from '../ArticleCommentSquare/ArticleCommentSquare'
import './ArticleComment.css'
import { nanoid } from 'nanoid'

export default function ArticleComment () {
  const [updateArticleComment, setUpdateArticleComment] = useState(nanoid())

  return (
        <div>
            <div>
                <h2>评论</h2>
                <div className='article-comment-write-comment'>
                    <AvatarOrDefault right='10px'/>
                    <ArticleCommentEditor setUpdateArticleComment={ setUpdateArticleComment } />
                </div>
            </div>
            <div className='article-comment-all-comment'>
                <h2>全部评论</h2>
                <ArticleCommentSquare updateArticleComment={updateArticleComment} setUpdateArticleComment={ setUpdateArticleComment }/>
            </div>
        </div>
  )
}
