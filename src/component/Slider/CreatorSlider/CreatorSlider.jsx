import AvatarAndName from '@src/component/Avatar/AvatarAndName/AvatarAndName'
import { Button, Menu } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './CreatorSlider.css'
import { CloudServerOutlined ,HomeOutlined,BarsOutlined } from '@ant-design/icons';

// menu项
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('首页', 'home', <HomeOutlined />),
    getItem('内容管理', 'content', <BarsOutlined />, [
        getItem('文章管理', 'article'),
    ]),
    getItem('数据中心', 'data', <CloudServerOutlined />, [
        getItem('内容数据', 'artdata'),
        getItem('关注者数据','focusdata')
    ]),
];

export default function CreatorSlider() {

    const navigate = useNavigate()

    function toCreateArticle() {
        navigate('/mdeditor/new')
    }

    function clickMenuItem(item) {
        navigate(`/creator/${item.key}`)
    }

    return (
        <div className='creator-slider-div'>
            <div className='creator-slider-avatar-btn-div'>
                <AvatarAndName />
                <Button
                    type="primary"
                    size='large'
                    onClick={toCreateArticle}
                    style={{
                        margin: '15px 0 15px 30px',
                        width: '150px',
                        borderRadius: '15px'
                    }}
                >
                    写文章
                </Button>
            </div>
            <div className='own-scroll-div-css creator-slider-menu-div'>
                <Menu
                    onClick={clickMenuItem}
                    style={{
                        width: 240,
                    }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    items={items}
                />
            </div>
        </div>
    )
}
