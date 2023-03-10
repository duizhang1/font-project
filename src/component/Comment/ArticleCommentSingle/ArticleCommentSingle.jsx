import { Avatar, Space, Button, message, Popconfirm } from 'antd'
import React, { useState, useEffect } from 'react'
import { LikeOutlined, CommentOutlined, LikeTwoTone, DownOutlined } from '@ant-design/icons';
import './ArticleCommentSingle.css'
import ArticleCommentEditor from '../ArticleCommentEditor/ArticleCommentEditor';
import { axiosReq } from '@src/util/request/axios';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';

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

function ArticleCommentSingle(props) {

    const {
        data,
        avatarSize = 'large',
        childSize,
        setUpdateArticleComment,
        parentCommentId = null,
        isChild = false,
        userRedux
    } = props
    const [likeNumber, setLikeNumber] = useState(data.likeNumber)
    const [liked, setLiked] = useState(data.likeState === 1)
    const [editorShow, setEditorShow] = useState(false)
    const [moreReply, setMoreReply] = useState(null)
    const [hasMore, setHasMore] = useState(data.hasMore)

    function clickLike() {
        axiosReq.get('/articleComment/likeArticleComment', { commentId: data.uuid }).then(
            (value) => {

            },
            (reason) => {
                message.error(reason.message)
                setLikeNumber(likeNumber - 1)
                setLiked(false)
            }
        )
        setLikeNumber(likeNumber + 1)
        setLiked(true)
    }

    function clickDisLike() {
        axiosReq.get('/articleComment/dislikeArticleComment', { commentId: data.uuid }).then(
            (value) => {
                
            },
            (reason) => {
                message.error(reason.message)
                setLikeNumber(likeNumber + 1)
                setLiked(true)
            }
        )
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
                        text={likeNumber === 0 ? '??????' : likeNumber}
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
        axiosReq.get('/articleComment/loadMoreReply', { articleCommentId: data.uuid, childSize }).then(
            (value) => {
                setMoreReply(value.data);
                setHasMore(false);
            },
            (reason) => {
                message.error(reason.message)
            }
        )
    }

    function deleteComment() {
        axiosReq._delete('/articleComment/deleteArticleComment', { commentId: data.uuid }).then(
            (value) => {
                message.info(value.message)
                setUpdateArticleComment(nanoid())
            },
            (reason) => {
                message.error(reason.message)
            }
        )
    }

    function isCanDelete() {
        if (data && userRedux && data.userId === userRedux.uuid) {
            return (
                <div
                    style={{ cursor: 'pointer', marginRight: '25px' }}
                >
                    <Popconfirm title="???????????????" cancelText='??????' onConfirm={deleteComment}>
                        <Button
                            type="link"
                            style={{ margin: '-10px 0 0 -15px', color: 'black' }}
                        >
                            ??????
                        </Button>
                    </Popconfirm>
                </div>
            )
        }
        return ''
    }

    return (
        <div className='article-comment-single-div'>
            <Avatar
                src={data.avatarHref}
                size={avatarSize}
                style={{ cursor: 'pointer' }}
                onClick={clickItem(data.userId)}
            />
            <div className='article-comment-single-content'>
                {/* ???????????????div */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div
                        onClick={clickItem(data.userId)}
                        className='article-comment-single-content-username'
                    >
                        {data.userName}
                        {data.replyCommentId !== null && data.replyCommentId !== '' ? ` ?????? ${data.replyUserName}` : ''}
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                        {data.createTime}
                    </div>
                </div>

                {/* ??????div */}
                <div
                    className='article-comment-single-content-comment'
                >
                    {data.comment}
                </div>

                {/* ??????????????????????????? */}
                <div className='article-comment-single-content-tool'>
                    {isLikeOrNot()}
                    <div
                        onClick={clickComment}
                        style={{ cursor: 'pointer', marginRight: '25px' }}
                    >
                        <IconText
                            icon={CommentOutlined}
                            text='??????'
                            key="list-vertical-reply-o"
                        />
                    </div>
                    {isCanDelete()}
                </div>

                {/* ???????????????????????? */}
                <div
                    style={{ display: editorShow ? 'block' : 'none', margin: '5px 0 20px 0' }}
                >
                    <ArticleCommentEditor
                        parentCommentId={parentCommentId}
                        replyCommentId={isChild ? data.uuid : null}
                        setUpdateArticleComment={setUpdateArticleComment}
                        setEditorShow={setEditorShow}
                    />
                </div>

                {/* ???????????? */}
                <div className='article-comment-single-content-reply'
                    style={{ display: data.childCommentList && data.childCommentList.length <= 0 ? 'none' : 'block' }}
                >
                    {data.childCommentList && data.childCommentList.map((item) => {
                        return (
                            <ArticleCommentSingle
                                parentCommentId={data.uuid}
                                data={item}
                                avatarSize='small'
                                key={item.uuid}
                                setUpdateArticleComment={setUpdateArticleComment}
                                isChild
                                userRedux={userRedux}
                            />
                        )
                    })}
                    {moreReply && moreReply.map((item) => {
                        return (
                            <ArticleCommentSingle
                                parentCommentId={data.uuid}
                                data={item}
                                avatarSize='small'
                                key={item.uuid}
                                setUpdateArticleComment={setUpdateArticleComment}
                                isChild
                                userRedux={userRedux}
                            />
                        )
                    })}
                    <Button
                        type="link"
                        style={{ display: hasMore ? 'block' : 'none' }}
                        onClick={loadMoreReply}
                    >
                        <DownOutlined />????????????????????????
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default connect(
    (state) => ({
        userRedux: state.user
    }),
    {}
)(ArticleCommentSingle)