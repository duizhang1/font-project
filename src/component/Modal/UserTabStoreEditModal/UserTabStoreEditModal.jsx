import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Input, Radio } from 'antd'

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
  const { editOpen, setEditOpen, editStoreid } = props

  const [data, setData] = useState({})
  const [form] = Form.useForm()

  const onClose = () => {
    setEditOpen(false)
  }

  const onFinish = (values) => {
    console.log(values)
  }

  useEffect(() => {

  })

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
        initialValues={data}
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
          <Input />
        </Form.Item>
        <Form.Item
          name="summary"
          label="描述"
          rules={[
            {
              required: true,
              message: '请输入描述内容'
            },
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
