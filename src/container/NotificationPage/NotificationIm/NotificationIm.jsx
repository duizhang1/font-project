import NotificationImSlider from '@src/component/Slider/NotificationImSlider/NotificationImSlider'
import React, { useState, useEffect, useRef } from 'react'
import './NotificationIm.css'
import { Button, Empty, Input, message, Popover } from 'antd'
import EmojiList from '@src/component/Comment/EmojiList/EmojiList'
import { SmileTwoTone } from '@ant-design/icons'
import NotificationImRecordItem from '@src/component/ListItem/NotificationImRecordItem/NotificationImRecordItem'
import { chatRoomAddress } from '@src/util/request/config/wsInterface'
import { axiosReq } from '@src/util/request/axios'
import { connect } from 'react-redux'
import { nanoid } from 'nanoid'
import { timestampToTime } from '@src/util/TimeUtil'
import { incrNotificationUnreadImAction } from '@src/redux/action/NotificationUnreadCount'
import PropTypes from 'prop-types'

const { TextArea } = Input

function NotificationIm (props) {
  const { incrNotificationUnreadImAction } = props
  const ws = useRef()
  const [readyState, setReadyState] = useState('正在链接中')
  const [selectItem, setSelectItem] = useState({ userName: '', userId: '' })
  const [sliderData, setSliderData] = useState([])
  const [inpData, setInputData] = useState('')
  const [firstInit, setFirstInit] = useState(false)
  const selectItemRef = useRef()
  selectItemRef.current = selectItem
  const textAreaRef = useRef(null)
  const recordBottomRef = useRef(null)
  const recordboxRef = useRef(null)
  const [recordData, setRecordData] = useState([])

  function clickName () {
    const w = window.open('about:blank')
    w.location.href = '/home/user/' + selectItem.userId
  }

  const textareaChange = (e) => {
    setInputData(e.target.value)
  }

  const insertEmoji = (insText) => {
    const index = textAreaRef.current.resizableTextArea.textArea.selectionStart
    const value = inpData ? inpData.slice(0, index) + insText + inpData.slice(index) : insText
    setInputData(value)
  }

  const OnMessage = e => {
    const { message, data } = JSON.parse(e.data)
    if (message === 'addmsg') {
      data.imRecord.createTime = timestampToTime(new Date(data.imRecord.createTime))
      data.imRecord.updateTime = timestampToTime(new Date(data.imRecord.updateTime))
      // 如果是当前选中的用户添加消息
      if (data.toUserId === selectItemRef.current.userId) {
        // 更改左边栏的数据
        setSliderData((prev) => {
          const newlist = prev.map((item) => {
            if (item.toUserId === selectItemRef.current.userId) {
              data.count = item.count
              return data
            }
            return item
          })
          return newlist
        })
        // 更改聊天室内容
        setRecordData((prev) => {
          return [...prev, data]
        })
        axiosReq.get('/imRecord/readAll', { toUserId: selectItemRef.current.userId }).then(
          value => {

          },
          reason => {
            message.error(reason.message)
          }
        )
      } else {
        // 更改左边栏的数据
        setSliderData((prev) => {
          let flag = false
          let newlist = prev.map((item) => {
            if (data.toUserId === item.toUserId) {
              data.count = item.count + 1
              incrNotificationUnreadImAction(1)
              flag = true
              return data
            }
            return item
          })
          if (!flag) {
            newlist = [data, ...prev]
          }
          return newlist
        })
      }
    }
  }

  // 用来首次进行跳转到聊天记录尾部，以及消息接收时滑动到尾部
  useEffect(() => {
    if (!firstInit && recordBottomRef?.current) {
      recordBottomRef.current.scrollIntoView()
      setFirstInit(true)
      return
    }
    if (recordboxRef?.current && firstInit) {
      const { clientHeight, scrollHeight, scrollTop } = recordboxRef.current
      if (scrollTop + clientHeight + 200 > scrollHeight) {
        recordBottomRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [recordData])

  // 选择新聊天对象时重置滑动
  useEffect(() => {
    setFirstInit(false)
  }, [selectItem])

  useEffect(() => {
    const stateArr = [
      '正在链接中',
      '已经链接并且可以通讯',
      '连接正在关闭',
      '连接已关闭或者没有链接成功'
    ]
    if ((!ws.current) || ws.current.readyState === 3) {
      ws.current = new WebSocket(chatRoomAddress + `?token=${localStorage.getItem('token')}`)
      ws.current.onopen = _e =>
        setReadyState(stateArr[ws.current?.readyState ?? 0])
      ws.current.onclose = _e =>
        setReadyState(stateArr[ws.current?.readyState ?? 0])
      ws.current.onerror = e =>
        setReadyState(stateArr[ws.current?.readyState ?? 0])
      ws.current.onmessage = OnMessage
    }
    console.log(readyState)
    return () => {
      ws.current?.close()
    }
  }, [ws])

  useEffect(() => {
    if (selectItem.userName !== '') {
      axiosReq.get('/imRecord/getChatContent', { toUserId: selectItem.userId }).then(
        (value) => {
          setRecordData(value.data)
        },
        (reason) => {
          message.error(reason.message)
        }
      )
    }
  }, [selectItem])

  function clickSend () {
    if (inpData === null || inpData.length <= 0) {
      message.info('请输入内容后发送')
      return
    }
    const id = nanoid()
    const msg = {
      content: inpData,
      toUserId: selectItem.userId,
      uuid: id
    }
    ws.current?.send(JSON.stringify(msg))
    setInputData('')
  }

  return (
    <div className='notification-im-div'>
      <NotificationImSlider
        setSelectItem={setSelectItem}
        selectItem={selectItem}
        sliderData={sliderData}
        setSliderData={setSliderData}
      />
      <div className='notification-im-content'>
        {selectItem.userId === ''
          ? (<Empty description='请选择联系人进行对话' style={{ margin: '30px' }} />)
          : (
            <div>
              <div className='notification-im-header'>
                <div className='notification-im-header-name' onClick={clickName}>{selectItem.userName}</div>
              </div>
              <div
                className='notification-im-record own-scroll-div-css'
                ref={recordboxRef}
              >
                {recordData?.map((item) => {
                  return <NotificationImRecordItem key={item.imRecord.uuid} data={item} />
                })}
                <div ref={recordBottomRef}></div>
              </div>
              <div className='notification-im-tail'>
                <div style={{ display: 'flex', padding: '0 10px' }}>
                  <Popover
                    placement="bottomLeft"
                    title={<span style={{ fontSize: '15px', fontWeight: 'bold' }}>全部表情</span>}
                    content={<EmojiList insertEmoji={insertEmoji} />}
                    trigger='click'
                  >
                    <div className='notification-im-tool-emoji'>
                      <SmileTwoTone style={{ fontSize: '20px' }} />
                    </div>
                  </Popover>
                  <Button
                    type="primary"
                    style={{ marginLeft: 'auto', width: '70px', marginTop: '3px' }}
                    onClick={clickSend}
                  >
                    发送
                  </Button>
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
export default connect(
  state => ({
    userRedux: state.user
  }),
  { incrNotificationUnreadImAction }
)(NotificationIm)

NotificationIm.propTypes = {
  incrNotificationUnreadImAction: PropTypes.any
}
