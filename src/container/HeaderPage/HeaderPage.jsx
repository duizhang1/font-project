import { Menu,Layout } from 'antd';
import React, { useState } from 'react';
import HeaderLogo from '../../component/HeaderLogo/HeaderLogo'
const { Header } = Layout;

// 头部点击项配置
const items = [
  {
    label: '首页',
    key: 'mainPage'
  },
  {
    label: '首页1',
    key: 'mainPage1'
  },
  {
    label: '首页2',
    key: 'mainPage2'
  },
];

export default function HeaderPage() {
  const [choosePage, setChoosePage] = useState('mainPage');
  const onClick = (e) => {
    setChoosePage(e.key);
  };
  return (
    <Header className='header'>
      <HeaderLogo/>
      <Menu theme='dark' onClick={onClick} selectedKeys={[choosePage]} mode="horizontal" items={items} />

    </Header>
  );
}
