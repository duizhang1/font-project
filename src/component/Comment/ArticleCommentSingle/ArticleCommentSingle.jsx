import { Avatar, Space, Button } from 'antd'
import React, { useState } from 'react'
import { LikeOutlined, CommentOutlined, LikeTwoTone, DownOutlined } from '@ant-design/icons';
import './ArticleCommentSingle.css'
import ArticleCommentEditor from '../ArticleCommentEditor/ArticleCommentEditor';

const IconText = ({ icon, text }) => (
    <Space size={5}>
        {React.createElement(icon)}
        {text}
    </Space>
);

const clickItem = (e) => {
    return () => {
        const w = window.open('about:blank');
        w.location.href = '/home/user/' + e
    }
}

export default function ArticleCommentSingle(props) {

    const { data, avatarSize = 'large' } = props
    const [likeNumber, setLikeNumber] = useState(data.likeNumber)
    const [liked, setLiked] = useState(false)
    const [editorShow, setEditorShow] = useState(false)
    const [moreReply, setMoreReply] = useState(null)

    function clickLike() {
        setLikeNumber(likeNumber + 1)
        setLiked(true)
    }

    function clickDisLike() {
        setLikeNumber(likeNumber - 1)
        setLiked(false)
    }

    function isLikeOrNot() {
        if (liked) {
            return (
                <div
                    onClick={clickDisLike}
                    style={{ cursor: 'pointer', marginRight: '25px' }}
                >
                    <IconText
                        icon={LikeTwoTone}
                        text={likeNumber}
                        key="list-vertical-dislike-o"
                    />
                </div>
            )
        } else {
            return (
                <div
                    onClick={clickLike}
                    style={{ cursor: 'pointer', marginRight: '25px' }}
                >
                    <IconText
                        icon={LikeOutlined}
                        text={likeNumber === 0 ? '点赞' : likeNumber}
                        key="list-vertical-like-o"
                    />
                </div>
            )
        }
    }

    function clickComment() {
        setEditorShow(!editorShow)
    }

    function loadMoreReply() {
        const moreReply = [
            {
                uuid: 'sdas3231a12321sdasas5d31asds',
                userId: 'dddd',
                username: '小队长',
                href: 'https://p3-passport.byteimg.com/img/mosaic-legacy/3795/3033762272~180x180.awebp',
                comment: '存在即不合理',
                likeNumber: 5,
                createTime: '2022-06-27 19:15:20',
                replyToId: '',
                replyToName: '',
                replyTotal: 2,
                replys: null
            }
        ]
        setMoreReply([...moreReply])
    }

    return (
        <div className='article-comment-single-div'>
            <Avatar
                src={data.href}
                size={avatarSize}
                style={{ cursor: 'pointer' }}
                onClick={clickItem(data.userId)}
            />
            <div className='article-comment-single-content'>
                {/* 用户名时间div */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div
                        onClick={clickItem(data.userId)}
                        className='article-comment-single-content-username'
                    >
                        {data.username} {data.replyToId !== null && data.replyToId !== '' ? ` 回复 ${data.replyToName}` : ''}
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                        {data.createTime}
                    </div>
                </div>

                {/* 内容div */}
                <div
                    className='article-comment-single-content-comment'
                >
                    {data.comment}
                </div>

                {/* 点赞回复工具栏 */}
                <div className='article-comment-single-content-tool'>
                    {isLikeOrNot()}
                    <div
                        onClick={clickComment}
                        style={{ cursor: 'pointer', marginRight: '25px' }}
                    >
                        <IconText
                            icon={CommentOutlined}
                            text='回复'
                            key="list-vertical-reply-o"
                        />
                    </div>
                </div>

                {/* 回复栏，默认隐藏 */}
                <div
                    style={{ display: editorShow ? 'block' : 'none', margin: '5px 0 20px 0' }}
                >
                    <ArticleCommentEditor commentId={data.uuid} />
                </div>

                {/* 子回复栏 */}
                <div className='article-comment-single-content-reply'>
                    {data.replys && data.replys.map((item) => {
                        return (
                            <ArticleCommentSingle data={item} avatarSize='small' key={item.uuid} />
                        )
                    })}
                    {moreReply && moreReply.map((item) => {
                        return (
                            <ArticleCommentSingle data={item} avatarSize='small' key={item.uuid} />
                        )
                    })}
                    <Button
                        type="link"
                        style={{ display: data.replyTotal > 2 && moreReply === null ? 'block' : 'none' }}
                        onClick={loadMoreReply}
                    >
                        <DownOutlined />点击查看更多评论
                    </Button>
                </div>
            </div>
        </div>
    )
}
