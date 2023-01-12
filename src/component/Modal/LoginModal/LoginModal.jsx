import React from 'react'
import { Modal, Button, Form, Input, message } from 'antd'
import { connect } from 'react-redux'
import { loginHiddenAction, loginShowAction } from '@src/redux/action/Login'
import { registerShowAction } from '@src/redux/action/Register'
import { setUserInfoAction } from '@src/redux/action/User'
import './LoginModal.css'
const { axiosReq } = require('@src/request/axios')




function LoginModal(props) {
  const { loginRedux, loginHiddenAction, registerShowAction,setUserInfoAction } = props

  const onFinish = (values) => {
    axiosReq.post('/user/login', values).then(
      (value) => {
        const { data } = value;
        // 获取token并拼接起来
        let token = data.tokenHead + data.token;
        localStorage.setItem('token', token)
        message.info('登陆成功')
        axiosReq.get('/user/getCurrentUser').then(
          (value) => { 
            setUserInfoAction(value.data)
          },
          (reason) => {
          }
        )
        // 隐藏登陆框
        loginHiddenAction();
      },
      (reason) => {
        message.error(reason.message)
      }
    )
  };
  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo.errorFields[0].errors[0])
  };

  // 展示注册Modal
  const showRegister = () => {
    loginHiddenAction();
    registerShowAction();
  }

  return (
    <div className='login-modal-div'>
      <Modal
        open={loginRedux.loginShow}
        title="登陆"
        footer={null}
        onCancel={loginHiddenAction}
        width='400px'
        className='login-modal'
        maskClosable={false}
        destroyOnClose
      >
        <Form
          name="basic"
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 18,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="账号"
            name="account"
            rules={[
              {
                type: 'email',
                message: '邮箱格式不正确',
              },
              {
                required: true,
                message: '请输入邮箱号!',
              },
            ]}
            style={{ margin: '15px 0 24px ' }}
          >
            <Input placeholder="请输入邮箱号" />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码!',
              },
            ]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 20,
            }}
            style={{ margin: '-24px 0 20px' }}
          >
            <span className='span-forget-password'>忘记密码</span>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 24,
            }}
            style={{ margin: '0 0 12px' }}
          >
            <Button type="primary" className="login-form-button" htmlType="submit">
              登陆
            </Button>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              span: 24,
            }}
          >
            <Button className="login-form-button" onClick={showRegister}>
              没有账号? 点击注册
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default connect(
  state => ({
    loginRedux: state.login
  }),
  { loginShowAction, loginHiddenAction, registerShowAction,setUserInfoAction }
)(LoginModal)