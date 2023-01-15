import React,{Suspense,lazy,useEffect} from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './container/HomePage/HomePage'
import LoginModal from './component/Modal/LoginModal/LoginModal'
import RegisterModal from './component/Modal/RegisterModal/RegisterModal'
import { connect } from 'react-redux'
import { setUserInfoAction, clearUserInfoAction } from './redux/action/User'
import LazyLoading from './component/Loading/LazyLoading'

const { axiosReq } = require('@src/util/request/axios')
const MdEditorPage = lazy(() => import('./container/MdEditorPage/MdEditorPage'))

function App(props) {
  const { setUserInfoAction,clearUserInfoAction } = props

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
        <Route path='/mdeditor/:id' element={<Suspense fallback={(<LazyLoading/>)}><MdEditorPage /></Suspense>} />
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