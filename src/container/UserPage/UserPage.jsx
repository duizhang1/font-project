import React from 'react'
import CommonHeader from '@src/component/Header/CommonHeader/CommonHeader'
import UserLeftBox from './UserLeftBox/UserLeftBox'
import UserRightBox from '@src/container/UserPage/UserRightBox/UserRightBox'

export default function UserPage () {
  return (
        <div style={{
          padding: '0 0 30px 0'
        }}>
            <CommonHeader />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '15px'
              }}
            >
              <UserLeftBox />
              <UserRightBox />
            </div>
        </div>
  )
}
