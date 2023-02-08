import React from 'react'
import { Layout } from 'antd';
import HeaderLogo from '@src/component/Header/Logo/Logo'
import AvatarAndLogin from '@src/component/Avatar/AvatarAndLogin/AvatarAndLogin';
import RingDropDown from '@src/component/Header/RingDropDown/RingDropDown';
import './CreatorHeader.css'

const { Header } = Layout;

export default function CreatorHeader() {
    return (
        <Header className='creator-header-div-setting'>
            <HeaderLogo />
            <div className='creator-header-span-name'>
                创作者中心
            </div>

            <div className='creator-header-avatar-set'>
                <AvatarAndLogin />
            </div>

            <div className='creator-header-ringdd-set'>
                <RingDropDown />
            </div>

        </Header>
    )
}
