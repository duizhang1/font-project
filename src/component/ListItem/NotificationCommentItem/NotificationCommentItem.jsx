import AvatarOrDefault from '@src/component/Avatar/AvatarOrDefalut/AvatarOrDefault'
import { LikeOutlined, CommentOutlined, LikeTwoTone, DownOutlined } from '@ant-design/icons';
import React from 'react'
import './NotificationCommentItem.css'
import { Avatar, message, Space } from 'antd'
import { useState } from 'react'
import { axiosReq } from '@src/util/request/axios'
import ArticleCommentEditor from '@src/component/Comment/ArticleCommentEditor/ArticleCommentEditor';

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

export default function NotificationCommentItem(props) {
    const {data} = props
    const avatarSize = 'large'
    // const data = {
    //     userId: 's',
    //     userName: '队长123534846',
    //     avatarHref: 'https://p3-passport.byteimg.com/img/mosaic-legacy/3795/3033762272~180x180.awebp',
    //     articleId: 'c3f9b85a896a3bad2c5e3eddf5b57449',
    //     articleTitle: 'JUC自定义线程池练习',
    //     replyComment: false,
    //     likeState: '1',
    //     comment: '行不行啊？细狗!ssssssssssssssssssssssssssssswsssssssssssssssssdddddddddddddddddddddddddddddddddddddddddd',
    //     createTime: '2023-02-06 19:27',
    //     uuid: '9999999',
    //     parentCommentId: '888888',
    // }
    const [liked, setLiked] = useState(data.likeState === 1)
    const [editorShow, setEditorShow] = useState(false)

    function clickLike() {
        axiosReq.get('/articleComment/likeArticleComment', { commentId: data.articleComment.uuid }).then(
            (value) => {

            },
            (reason) => {
                message.error(reason.message)
                setLiked(false)
            }
        )
        setLiked(true)
    }

    function clickDisLike() {
        axiosReq.get('/articleComment/dislikeArticleComment', { commentId: data.articleComment.uuid }).then(
            (value) => {

            },
            (reason) => {
                message.error(reason.message)
                setLiked(true)
            }
        )
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
                        text='点赞'
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
                        text={'点赞'}
                        key="list-vertical-like-o"
                    />
                </div>
            )
        }
    }

    function clickComment() {
        setEditorShow(!editorShow)
    }

    return (
        <div className='notification-comment-item-div'>
            <Avatar
                src={data.avatar}
                size={avatarSize}
                style={{ cursor: 'pointer', minWidth: '40px' }}
                onClick={clickItem(data.userId)}
            />
            <div className='notification-comment-item-content'>
                <div className='notification-comment-item-content-title'>
                    <a
                        href={`/user/${data.userId}`}
                        style={{
                            textDecoration: 'none',
                            color: 'black',
                            margin: '0 5px 0 0'
                        }}
                    >
                        {data.username}
                    </a>
                    {data.articleComment.parentCommentId ? '回复了你在' : '评论了你的文章'}
                    <a
                        href={`/home/post/${data.articleId}`}
                        style={{
                            margin: '0 5px 0 5px'
                        }}
                    >
                        {data.title}
                    </a>
                    {data.articleComment.parentCommentId ? '的评论' : ''}
                </div>
                <div className='notification-comment-item-content-comment'>
                    {data.articleComment.comment}
                </div>
                <div className='notification-comment-item-content-comment-bottom'>
                    <span
                        style={{
                        color: '#8a9aa9'
                        }}
                    >
                        {data.articleComment.createTime}
                    </span>
                    <div className='notification-comment-item-content-comment-tool'>
                        {isLikeOrNot()}
                        <div
                            onClick={clickComment}
                            style={{ cursor: 'pointer', marginRight: '0' }}
                        >
                            <IconText
                                icon={CommentOutlined}
                                text='回复'
                                key="list-vertical-reply-o"
                            />
                        </div>
                    </div>
                </div>
                {/* 回复栏，默认隐藏 */}
                <div
                    style={{ display: editorShow ? 'block' : 'none', margin: '5px 0 20px 0' }}
                >
                    <ArticleCommentEditor
                        parentCommentId={data.articleComment.parentCommentId ? data.articleComment.parentCommentId : data.articleComment.uuid}
                        replyCommentId={data.articleComment.parentCommentId ? data.articleComment.uuid : null}
                        setUpdateArticleComment={(e) => { }}
                        setEditorShow={setEditorShow}
                        articleId={data.articleId}
                    />
                </div>
            </div>
        </div>
    )
}
