import React, { useRef, useState } from 'react'
import { Input, Button, Popover, Spin, message } from 'antd'
import { axiosReq } from '@src/util/request/axios';
import { SmileOutlined } from '@ant-design/icons';
import './ArticleCommentEditor.css'
import EmojiList from '../EmojiList/EmojiList';
import { connect } from 'react-redux';
import { loginShowAction } from '@src/redux/action/Login'
import { useParams } from 'react-router-dom';
import { nanoid } from 'nanoid'

const { TextArea } = Input

function ArticleCommentEditor(props) {
    const {
        userRedux,
        loginShowAction,
        parentCommentId,
        replyCommentId = null,
        setUpdateArticleComment,
        setEditorShow
    } = props
    const [inpData, setInputData] = useState('');
    const textAreaRef = useRef(null)
    const { id } = useParams();

    const spinIndicator = (
        <div className='article-comment-editor-spin' onClick={(e) => { loginShowAction() }}>
            <span className='article-comment-editor-spin-span'>请先登录</span>
        </div>
    )

    const textareaChange = (e) => {
        setInputData(e.target.value)
    }

    const insertEmoji = (insText) => {
        let index = textAreaRef.current.resizableTextArea.textArea.selectionStart;
        const value = inpData ? inpData.slice(0, index) + insText + inpData.slice(index) : insText
        setInputData(value);
    }

    function submitComment() {
        const param = {
            comment: inpData,
            userId: userRedux.uuid,
            articleId: id,
            parentCommentId,
            replyCommentId
        }
        axiosReq.post('/articleComment/createArticleComment', param).then(
            (value) => {
                message.info(value.message)
                setUpdateArticleComment(nanoid())
                setEditorShow(false)
            },
            (reason) => {
                message.error(reason.message)
            }
        )
    }

    return (
        <div style={{ width: '100%' }}>
            <Spin
                indicator={spinIndicator}
                style={{ backgroundColor: 'rgba(215, 215, 215, 0.2)', borderRadius: '15px' }}
                spinning={userRedux.uuid === ''}
            >
                <TextArea
                    autoSize={{ minRows: 2, maxRows: 10 }}
                    value={inpData}
                    onChange={textareaChange}
                    ref={textAreaRef}
                    style={{ fontSize: '16px', borderRadius: '15px' }}
                    placeholder="请输入评论内容后点击发布评论"
                />
            </Spin>
            <div className='article-comment-editor-tool' style={{ display: userRedux.uuid === '' ? 'none' : 'block' }}>
                <Popover
                    placement="bottomLeft"
                    title={<span style={{ fontSize: '15px', fontWeight: 'bold' }}>全部表情</span>}
                    content={<EmojiList insertEmoji={insertEmoji} />}
                    trigger='click'
                >
                    <div className='article-comment-editor-tool-emoji'>
                        <SmileOutlined />
                        表情
                    </div>
                </Popover>
                <div className='article-comment-editor-tool-btn'>
                    <Button
                        type="primary"
                        size={'middle'}
                        disabled={(inpData ? inpData.trim().length > 0 ? false : true : true)}
                        onClick={submitComment}
                    >
                        发表评论
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default connect(
    state => ({
        userRedux: state.user
    }),
    { loginShowAction }
)(ArticleCommentEditor)