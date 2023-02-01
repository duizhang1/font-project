import { Menu, Layout, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import CreatorDropDown from '@src/component/Header/CreatorDropDown/CreatorDropDown';
import HeaderLogo from '@src/component/Header/Logo/Logo'
import './CommonHeader.css'
import RingDropDown from '@src/component/Header/RingDropDown/RingDropDown';
import { useNavigate, useLocation } from "react-router-dom";
import AvatarAndLogin from '@src/component/Header/AvatarAndLogin/AvatarAndLogin';

const { Header } = Layout;
const { Search } = Input;

// 头部点击项配置
const items = [
  {
    label: '首页',
    key: 'mainpage'
  }
];


export default function HeaderPage() {
  const [choosePage, setChoosePage] = useState('mainPage');
  const navigate = useNavigate();
  const location = useLocation();

  // 点击事件导航并设置显示
  const onClick = (e) => {
    navigate(`/home/${e.key}`);
    setChoosePage(e.key)
  };
  // 搜索框搜索事件
  const onSearch = (value) => {
    console.log(value)
  }



  useEffect(() => {
    // 设置menu刷新后根据路由显示,只需要在第一次初始化的时候使用
    if (location.pathname.split('/')[1] === undefined || location.pathname.split('/')[1] === '') {
      setChoosePage('mainpage')
    } else {
      setChoosePage(location.pathname.split('/')[1])
    }
  },[])

  return (
    <Header className='header header-setting'>
      <HeaderLogo />

      <Menu onClick={onClick} selectedKeys={[choosePage]} mode="horizontal" items={items} className='menu-set' />

      <div className='avatar-set'>
        <AvatarAndLogin/>
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
