import React, { useState } from 'react'
import { BottomBorder } from '@src/enum/css/CommonCSS'
import ChangeEmailModal from '@src/container/UserSettingPage/UserSettingAccount/ChangeEmailModal/ChangeEmailModal'
import ChangePasswordModal
  from '@src/container/UserSettingPage/UserSettingAccount/ChangePasswordModal/ChangePasswordModal'

export default function UserSettingAccount () {
  const data = {
    email: '8888888@qq.com'
  }

  const itemDivCss = {
    display: 'flex',
    fontSize: '16px',
    height: '60px',
    lineHeight: '60px',
    borderBottom: BottomBorder
  }
  const itemLabelCss = {
    minWidth: '100px'
  }
  const itemValueCss = {
    color: '#909090'
  }
  const itemActionCss = {
    color: '#007fff',
    cursor: 'pointer',
    margin: '0 0 0 auto'
  }

  const [openEmailModal, setOpenEmailModal] = useState(false)
  const [openPasswordModal, setOpenPasswordModal] = useState(false)

  const openChangeEmailModal = (e) => {
    setOpenEmailModal(true)
  }

  const openChangePasswordModal = (e) => {
    setOpenPasswordModal(true)
  }

  return (
    <div style={{
      minWidth: '800px',
      padding: '15px 15px'
    }}>
      <div
        style={{
          fontWeight: '600',
          fontSize: '20px',
          color: '#333',
          lineHeight: '18px',
          padding: '0 0 15px 0',
          borderBottom: '1px solid #e5e6eb',
          margin: '0 0 5px 0'
        }}>
        账号设置
      </div>
      <div
        style={itemDivCss}
      >
        <div style={itemLabelCss}>
          邮箱
        </div>
        <div
          style={itemValueCss}
        >
          {data.email}
        </div>
        <div
          style={itemActionCss}
          onClick={openChangeEmailModal}
        >
          绑定
        </div>
      </div>
      <div
        style={itemDivCss}
      >
        <div style={itemLabelCss}>
          密码
        </div>
        <div
          style={itemActionCss}
          onClick={openChangePasswordModal}
        >重置
        </div>
      </div>
      <ChangeEmailModal open={openEmailModal} setOpen={setOpenEmailModal} />
      <ChangePasswordModal open={openPasswordModal} setOpen={setOpenPasswordModal} />
    </div>
  )
}
