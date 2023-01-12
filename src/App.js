import React,{useEffect} from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './container/HomePage/HomePage'
import MdEditorPage from './container/MdEditorPage/MdEditorPage'
import LoginModal from './component/Modal/LoginModal/LoginModal'
import RegisterModal from './component/Modal/RegisterModal/RegisterModal'
import { message } from 'antd'
import { connect } from 'react-redux'
import { setUserInfoAction,clearUserInfoAction } from './redux/action/User'
const { axiosReq } = require('./request/axios')

function App(props) {
  const { userRedux,setUserInfoAction,clearUserInfoAction } = props

  // 校验登陆，已登陆直接获取用户信息存入redux
  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      axiosReq.get('/user/getCurrentUser').then(
        (value) => { 
          setUserInfoAction(value.data)
        },
        (reason) => {
          clearUserInfoAction()
          localStorage.removeItem('token')
        }
      )
    }
  },[])

  return (
    <div>
      <Routes>
        <Route path='/home/*' element={<HomePage />} />
        <Route path='/mdeditor' element={<MdEditorPage />} />
        <Route path='/*' element={<HomePage />} />
      </Routes>
      <LoginModal/>
      <RegisterModal/>
    </div>
  )
}

export default connect(
  store => ({
    userRedux: store.user
  }),
  { setUserInfoAction,clearUserInfoAction }
)(App)