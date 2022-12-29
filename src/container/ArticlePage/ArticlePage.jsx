import React from 'react'
import { useParams } from 'react-router-dom'
import MarkDownCom from '../../component/Main/MarkDownCom/MarkDownCom'
import MarkdownNavbar from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import { Content } from 'antd/lib/layout/layout';
import './ArticlePage.css'
import MarkDownHeader from '../../component/Main/MarkDownHeader/MarkDownHeader';
import AuthorInfoCard from '../../component/Main/AuthorInfoCard/AuthorInfoCard';



const data = {
    title: 'NB的Github项目，看到最后一个我惊呆了！',
    avatarHref: 'https://p3-passport.byteimg.com/img/mosaic-legacy/3795/3033762272~100x100.awebp',
    creatorName: '庄辉凡',
    createtime: '2022年11月04日 18:28',
    readNumber: '55555',
    content: '# JAVA正则表达式\n\n## JAVA基本语法\n```java\n//这是需要进行匹配的字符串\n//创建匹配器\nwhile(matcher.find()){\n   	System.out.println("匹配结果"+matcher.group(0));\n}\n```\nhelloworld'
}
const authorData = {
    avatarHref: 'https://p3-passport.byteimg.com/img/mosaic-legacy/3795/3033762272~100x100.awebp',
    creatorName: '庄辉凡',
    jobAndCompany: 'Soft Enginee @ software'
}

export default function ArticlePage() {

    const { id } = useParams()

    return (
        <Content>
            <div className='content'>
                <div className='article-com'>
                    <div>
                        <MarkDownHeader {...data} />
                        <MarkDownCom content={data.content} />
                    </div>
                </div>
                <div className='right-cards'>
                    <AuthorInfoCard {...authorData} />
                    <div>
                        <MarkdownNavbar source={data.content} />
                    </div>
                </div>
            </div>
        </Content>
    )
}
