import React from 'react'
import HeaderPage from './container/HeaderPage/HeaderPage'
import { Layout } from 'antd'
import './App.css'
import MainPage from './container/MainPage/MainPage'

export default function App() {
  return (
    <Layout>
      <HeaderPage />
      <MainPage/>
    </Layout>
  )
}