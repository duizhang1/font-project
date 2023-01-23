import React from 'react'
import ArticleCommentSingle from '../ArticleCommentSingle/ArticleCommentSingle'
import './ArticleCommentSquare.css'
import { Empty } from 'antd';

export default function ArticleCommentSquare() {

    const data = [
        {
            uuid: 'sdas3231as5d31asds',
            userId: 'sss',
            username: '大队长',
            href: 'https://p3-passport.byteimg.com/img/mosaic-legacy/3795/3033762272~180x180.awebp',
            comment: '存在即合理',
            likeNumber: 11,
            createTime: '2022-06-27 19:15:20',
            replyToId: '',
            replyToName: '',
            replys: [
                {
                    uuid: 'sdas3231asdasas5d31asds',
                    userId: 'dddd',
                    username: '小队长',
                    href: 'https://p3-passport.byteimg.com/img/mosaic-legacy/3795/3033762272~180x180.awebp',
                    comment: '存在即不合理',
                    likeNumber: 5,
                    createTime: '2022-06-27 19:15:20',
                    replyToId: '',
                    replyToName: ''
                },
                {
                    uuid: 'sdas3231876587978978ds',
                    userId: 'dddd',
                    username: '小队长',
                    href: 'https://p3-passport.byteimg.com/img/mosaic-legacy/3795/3033762272~180x180.awebp',
                    comment: '存在即不合理',
                    likeNumber: 5,
                    createTime: '2022-06-27 19:15:20',
                    replyToId: '',
                    replyToName: ''
                }
            ]
        },
        {
            uuid: 'sdas3231as51231588d31asds',
            userId: 'sss',
            username: '大队长',
            href: 'https://p3-passport.byteimg.com/img/mosaic-legacy/3795/3033762272~180x180.awebp',
            comment: '存在即合理',
            likeNumber: 11,
            createTime: '2022-06-27 19:15:20',
            replyToId: '',
            replyToName: '',
            replys: [
                {
                    uuid: 'sdas3231asdasas5231523d31asds',
                    userId: 'dddd',
                    username: '小队长',
                    href: 'https://p3-passport.byteimg.com/img/mosaic-legacy/3795/3033762272~180x180.awebp',
                    comment: '存在即不合理',
                    likeNumber: 5,
                    createTime: '2022-06-27 19:15:20',
                    replyToId: '',
                    replyToName: ''
                },
                {
                    uuid: 'sdas3231as256634sds',
                    userId: 'dddasdasd112312d',
                    username: '小队长',
                    href: 'https://p3-passport.byteimg.com/img/mosaic-legacy/3795/3033762272~180x180.awebp',
                    comment: '存在即不合理',
                    likeNumber: 5,
                    createTime: '2022-06-27 19:15:20',
                    replyToId: '',
                    replyToName: ''
                }
            ]
        }
    ]

    return (
        <div>
            {data.map((item) => {
                return (
                    <div className='article-comment-square-item' key={ item.uuid }>
                        <ArticleCommentSingle data={item} key={ item.uuid }/>
                    </div>
                )
            })}
            {data.length === 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='暂无评论'/> : ''}
        </div>
    )
}
