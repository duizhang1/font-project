import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, Input, Radio, message } from 'antd'

import { axiosReq } from '@src/util/request/axios'

const TextArea = Input.TextArea

const layout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 16
  }
}
const tailLayout = {
  wrapperCol: {
    offset: 16,
    span: 8
  }
}

export default function UserTabStoreEditModal (props) {
  const { editOpen, setEditOpen, editStoreid, onUpdateFinish } = props
  const [form] = Form.useForm()
  const [inpDisable, setInpDisable] = useState(false)

  useEffect(() => {
    if (!editStoreid) {
      return
    }
    axiosReq.get('/storeList/getStoreInfo', { storeListId: editStoreid }).then(
      value => {
        const data = value.data
        form.setFieldValue('name', data.name)
        form.setFieldValue('summary', data.summary)
        form.setFieldValue('state', data.state)
        setInpDisable(data.isDefault === 1)
      },
      reason => {
        message.error(reason.message)
      }
    )
  }, [editOpen])

  const onClose = () => {
    setEditOpen(false)
  }

  const onFinish = (values) => {
    axiosReq.post('/storeList/updateStoreList', { ...values, uuid: editStoreid }).then(
      value => {
        message.info(value.message)
        setEditOpen(false)
        onUpdateFinish()
      },
      reason => {
        message.error(reason.message)
      }
    )
  }

  return (
    <Modal
      title="编辑收藏夹"
      open={editOpen}
      footer={null}
      onCancel={onClose}
      destroyOnClose
      maskClosable={false}
    >
      <Form
        {...layout}
        form={form}
        name="control-ref"
        onFinish={onFinish}
        preserve={false}
      >
        <Form.Item
          name="name"
          label="名称"
          rules={[
            {
              required: true,
              message: '请输入收藏夹名称'
            }
          ]}
        >
          <Input disabled={inpDisable}/>
        </Form.Item>
        <Form.Item
          name="summary"
          label="描述"
          rules={[
            {
              max: 100,
              message: '最长不超过100个字'
            }
          ]}
        >
          <TextArea
            showCount
            maxLength={100}
            style={{
              height: 80
            }}
          />
        </Form.Item>
        <Form.Item
          name="state"
          label="状态"
          rules={[
            {
              required: true,
              message: '请选择收藏夹是否开放'
            }
          ]}
        >
          <Radio.Group>
            <Radio value="1">公开</Radio>
            <Radio value="2">隐私</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            更新
          </Button>
          <span style={{ margin: '0 5px' }}></span>
          <Button htmlType="button" onClick={onClose}>
            取消
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

UserTabStoreEditModal.propTypes = {
  editOpen: PropTypes.bool.isRequired,
  editStoreid: PropTypes.string.isRequired,
  onUpdateFinish: PropTypes.func.isRequired,
  setEditOpen: PropTypes.func
}
