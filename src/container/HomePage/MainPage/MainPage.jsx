import React from 'react'
import { Layout } from 'antd'
import LabelMenu from '@src/component/Header/LabelMenu/LabelMenu'
import './MainPage.css'
import ArticleList from '@src/component/Main/ArticleList/ArticleList'
import ArticleHeader from '@src/component/Main/ArticleHeader/ArticleHeader'
import { useParams } from 'react-router-dom'

const { Content } = Layout

export default function MainPage () {
  const { sortRoute } = useParams()

  const artcleHeaderDivStyle = {
    display: sortRoute === 'focus' ? 'none' : 'inline-block',
    width: '100%'
  }

  return (
    <Content>
      <Layout>
        <LabelMenu />
        <Content>
          <div className='content-set'>
            <div className='articlelist-set'>
              <div style={artcleHeaderDivStyle}>
                <ArticleHeader/>
              </div>
              <ArticleList/>
            </div>
            <div className='rightlist-set'>

            </div>
          </div>
        </Content>
      </Layout>
    </Content>
  )
}
