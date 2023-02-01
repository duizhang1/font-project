import React,{ useEffect,useState } from 'react'
import ArticleCommentSingle from '../ArticleCommentSingle/ArticleCommentSingle'
import './ArticleCommentSquare.css'
import { Empty, message } from 'antd';
import { axiosReq } from '@src/util/request/axios';
import { useParams } from 'react-router-dom'

export default function ArticleCommentSquare(props) {
    const {updateArticleComment,setUpdateArticleComment} = props
    const { id } = useParams()
    const childSize = 2
    const [data,SetData] = useState([])

    useEffect(() => {
        axiosReq.get('/articleComment/getArticleComment', { articleId: id, childSize }).then(
            (value) => {
                SetData(value.data)
            },
            (reason) => {
                message.error(reason.message)
            }
       ) 
    },[updateArticleComment])

    return (
        <div>
            {data.map((item) => {
                return (
                    <div className='article-comment-square-item' key={ item.uuid }>
                        <ArticleCommentSingle
                            data={item}
                            key={item.uuid}
                            childSize={childSize}
                            parentCommentId={item.uuid}
                            setUpdateArticleComment={setUpdateArticleComment}
                        />
                    </div>
                )
            })}
            {data.length === 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='暂无评论'/> : ''}
        </div>
    )
}
