import React from 'react'
import { Dropdown, message, } from 'antd';
import { DownOutlined } from '@ant-design/icons';


const handleMenuClick = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
};
const items = [
    {
        label: '1st menu item',
        key: '1',
    }
];

const menuProps = {
    items,
    onClick: handleMenuClick
};

export default function CreatorDropDown() {

    return (
        <Dropdown.Button menu={menuProps} trigger={['click']} icon={<DownOutlined />} type='primary'>
            创作者中心
        </Dropdown.Button>
    )
}
