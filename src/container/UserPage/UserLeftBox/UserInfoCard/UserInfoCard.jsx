import React from 'react'
import SubscribeButton from '@src/component/Button/SubscribeButton/SubscribeButton'
import { Image } from 'antd'
import {
  HomeFilled,
  MedicineBoxFilled,
  ProfileFilled
} from '@ant-design/icons'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import ChatButton from '@src/component/Button/ChatButton/ChatButton'
import TopSpace15 from '@src/component/Space/TopSpace15/TopSpace15'
import EditUserProfileButton from '@src/component/Button/EditUserProfileButton/EditUserProfileButton'
import './UserInfoCard.css'
import PropTypes from 'prop-types'

function UserInfoCard (props) {
  const { userRedux } = props
  const { userId } = useParams()
  const data = {
    username: '大队长',
    avatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    companyName: 'fingard',
    position: 'software enginee',
    personProfile: '你好水水水水水水水水水水水水水水水水水水水'
  }

  return (
    <div className='user-info-card-div'>
      <div className='user-info-card-div-info-div'>
        <div style={{
          margin: '0 28px 0 0'
        }}>
          <Image
            width={90}
            src={data.avatar}
            style={{
              borderRadius: '50%'
            }}
          />
        </div>
        <div>
          <div className='user-info-card-div-info-div-name'>
            <div>{data.username}</div>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <div>
              {data.companyName
                ? <div className='user-info-card-div-info-div-content'>
                  <HomeFilled className='user-info-card-div-info-div-content-icon' />
                  <span className='user-info-card-div-info-div-content-word'>{data.companyName}</span>
                </div>
                : ''}
              {data.position
                ? <div className='user-info-card-div-info-div-content'>
                  <MedicineBoxFilled className='user-info-card-div-info-div-content-icon' />
                  <span className='user-info-card-div-info-div-content-word'>{data.position}</span>
                </div>
                : ''}
              {data.personProfile
                ? <div className='user-info-card-div-info-div-content'>
                  <ProfileFilled className='user-info-card-div-info-div-content-icon' />
                  <span className='user-info-card-div-info-div-content-word'>{data.personProfile}</span>
                </div>
                : ''}
            </div>
            <div style={{
              margin: 'auto',
              padding: '0 15px'
            }}>
              {userRedux.uuid === userId
                ? <EditUserProfileButton />
                : <div>
                  <SubscribeButton userId={userId} />
                  <TopSpace15 />
                  <ChatButton userId={userId} />
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default connect(
  state => ({
    userRedux: state.user
  }),
  {}
)(UserInfoCard)

UserInfoCard.propTypes = {
  userRedux: PropTypes.any
}
