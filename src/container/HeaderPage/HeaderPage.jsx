import { Menu, Layout, Input, Avatar } from 'antd';
import React, { useState, useEffect } from 'react';
import CreatorDropDown from '../../component/Header/CreatorDropDown/CreatorDropDown';
import { UserOutlined } from '@ant-design/icons';
import HeaderLogo from '../../component/Header/Logo/Logo'
import './HeaderPage.css'
import RingDropDown from '../../component/Header/RingDropDown/RingDropDown';
import { useNavigate, useLocation } from "react-router-dom";

const { Header } = Layout;
const { Search } = Input;

// 头部点击项配置
const items = [
  {
    label: '首页',
    key: 'mainpage'
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
  const navigate = useNavigate();
  const location = useLocation();

  // 点击事件导航并设置显示
  const onClick = (e) => {
    navigate(e.key);
    setChoosePage(e.key)
  };
  // 搜索框搜索事件
  const onSearch = (value) => {
    console.log(value)
  }



  useEffect(() => {
    // 设置menu刷新后根据路由显示,只需要在第一次初始化的时候使用
    setChoosePage(location.pathname.split('/')[1])
  })

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
