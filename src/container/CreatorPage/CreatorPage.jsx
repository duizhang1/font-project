import React from 'react'
import { Layout } from 'antd'
import CreatorHeader from '@src/component/Header/CreatorHeader/CreatorHeader'
import CreatorSlider from '@src/component/Slider/CreatorSlider/CreatorSlider'
import './CreatorPage.css'
import { Outlet } from 'react-router-dom'

const { Content } = Layout

export default function CreatorPage() {
    return (
        <Layout>
            <div className='creator-page-header'>
                <CreatorHeader />
            </div>
            <Content className='creator-page-content'>
                <div className='creator-page-slider'>
                    <CreatorSlider />
                </div>
                <div className='creator-page-main'>
                    <Outlet />
                </div>
            </Content>
        </Layout>
    )
}
