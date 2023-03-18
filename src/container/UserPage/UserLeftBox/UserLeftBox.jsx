import React from 'react'
import './UserLeftBox.css'
import UserInfoCard from './UserInfoCard/UserInfoCard'
import TopSpace15 from '@src/component/Space/TopSpace15/TopSpace15'
import UserTabsCard from './UserTabsCard/UserTabsCard'

export default function UserLeftBox () {
  return (
        <div>
            <UserInfoCard />
            <TopSpace15 />
            <UserTabsCard />
        </div>
  )
}
