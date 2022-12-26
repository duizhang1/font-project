import React from 'react'
import HeaderPage from './container/HeaderPage/HeaderPage'
import { Layout } from 'antd'
import './App.css'
import MainPage from './container/MainPage/MainPage'
import { Route, Routes } from 'react-router-dom'

export default function App() {
  return (
    <Layout>
      <HeaderPage />
      <Routes>
        <Route path='/mainpage' element={<MainPage />} />
        <Route path='/*' element={<MainPage />}/>
      </Routes>
    </Layout>
  )
}