import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MarkDownCom from '@src/component/Main/MarkDownCom/MarkDownCom'
import 'markdown-navbar/dist/navbar.css'
import { Content } from 'antd/lib/layout/layout'
import './ArticlePage.css'
import MarkDownHeader from '@src/component/Main/MarkDownHeader/MarkDownHeader'
import AuthorInfoCard from '@src/component/Main/AuthorInfoCard/AuthorInfoCard'
import MarkDownNavCard from '@src/component/Main/MarkDownNavCard/MarkDownNavCard'
import { axiosReq } from '@src/util/request/axios'
import { message, Affix } from 'antd'
import 'react-markdown-editor-lite/lib/index.css'
import ArticleComment from '@src/component/Comment/ArticleComment/ArticleComment'
import ArticleTag from '@src/component/Main/ArticleTag/ArticleTag'
import ArticleTool from '@src/component/Main/ArticleTool/ArticleTool'

export default function ArticlePage () {
  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState({
    article: {
      content: '',
      title: ''
    },
    author: {
      uuid: '',
      avatar: '',
      username: '',
      createTime: '',
      readCount: ''
    }
  })

  useEffect(() => {
    axiosReq.get('/article/getArticleAndUserInfo', { articleId: id }).then(
      (value) => {
        setData(value.data)
      },
      (reason) => {
        message.error(reason.message)
        navigate(-1)
      }
    )
  }, [id])

  return (
        <Content>
            <div className='article-page-content'>
                <div className='article-page-article-tool'>
                    <ArticleTool/>
                </div>
                <div className='article-page-article-com'>
                    <div className='article-page-article-content'>
                        <MarkDownHeader data={data} />
                        <MarkDownCom content={data.article.content} />
                        <ArticleTag/>
                    </div>
                    <div id='articlePageComment' className='article-page-article-comment'>
                        <ArticleComment />
                    </div>
                </div>
                <div className='article-page-right-cards'>
                    <AuthorInfoCard authorInfo={data.author} />
                    <Affix offsetTop={0}>
                        <MarkDownNavCard content={data.article.content} />
                    </Affix>
                </div>
            </div>
        </Content>
  )
}
