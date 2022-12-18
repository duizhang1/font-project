import { Menu, Layout, Input, Avatar } from 'antd';
import React, { useState } from 'react';
import CreatorDropDown from '../../component/Header/CreatorDropDown/CreatorDropDown';
import { UserOutlined } from '@ant-design/icons';
import HeaderLogo from '../../component/Header/Logo/Logo'
import './HeaderPage.css'
import RingDropDown from '../../component/Header/RingDropDown/RingDropDown';

const { Header } = Layout;
const { Search } = Input;

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
  const onSearch = (value) => {
    console.log(value)
  }
  return (
    <Header className='header header-setting'>
      <HeaderLogo />

      <Menu onClick={onClick} selectedKeys={[choosePage]} mode="horizontal" items={items} className='menu-set' />

      <div className='avatar-set'>
        <Avatar size="large" icon={<UserOutlined />} />
      </div>

      <div className='ringdd-set'>
        <RingDropDown />
      </div>

      <div className='creatordd-set'>
        <CreatorDropDown />
      </div>

      <Search placeholder="探索NotNull社区" onSearch={onSearch} className='search-set' />

    </Header>
  );
}
