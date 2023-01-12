import React from 'react'
import { Dropdown } from 'antd';
import { DownOutlined,EditOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import './CreatorDropDown.css'


const items = [
    {
        label: (<div className='dropdown-item-div'><EditOutlined style={{fontSize: '15px',margin: '4px 9px 0 0'}}/>写文章</div>),
        key: '/mdeditor',
    }
];


export default function CreatorDropDown() {

    const navigate = useNavigate();

    const handleMenuClick = (e) => {
        navigate(e.key)
    };

    const menuProps = {
        items,
        onClick: handleMenuClick
    };

    return (
        <Dropdown.Button
            menu={menuProps}
            trigger={['click']}
            icon={<DownOutlined />}
            type='primary'
            placement='bottomRight'
        >
            创作者中心
        </Dropdown.Button>
    )
}
