import React from 'react'
import CommonHeader from './CommonHeader/CommonHeader'
import { Layout,BackTop } from 'antd'
import { Outlet } from 'react-router-dom'
import './HomePage.css'

export default function HomePage() {
  return (
    <Layout>
      <CommonHeader />
      <Outlet/>
      <BackTop />
    </Layout>
  )
}
