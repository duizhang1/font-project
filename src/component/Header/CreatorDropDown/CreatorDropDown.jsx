import React from 'react'
import { Dropdown } from 'antd';
import { DownOutlined,EditOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";


const items = [
    {
        label: '写文章',
        key: '1',
        icon: <EditOutlined />
    }
];


export default function CreatorDropDown() {

    const navigate = useNavigate();

    const handleMenuClick = (e) => {
        switch (e.key) {
            case '1':
                navigate('/mdeditor')
                break;
            default:
                return;
        }
    };

    const menuProps = {
        items,
        onClick: handleMenuClick
    };

    return (
        <Dropdown.Button menu={menuProps} trigger={['click']} icon={<DownOutlined />} type='primary'>
            创作者中心
        </Dropdown.Button>
    )
}
