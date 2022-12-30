import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './container/HomePage/HomePage'

export default function App() {
  return (
    <Routes>
      <Route path='/home/*' element={<HomePage />} />
      <Route path='/*' element={<HomePage/>}/>
    </Routes>
  )
}