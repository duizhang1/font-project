import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './container/HomePage/HomePage'
import MdEditorPage from './container/MdEditorPage/MdEditorPage'
import LoginModal from './component/Modal/LoginModal/LoginModal'
import RegisterModal from './component/Modal/RegisterModal/RegisterModal'

export default function App() {

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