import React from 'react'
import { Dropdown, Badge } from 'antd';
import { BellOutlined } from '@ant-design/icons'
import './RingDropDown.css'
import { useNavigate } from "react-router-dom";

export default function RingDropDown() {
    const navigate = useNavigate()
    const items = [
        {
            key: '/notification',
            label: (
                <div style={{ width: '100px' }}>
                    <Badge count={9} offset={[58, 12]}>
                        <span className='ring-dropdown-span'>点赞</span>
                    </Badge>
                </div>
            ),
        },
        {
            key: '/notification/comment',
            label: (
                <div style={{ width: '100px' }}>
                    <Badge count={9} offset={[58, 12]}>
                        <span className='ring-dropdown-span'>评论</span>
                    </Badge>
                </div>
            ),
        },
        {
            key: '/notification/follow',
            label: (
                <div style={{ width: '100px' }}>
                    <Badge count={9} offset={[58, 12]}>
                        <span className='ring-dropdown-span'>关注</span>
                    </Badge>
                </div>
            ),
        },
        {
            key: '/notification/im',
            label: (
                <div style={{ width: '100px' }}>
                    <Badge count={9} offset={[58, 12]}>
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
            <Badge count={999} offset={[6,-6]}>
                <BellOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
            </Badge>
        </Dropdown>
    )
}
