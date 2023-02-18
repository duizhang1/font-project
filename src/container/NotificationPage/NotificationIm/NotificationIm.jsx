import NotificationImSlider from '@src/component/Slider/NotificationImSlider/NotificationImSlider'
import React, { useState, useEffect, useRef } from 'react'
import './NotificationIm.css'
import { Button, Empty, Input, Popover } from 'antd';
import EmojiList from '@src/component/Comment/EmojiList/EmojiList';
import { SmileTwoTone } from '@ant-design/icons';
import NotificationImRecordItem from '@src/component/ListItem/NotificationImRecordItem/NotificationImRecordItem';

const { TextArea } = Input

export default function NotificationIm() {
    // const wsAddress = 'ws://api/chatroom'
    // let ws = new WebSocket(wsAddress);
    const [selectItem, setSelectItem] = useState({ userName: '', userId: '' })
    const [inpData, setInputData] = useState('');
    const textAreaRef = useRef(null)

    function clickName() {
        const w = window.open('about:blank');
        w.location.href = '/home/user/' + selectItem.userId
    }

    const textareaChange = (e) => {
        setInputData(e.target.value)
    }

    const insertEmoji = (insText) => {
        let index = textAreaRef.current.resizableTextArea.textArea.selectionStart;
        const value = inpData ? inpData.slice(0, index) + insText + inpData.slice(index) : insText
        setInputData(value);
    }

    return (
        <div className='notification-im-div'>
            <NotificationImSlider setSelectItem={setSelectItem} selectItem={selectItem} />
            <div className='notification-im-content'>
                {selectItem.userId === '' ?
                    (<Empty description='请选择联系人进行对话' style={{ margin: '30px' }} />) :
                    (
                        <div>
                            <div className='notification-im-header'>
                                <div className='notification-im-header-name' onClick={clickName}>{selectItem.userName}</div>
                            </div>
                            <div className='notification-im-record own-scroll-div-css'>
                                <NotificationImRecordItem />
                                <NotificationImRecordItem />
                                <NotificationImRecordItem />
                                <NotificationImRecordItem />
                                <NotificationImRecordItem />
                                <NotificationImRecordItem />
                                <NotificationImRecordItem />
                                <NotificationImRecordItem />
                            </div>
                            <div className='notification-im-tail'>
                                <div style={{display: 'flex',padding: '0 10px'}}>
                                    <Popover
                                        placement="bottomLeft"
                                        title={<span style={{ fontSize: '15px', fontWeight: 'bold' }}>全部表情</span>}
                                        content={<EmojiList insertEmoji={insertEmoji} />}
                                        trigger='click'
                                    >
                                        <div className='notification-im-tool-emoji'>
                                            <SmileTwoTone style={{fontSize: '20px'}}/>
                                        </div>
                                    </Popover>
                                    <Button type="primary" style={{marginLeft: 'auto',width: '70px',marginTop: '3px'}}>发送</Button>
                                </div>
                                <TextArea
                                    autoSize={{ minRows: 4, maxRows: 4 }}
                                    value={inpData}
                                    onChange={textareaChange}
                                    ref={textAreaRef}
                                    style={{ fontSize: '16px' }}
                                />
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
