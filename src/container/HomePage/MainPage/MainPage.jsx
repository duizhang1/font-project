import React,{useState} from 'react'
import { Layout } from 'antd'
import LabelMenu from '@src/component/Header/LabelMenu/LabelMenu'
import './MainPage.css'
import ArticleList from '@src/component/Main/ArticleList/ArticleList'
import ArticleHeader from '@src/component/Main/ArticleHeader/ArticleHeader'

const {Content} = Layout

export default function MainPage() {

    const [ articleHeader,setArticleHeader ] = useState({orderBy:'1',hotDay: '0'});

    return (
        <Content>
            <Layout>
                <LabelMenu />
                <Content>
                    <div className='content-set'>
                        <div className='articlelist-set'>
                            <ArticleHeader setArticleHeader={ setArticleHeader } />
                            <ArticleList articleHeader={ articleHeader } />
                        </div>
                        <div className='rightlist-set'>

                        </div>
                    </div>
                </Content>
            </Layout>
        </Content>
    )
}
