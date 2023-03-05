import React from 'react'
import CommonHeader from '@src/component/Header/CommonHeader/CommonHeader'
import { useNavigate } from 'react-router-dom'
import UserLeftBox from './UserLeftBox/UserLeftBox'
import './UserPage.css'

export default function UserPage() {
    const navigate = useNavigate()

    return (
        <div>
            <CommonHeader />
            <div className='user-page-content-div'>
                <UserLeftBox />
            </div>
        </div>
    )
}
