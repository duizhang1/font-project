import { Menu, Layout, Input } from 'antd';
import React, { useState } from 'react';
import CreatorDropDown from '../../component/Header/CreatorDropDown/CreatorDropDown';
import AvatarLoc from '../../component/Header/Avatar/AvatarLoc';
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

      <AvatarLoc className='avatar-set' />

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
