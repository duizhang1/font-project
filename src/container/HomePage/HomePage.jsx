import React from 'react'
import HeaderPage from './HeaderPage/HeaderPage'
import { Layout,BackTop } from 'antd'
import MainPage from './MainPage/MainPage'
import { Route, Routes } from 'react-router-dom'
import ArticlePage from './ArticlePage/ArticlePage'
import './HomePage.css'

export default function HomePage() {
  return (
    <Layout>
      <HeaderPage />
      <Routes path='/home'>
        <Route path='/mainpage' element={<MainPage />} />
        <Route path='/post/:id' element={<ArticlePage/>}/>
        <Route path='/*' element={<MainPage />}/>
      </Routes>
      <BackTop />
    </Layout>
  )
}
