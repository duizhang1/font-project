import React, { useEffect, useState } from 'react'
import { Form, Input, Button, message } from 'antd'
import AvatarUpload from '@src/component/Upload/AvatarUpload/AvatarUpload'
import { axiosReq } from '@src/util/request/axios'

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 3
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 13
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
      span: 16,
      offset: 3
    }
  }
}

function UserSettingProfile () {
  const [form] = Form.useForm()
  const [imageUrl, setImageUrl] = useState('')

  function setImageUrlAndForm (url) {
    setImageUrl(url)
    form.setFieldValue('avatar', url)
  }

  const onFinish = (values) => {
    axiosReq.post('/user/updateUserInfo', { ...values }).then(
      value => {
        message.info(value.message)
        getUserInfo()
      },
      reason => {
        message.error(reason.message)
      }
    )
  }

  function getUserInfo () {
    axiosReq.get('/user/getCurrentUser').then(
      value => {
        const data = value.data
        form.setFieldValue('username', data.username)
        form.setFieldValue('position', data.position)
        form.setFieldValue('companyName', data.companyName)
        form.setFieldValue('personProfile', data.personProfile)
        setImageUrlAndForm(data.avatar)
      },
      reason => {
        message.error(reason.message)
      }
    )
  }

  useEffect(() => {
    getUserInfo()
  }, [])

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
        个人资料
      </div>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="username"
          label="用户名"
          rules={[
            {
              required: true,
              message: '请输入用户名'
            }
          ]}
        >
          <Input showCount maxLength={20}/>
        </Form.Item>
        <Form.Item
          name="position"
          label="职位"
        >
          <Input showCount maxLength={50}/>
        </Form.Item>
        <Form.Item
          name="companyName"
          label="公司"
        >
          <Input showCount maxLength={50}/>
        </Form.Item>
        <Form.Item
          name="personProfile"
          label="个人介绍"
        >
          <Input.TextArea showCount maxLength={100}/>
        </Form.Item>
        <Form.Item
          label="头像"
          name="avatar"
          rules={[
            {
              required: true,
              message: '请上传头像'
            }
          ]}
        >
          <AvatarUpload imageUrl={imageUrl} setImageUrl={setImageUrlAndForm}/>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            保存修改
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default UserSettingProfile
