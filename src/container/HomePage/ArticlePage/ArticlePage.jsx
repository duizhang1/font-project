import React from 'react'
import { useParams } from 'react-router-dom'
import MarkDownCom from '../../../component/Main/MarkDownCom/MarkDownCom'
import 'markdown-navbar/dist/navbar.css';
import { Content } from 'antd/lib/layout/layout';
import './ArticlePage.css'
import MarkDownHeader from '../../../component/Main/MarkDownHeader/MarkDownHeader';
import AuthorInfoCard from '../../../component/Main/AuthorInfoCard/AuthorInfoCard';
import MarkDownNavCard from '../../../component/Main/MarkDownNavCard/MarkDownNavCard';

const data = {
    title: 'NB的Github项目，看到最后一个我惊呆了！',
    avatarHref: 'https://p3-passport.byteimg.com/img/mosaic-legacy/3795/3033762272~100x100.awebp',
    creatorName: '庄辉凡',
    createtime: '2022年11月04日 18:28',
    readNumber: '55555',
    content:  `## hello
    \n &nbsp;
    \n &nbsp;
    \n &nbsp;
    \n &nbsp;
    \n
    world
    `
}
const authorData = {
    avatarHref: 'https://p3-passport.byteimg.com/img/mosaic-legacy/3795/3033762272~100x100.awebp',
    creatorName: '庄辉凡',
    jobAndCompany: 'Soft Enginee @ software'
}

export default function ArticlePage() {

    const { id } = useParams()
    console.log(id)

    return (
        <Content>
            <div className='content'>
                <div className='article-com'>
                    <div>
                        <MarkDownHeader {...data} />
                        <MarkDownCom content={data.content}/>
                    </div>
                </div>
                <div className='right-cards'>
                    <AuthorInfoCard {...authorData} />
                    <MarkDownNavCard content={data.content}/>
                </div>
            </div>
        </Content>
    )
}
