import PropTypes from 'prop-types'
import React from 'react'
import { Button, Col, Form, Input, message, Modal, Row } from 'antd'
import SendModifyEmailButton from '@src/component/Button/SendEmailButton/SendModifyEmailButton'
import { connect } from 'react-redux'
import { loginHiddenAction, loginShowAction } from '@src/redux/action/Login'
import { registerShowAction } from '@src/redux/action/Register'
import { setUserInfoAction } from '@src/redux/action/User'
import { axiosReq } from '@src/util/request/axios'

const formItemLayout = {
  labelCol: {
    xs: {
      span: 6
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
      span: 24
    }
  }
}

function Index (props) {
  const { open, setOpen, loginShowAction } = props
  const [form] = Form.useForm()

  const onFinish = (values) => {
    axiosReq.post('/user/forgetPassword', values).then(
      (value) => {
        message.info(value.message + ',正在前往登陆')
        setOpen(false)
        loginShowAction()
      },
      (reason) => {
        message.error(reason.message)
      }
    )
  }

  const showLogin = (e) => {
    setOpen(false)
    loginShowAction()
  }

  return (
    <>
      <Modal
        open={open}
        title="忘记密码"
        footer={null}
        onCancel={() => { setOpen(false) }}
        width='400px'
        className='register-modal'
        maskClosable={false}
        destroyOnClose
      >
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="emailAddress"
            label="邮箱"
            rules={[
              {
                type: 'email',
                message: '邮箱格式不正确'
              },
              {
                required: true,
                message: '邮箱不为空'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="verifyCode"
            label="验证码"
            tooltip="输入邮箱中获得的验证码"
            rules={[
              {
                required: true,
                message: '请输入邮箱中获得的验证码!'
              }
            ]}
          >
            <Row gutter={8}>
              <Col span={14}>
                <Form.Item
                  name="captcha"
                  noStyle
                >
                  <Input placeholder='请输入验证码' />
                </Form.Item>
              </Col>
              <Col span={10}>
                <SendModifyEmailButton
                  getEmailAddress={() => { return form.getFieldValue('emailAddress') }}
                  getErrorMessage={() => { return form.getFieldError('emailAddress') }}
                  url={'/mail/getForgetPasswordVerifyCode'}
                />
              </Col>
            </Row>
          </Form.Item>

          <Form.Item
            name="password"
            label="密码"
            tooltip="输入6-16位的密码"
            rules={[
              {
                type: 'string',
                max: 16,
                min: 6,
                message: '请输入6-16位的密码'
              },
              {
                required: true,
                message: '请输入密码'
              }
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="repeatPassword"
            label="重复密码"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请再一次输入密码'
              },
              ({ getFieldValue }) => ({
                validator (_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('两次密码不相等!'))
                }
              })
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 24,
              offset: 0
            }}
          >
            <Button type="primary" htmlType="submit" className="register-form-button">
              重置密码
            </Button>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              span: 24,
              offset: 0
            }}
            style={{
              margin: '-12px 0 24px'
            }}
          >
            <Button className="register-form-button" onClick={showLogin}>
              前往登陆
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default connect(
  state => ({
    loginRedux: state.login
  }),
  { loginShowAction, loginHiddenAction, registerShowAction, setUserInfoAction }
)(Index)

Index.propTypes = {
  open: PropTypes.any,
  setOpen: PropTypes.any,
  loginShowAction: PropTypes.any
}
