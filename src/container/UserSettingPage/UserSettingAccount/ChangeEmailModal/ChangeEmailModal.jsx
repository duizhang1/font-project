import PropTypes from 'prop-types'
import React from 'react'
import { Button, Col, Form, Input, message, Modal, Row } from 'antd'
import SendModifyEmailButton from '@src/component/Button/SendEmailButton/SendModifyEmailButton'
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

function ChangeEmailModal (props) {
  const [form] = Form.useForm()
  const { open, setOpen, userRedux } = props
  const onCancel = () => {
    setOpen(false)
  }

  const onFinish = (values) => {
    axiosReq.post('/user/updateUserEmail', { ...values }).then(
      value => {
        message.info(value.message)
        setOpen(false)
      },
      reason => {
        message.error(reason.message)
      }
    )
  }
  return (
    <Modal
      title={'更换绑定邮箱'}
      open={open}
      onCancel={onCancel}
      footer={null}
      destroyOnClose={true}
    >
      <Form
        {...formItemLayout}
        form={form}
        name="changeEmail"
        onFinish={onFinish}
        initialValues={{
          email: userRedux.emailAddress
        }}
        scrollToFirstError
        preserve={false}
      >
        <Form.Item
          name="email"
          label="原邮箱"
          rules={[
            {
              required: true,
              message: '请输入原邮箱!'
            }
          ]}
        >
          <Input disabled={true}/>
        </Form.Item>

        <Form.Item
          name="verifyCode"
          label="验证码"
          tooltip="输入原邮箱验证码"
          rules={[
            {
              required: true,
              message: '请输入原邮箱验证码!'
            }
          ]}
        >
          <Row gutter={8}>
            <Col span={14}>
              <Form.Item
                name="captcha"
                noStyle
              >
                <Input placeholder='请输入原邮箱验证码' />
              </Form.Item>
            </Col>
            <Col span={10}>
              <SendModifyEmailButton
                getEmailAddress={() => { return form.getFieldValue('email') }}
                getErrorMessage={() => { return form.getFieldError('email') }}
                url={'/mail/getOldUpdateVerifyCode'}
              />
            </Col>
          </Row>
        </Form.Item>
        <Form.Item
          name="newEmail"
          label="新邮箱"
          rules={[
            {
              type: 'email',
              message: '新邮箱格式不正确'
            },
            {
              required: true,
              message: '请输入新邮箱地址'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="newVerifyCode"
          label="验证码"
          tooltip="输入新邮箱验证码"
          rules={[
            {
              required: true,
              message: '请输入新邮箱验证码!'
            }
          ]}
        >
          <Row gutter={8}>
            <Col span={14}>
              <Form.Item
                name="newCaptcha"
                noStyle
              >
                <Input placeholder='请输入新邮箱验证码' />
              </Form.Item>
            </Col>
            <Col span={10}>
              <SendModifyEmailButton
                getEmailAddress={() => { return form.getFieldValue('newEmail') }}
                getErrorMessage={() => { return form.getFieldError('newEmail') }}
                url={'/mail/getNewUpdateVerifyCode'}
              />
            </Col>
          </Row>
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

ChangeEmailModal.propTypes = {
  open: PropTypes.any,
  setOpen: PropTypes.any,
  userRedux: PropTypes.any
}

export default connect(
  state => ({
    userRedux: state.user
  }),
  {}
)(ChangeEmailModal)
