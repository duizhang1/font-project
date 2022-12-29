import React from 'react'
import HeaderPage from './container/HeaderPage/HeaderPage'
import { Layout,BackTop } from 'antd'
import './App.css'
import MainPage from './container/MainPage/MainPage'
import { Route, Routes } from 'react-router-dom'
import ArticlePage from './container/ArticlePage/ArticlePage'

export default function App() {
  return (
    <Layout>
      <HeaderPage />
      <Routes>
        <Route path='/mainpage' element={<MainPage />} />
        <Route path='/post/:id' element={<ArticlePage/>}/>
        <Route path='/*' element={<MainPage />}/>
      </Routes>
      <BackTop />
    </Layout>
  )
}