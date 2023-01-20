import React, { useRef, useState } from 'react'
import { Input, Button, Popover } from 'antd'
import { axiosReq } from '@src/util/request/axios';
import { SmileOutlined } from '@ant-design/icons';
import './ArticleCommentEditor.css'
import EmojiList from '../EmojiList/EmojiList';

const { TextArea } = Input

export default function ArticleCommentEditor() {

    const [inpData, setInputData] = useState('😀');
    const [popOpen, setPopOpen] = useState(false);
    const textAreaRef = useRef(null)

    const textareaChange = (e) => {
        setInputData(e.target.value)
    }

    const insertEmoji = (insText) => {
        let index = textAreaRef.current.resizableTextArea.textArea.selectionStart;
        const value = inpData ? inpData.slice(0, index) + insText + inpData.slice(index) : insText
        setInputData(value);
    }

    return (
        <div>
            <TextArea
                autoSize={{ minRows: 2, maxRows: 10 }}
                value={inpData}
                onChange={textareaChange}
                ref={textAreaRef}
                style={{ fontSize: '16px' }}
                placeholder="请输入评论内容后点击发布评论"
            />
            <div className='article-comment-editor-tool'>
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
                    <Button type="primary" size={'large'}>
                        发表评论
                    </Button>
                </div>
            </div>
        </div>
    )
}
