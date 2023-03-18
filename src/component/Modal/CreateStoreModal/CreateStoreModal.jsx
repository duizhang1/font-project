import React from 'react'
import { Form, Modal, Input, Radio, Button, message } from 'antd'
import { axiosReq } from '@src/util/request/axios'
import PropTypes from 'prop-types'

const { TextArea } = Input

export default function CreateStoreModal (props) {
  const { setCreateStoreOpen, createStoreOpen, setStoreOpen } = props

  function closeThisAndOpenStore () {
    setCreateStoreOpen(false)
    setStoreOpen(true)
  }

  const onFinish = (values) => {
    axiosReq.post('/storeList/createStoreList', values).then(
      (value) => {
        message.info(value.message)
        closeThisAndOpenStore()
      },
      (reason) => {
        message.error(reason.message)
      }
    )
  }

  return (
        <>
            <Modal
                open={createStoreOpen}
                title="添加收藏夹"
                footer={null}
                onCancel={closeThisAndOpenStore}
                width='400px'
                maskClosable={false}
                destroyOnClose
            >
                <Form
                    name="basic"
                    labelCol={{
                      span: 4
                    }}
                    wrapperCol={{
                      span: 20
                    }}
                    autoComplete="off"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="名称"
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: '请输入收藏夹名!'
                          }
                        ]}
                    >
                        <Input placeholder='请输入收藏夹名' />
                    </Form.Item>
                    <Form.Item
                        label="描述"
                        name="summary"
                        rules={[
                          {
                            max: 100,
                            message: '请输入不大于100个字'
                          }
                        ]}
                    >
                        <TextArea allowClear showCount placeholder='输入收藏夹简介(选填)' />
                    </Form.Item>
                    <Form.Item name="state" label="属性" initialValue={'1'}>
                        <Radio.Group>
                            <Radio value="1">公开</Radio>
                            <Radio value="2">隐私</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{ offset: 14, span: 10 }}
                    >
                        <Button type="primary" htmlType="submit" style={{ marginRight: '15px' }}>
                            创建
                        </Button>
                        <Button htmlType="button" onClick={closeThisAndOpenStore}>
                            取消
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
  )
}

CreateStoreModal.propTypes = {
  createStoreOpen: PropTypes.bool,
  setCreateStoreOpen: PropTypes.any,
  setStoreOpen: PropTypes.any
}
