import React from 'react'
import { Layout } from 'antd'
import LabelMenu from '../../component/Header/LabelMenu/LabelMenu'
import './MainPage.css'
import ArticleList from '../../component/Main/ArticleList/ArticleList'
import ArticleHeader from '../../component/Main/ArticleHeader/ArticleHeader'

const {Content} = Layout

export default function MainPage() {
    return (
        <Content>
            <Layout>
                <LabelMenu />
                <Content>
                    <div className='content-set'>
                        <div className='articlelist-set'>
                            <ArticleHeader/>
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
