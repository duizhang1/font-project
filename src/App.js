import React, { Suspense, lazy, useEffect } from 'react'
import './App.css'
import { Route, Routes,Navigate } from 'react-router-dom'
import HomePage from './container/HomePage/HomePage'
import LoginModal from './component/Modal/LoginModal/LoginModal'
import RegisterModal from './component/Modal/RegisterModal/RegisterModal'
import { connect } from 'react-redux'
import { setUserInfoAction, clearUserInfoAction } from './redux/action/User'
import LazyLoading from '@src/component/Loading/LazyLoading/LazyLoading'


const { axiosReq } = require('@src/util/request/axios')
const MdEditorPage = lazy(() => import('./container/MdEditorPage/MdEditorPage'))
const MainPage = lazy(() => import('./container/HomePage/MainPage/MainPage'))
const ArticlePage = lazy(() => import('./container/HomePage/ArticlePage/ArticlePage'))
const CreatorPage = lazy(() => import('./container/CreatorPage/CreatorPage'))
const CreatorHome = lazy(() => import('./container/CreatorPage/CreatorHome/CreatorHome'))
const CreatorArtData = lazy(() => import('./container/CreatorPage/CreatorArtData/CreatorArtData'))
const CreatorArtSummary = lazy(() => import('./container/CreatorPage/CreatorArtSummary/CreatorArtSummary'))
const CreatorFocusSummary = lazy(() => import('./container/CreatorPage/CreatorFocusSummary/CreatorFocusSummary'))
const NotificationPage = lazy(() => import('./container/NotificationPage/NotificationPage'))
const NotificationLike = lazy(() => import('./container/NotificationPage/NotificationLike/NotificationLike'))
const NotificationComment = lazy(() => import('./container/NotificationPage/NotificationComment/NotificationComment'))
const NotificationFocus = lazy(() => import('./container/NotificationPage/NotificationFocus/NotificationFocus'))
const NotificationIm = lazy(() => import('./container/NotificationPage/NotificationIm/NotificationIm'))
const UserPage = lazy(() => import('./container/UserPage/UserPage'))
const UserTabsMsgCard = lazy(()=> import('./container/UserPage/UserLeftBox/UserTabsCard/UserTabsMsgCard/UserTabsMsgCard'))
const UserTabsRedirect = lazy(() => import('./container/UserPage/UserLeftBox/UserTabsCard/UserTabsRedirect/UserTabsRedirect'))
const UserTabArticleCard = lazy(()=> import('./container/UserPage/UserLeftBox/UserTabsCard/UserTabArticleCard/UserTabArticleCard'))

function App(props) {
  const { setUserInfoAction, clearUserInfoAction } = props

  // ??????????????????????????????????????????????????????redux
  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      axiosReq.get('/user/getCurrentUser').then(
        (value) => {
          setUserInfoAction(value.data)
        },
        (reason) => {
          clearUserInfoAction()
          // localStorage.removeItem('token')
        }
      )
    }
  }, [])

  return (
    <div>
      <Routes>
        <Route path='/home' element={<HomePage />} >
          <Route path='/home/sort/:sortRoute' element={<Suspense fallback={(<LazyLoading />)}><MainPage /></Suspense>} />
          <Route path='/home/post/:id' element={<Suspense fallback={(<LazyLoading />)}><ArticlePage /></Suspense>} />
          <Route path='/home/*' element={<Navigate to='/home/sort/all' />} />
        </Route>
        <Route path='/mdeditor/:id' element={<Suspense fallback={(<LazyLoading />)}><MdEditorPage /></Suspense>} />
        <Route path='/creator' element={<Suspense fallback={(<LazyLoading />)}><CreatorPage /></Suspense>} >
          <Route path='/creator/home' element={<Suspense fallback={(<LazyLoading />)}><CreatorHome /></Suspense>} />
          <Route path='/creator/article' element={<Suspense fallback={(<LazyLoading />)}><CreatorArtData /></Suspense>} />
          <Route path='/creator/artdata' element={<Suspense fallback={(<LazyLoading />)}><CreatorArtSummary /></Suspense>} />
          <Route path='/creator/focusdata' element={<Suspense fallback={(<LazyLoading />)}><CreatorFocusSummary /></Suspense>} />
          <Route path='/creator/*' element={<Navigate to='/creator/home' />} />
        </Route>
        <Route path='/notification' element={<Suspense fallback={(<LazyLoading />)}><NotificationPage /></Suspense>}>
          <Route path='/notification/like' element={<Suspense fallback={(<LazyLoading />)}><NotificationLike /></Suspense>} />
          <Route path='/notification/comment' element={<Suspense fallback={(<LazyLoading />)}><NotificationComment /></Suspense>} />
          <Route path='/notification/focus' element={<Suspense fallback={(<LazyLoading />)}><NotificationFocus /></Suspense>} />
          <Route path='/notification/im' element={<Suspense fallback={(<LazyLoading />)}><NotificationIm /></Suspense>} />
          <Route path='/notification/*' element={<Navigate to='/notification/like' />} />
        </Route>
        <Route path='/user/:userId' element={<Suspense fallback={(<LazyLoading />)}><UserPage /></Suspense>}>
          <Route path='/user/:userId/msg' element={<Suspense fallback={(<LazyLoading />)}><UserTabsMsgCard /></Suspense>} />
          <Route path='/user/:userId/posts' element={<Suspense fallback={(<LazyLoading />)}><UserTabArticleCard /></Suspense>} />
          <Route path='/user/:userId/*' element={<Suspense fallback={(<LazyLoading />)}><UserTabsRedirect /></Suspense>} />
        </Route>
        <Route path='/*' element={<Navigate to='/home/sort/all' />} />
      </Routes>
      <LoginModal />
      <RegisterModal />
    </div>
  )
}

export default connect(
  store => ({
    userRedux: store.user
  }),
  { setUserInfoAction, clearUserInfoAction }
)(App)