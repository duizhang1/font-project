import React from 'react'
import { Modal } from 'antd'
import PropTypes from 'prop-types'

export default function DeleteConfirmModal (props) {
  const { onDelete, isConfirmOpen, setIsConfirmOpen } = props

  const handleCancel = () => {
    setIsConfirmOpen(false)
  }

  const handleOk = () => {
    onDelete()
  }

  return (
    <Modal
      title="删除"
      open={isConfirmOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText='确认'
      cancelText='取消'
      width={300}
    >
      <p>你确定要删除吗？</p>
    </Modal>
  )
}

DeleteConfirmModal.propTypes = {
  isConfirmOpen: PropTypes.bool,
  onDelete: PropTypes.func,
  setIsConfirmOpen: PropTypes.func
}
