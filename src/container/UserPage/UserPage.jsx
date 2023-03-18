import React from 'react'
import CommonHeader from '@src/component/Header/CommonHeader/CommonHeader'
import UserLeftBox from './UserLeftBox/UserLeftBox'
import './UserPage.css'

export default function UserPage () {
  return (
        <div>
            <CommonHeader />
            <div className='user-page-content-div'>
                <UserLeftBox />
            </div>
        </div>
  )
}
