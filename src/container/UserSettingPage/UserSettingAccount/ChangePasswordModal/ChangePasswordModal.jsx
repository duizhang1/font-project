import PropTypes from 'prop-types'
import React from 'react'
import { Button, Form, Input, message, Modal } from 'antd'
import { connect } from 'react-redux'
import { axiosReq } from '@src/util/request/axios'

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 6
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 18
    }
  }
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 8,
      offset: 6
    }
  }
}

function ChangePasswordModal (props) {
  const { open, setOpen } = props
  const [form] = Form.useForm()

  const onCancel = () => {
    setOpen(false)
  }

  const onFinish = (values) => {
    axiosReq.post('/user/updatePassword', { ...values }).then(
      values => {
        message.info(values.message)
        setOpen(false)
      },
      reason => {
        message.error(reason.message)
      }
    )
  }

  return (
    <Modal
      title={'更改密码'}
      open={open}
      onCancel={onCancel}
      footer={null}
      destroyOnClose={true}
    >
      <Form
        {...formItemLayout}
        form={form}
        name="changePassword"
        onFinish={onFinish}
        initialValues={{

        }}
        scrollToFirstError
        preserve={false}
      >
        <Form.Item
          name="oldPassword"
          label="原密码"
          rules={[
            {
              required: true,
              message: '请输入原密码!'
            },
            {
              min: 6,
              message: '密码最小长度6位'
            }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="password"
          label="新密码"
          rules={[
            {
              required: true,
              message: '请输入新密码!'
            },
            {
              min: 6,
              message: '密码最小长度6位'
            }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="repeatPassword"
          dependencies={['password']}
          label="再次输入新密码"
          rules={[
            {
              required: true,
              message: '再次输入新密码!'
            },
            ({ getFieldValue }) => ({
              validator (_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('再次输入的密码不一致'))
              }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            保存修改
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

ChangePasswordModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func
}

export default connect(
  state => ({

  }),
  {}
)(ChangePasswordModal)
