import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MarkDownCom from '@src/component/Main/MarkDownCom/MarkDownCom'
import 'markdown-navbar/dist/navbar.css';
import { Content } from 'antd/lib/layout/layout';
import './ArticlePage.css'
import MarkDownHeader from '@src/component/Main/MarkDownHeader/MarkDownHeader';
import AuthorInfoCard from '@src/component/Main/AuthorInfoCard/AuthorInfoCard';
import MarkDownNavCard from '@src/component/Main/MarkDownNavCard/MarkDownNavCard';
import { axiosReq } from '@src/util/request/axios';
import { message,Affix } from 'antd';
import 'react-markdown-editor-lite/lib/index.css';


const authorData = {
    avatarHref: 'https://p3-passport.byteimg.com/img/mosaic-legacy/3795/3033762272~100x100.awebp',
    creatorName: '庄辉凡',
    jobAndCompany: 'Soft Enginee @ software'
}

export default function ArticlePage() {

    const { id } = useParams()
    const navigate = useNavigate();
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
    });

    useEffect(() => {
        axiosReq.get('/article/getArticleAndUserInfo', { articleId: id }).then(
            (value) => {
                setData(value.data)
            },
            (reason) => {
                message.error(reason.message)
                navigate(-1);
            }
        )
    }, [id])

    return (
        <Content>
            <div className='content'>
                <div className='article-com'>
                    <div>
                        <MarkDownHeader data={data} />
                        <MarkDownCom content={data.article.content } />
                    </div>
                </div>
                <div className='right-cards'>
                    <AuthorInfoCard authorInfo={data.author} />
                    <Affix offsetTop={0}>
                        <MarkDownNavCard content={data.article.content} />
                    </Affix>
                </div>
            </div>
        </Content>
    )
}
