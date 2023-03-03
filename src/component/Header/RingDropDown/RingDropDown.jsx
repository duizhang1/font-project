import React,{useEffect} from 'react'
import {Dropdown, Badge, message} from 'antd';
import { BellOutlined } from '@ant-design/icons'
import './RingDropDown.css'
import { useNavigate } from "react-router-dom";
import {axiosReq} from "@src/util/request/axios";
import {connect} from "react-redux";
import {setNotificationUnreadAction} from "@src/redux/action/NotificationUnreadCount";

function RingDropDown(props) {
    const {notificationUnreadRedux,setNotificationUnreadAction} = props
    let allCount = notificationUnreadRedux.likeCount+notificationUnreadRedux.commentCount
      +notificationUnreadRedux.focusCount+notificationUnreadRedux.imCount;

    const navigate = useNavigate()
    const items = [
        {
            key: '/notification/like',
            label: (
                <div style={{ width: '100px' }}>
                    <Badge count={notificationUnreadRedux.likeCount} offset={[58, 12]}>
                        <span className='ring-dropdown-span'>点赞</span>
                    </Badge>
                </div>
            ),
        },
        {
            key: '/notification/comment',
            label: (
                <div style={{ width: '100px' }}>
                    <Badge count={notificationUnreadRedux.commentCount} offset={[58, 12]}>
                        <span className='ring-dropdown-span'>评论</span>
                    </Badge>
                </div>
            ),
        },
        {
            key: '/notification/follow',
            label: (
                <div style={{ width: '100px' }}>
                    <Badge count={notificationUnreadRedux.focusCount} offset={[58, 12]}>
                        <span className='ring-dropdown-span'>关注</span>
                    </Badge>
                </div>
            ),
        },
        {
            key: '/notification/im',
            label: (
                <div style={{ width: '100px' }}>
                    <Badge count={notificationUnreadRedux.imCount} offset={[58, 12]}>
                        <span className='ring-dropdown-span'>私信</span>
                    </Badge>
                </div>
            ),
        },
        {
            key: '/notification/system',
            label: (
                <div style={{ width: '100px' }}>
                    <Badge count={999} offset={[30, 12]}>
                        <span className='ring-dropdown-span'>系统消息</span>
                    </Badge>
                </div>
            ),
        },
    ];


    // 获得未读消息
    useEffect(()=>{
        axiosReq.get("/notificationUnread/getNotificationUnreadCount",{}).then(
          (value) =>{
              setNotificationUnreadAction(value.data)
          },
          (reason) =>{
              message.error(reason.message)
          }
        )
    },[]);

    function clickRingIcon(e) {
        navigate('/notification/like')
    }

    function clickDropDown(params) {
        navigate(params.key)
    }
    const menuProps = {
        items,
        onClick: clickDropDown
    }

    return (
        <Dropdown
            menu={menuProps}
            placement="bottom"
            arrow
        >
            <Badge count={allCount} offset={[6,-6]}>
                <BellOutlined style={{ fontSize: '20px', cursor: 'pointer' }} onClick={clickRingIcon} />
            </Badge>
        </Dropdown>
    )
}
export default connect(
  state =>({
    notificationUnreadRedux: state.notificationUnread
  }),
  {setNotificationUnreadAction}
)(RingDropDown)