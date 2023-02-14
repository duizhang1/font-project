import React from 'react'
import { Dropdown } from 'antd';
import { DownOutlined,EditOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import './CreatorDropDown.css'


const items = [
    {
        label: (<div className='dropdown-item-div'><EditOutlined style={{fontSize: '15px',margin: '4px 9px 0 0'}}/>写文章</div>),
        key: '/mdeditor/new',
    }
];


export default function CreatorDropDown() {

    const navigate = useNavigate();

    const handleMenuClick = (e) => {
        navigate(e.key)
    };

    const clickCreator = (e) => {
        navigate('/creator/home')
    }

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
            onClick={clickCreator}
        >
            创作者中心
        </Dropdown.Button>
    )
}
