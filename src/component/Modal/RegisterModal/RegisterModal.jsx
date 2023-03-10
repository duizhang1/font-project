import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Col, Form, Input, Row, Modal, message } from 'antd';
import './RegisterModal.css'
import { connect } from 'react-redux'
import { registerShowAction, registerHiddenAction } from '@src/redux/action/Register'
import { loginShowAction } from '@src/redux/action/Login'
const { axiosReq } = require('@src/util/request/axios')


const formItemLayout = {
    labelCol: {
        xs: {
            span: 6,
        },
        sm: {
            span: 6,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 24,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 21,
            offset: 3,
        },
    },
};

let timer;

function RegisterModal(props) {
    const { registerRedux, registerHiddenAction, loginShowAction } = props
    const [btnDisable, setBtnDisable] = useState(false)
    const [leftTime, setLeftTime] = useState(59)
    const [form] = Form.useForm();

    useEffect(() => {
        clearInterval(timer)
        return () => {
            clearInterval(timer)
        }
    }, [])

    useEffect(() => {
        if (leftTime <= 0 || leftTime >= 60) {
            setBtnDisable(false)
            clearInterval(timer)
            setLeftTime(59)
        }
    }, [leftTime])

    const getCaptchaTime = () => {
        console.log(form.getFieldError('emailAddress'))
        if (form.getFieldError('emailAddress') !== null && form.getFieldError('emailAddress').length > 0) {
            message.error(form.getFieldError('emailAddress'))
            return
        }
        axiosReq.get('/mail/getVerifyCode', { emailAddress: form.getFieldValue('emailAddress') }).then(
            (value) => {
                message.info(value.message)
                timer = setInterval(() => setLeftTime(pre => pre - 1), 1000)
                setBtnDisable(true);
            },
            (reason) => {
                message.error(reason.message)
            }
        )
    }

    const onFinish = (values) => {
        axiosReq.post('/user/register', values).then(
            (value) => {
                message.info(value.message + ',??????????????????')
                registerHiddenAction()
                loginShowAction()
            },
            (reason) => {
                message.error(reason.message)
            }
        )
    };

    const showLogin = () => {
        registerHiddenAction();
        loginShowAction();
    }

    return (
        <>
            <Modal
                open={registerRedux.registerShow}
                title="??????"
                footer={null}
                onCancel={registerHiddenAction}
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
                        name="username"
                        label="?????????"
                        tooltip="???????????????????????????"
                        rules={[
                            {
                                required: true,
                                message: '????????????????????????!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="??????"
                        tooltip="??????6-16????????????"
                        rules={[
                            {
                                type: 'string',
                                max: 16,
                                min: 6,
                                message: '?????????6-16????????????'
                            },
                            {
                                required: true,
                                message: '???????????????',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="repeatPassword"
                        label="????????????"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '????????????????????????',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('?????????????????????!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="emailAddress"
                        label="??????"
                        rules={[
                            {
                                type: 'email',
                                message: '?????????????????????',
                            },
                            {
                                required: true,
                                message: '???????????????',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="verifyCode"
                        label="?????????"
                        tooltip="?????????????????????????????????"
                        rules={[
                            {
                                required: true,
                                message: '????????????????????????????????????!',
                            },
                        ]}
                    >
                        <Row gutter={8}>
                            <Col span={14}>
                                <Form.Item
                                    name="captcha"
                                    noStyle
                                >
                                    <Input placeholder='??????????????????' />
                                </Form.Item>
                            </Col>
                            <Col span={10}>
                                <Button disabled={btnDisable} onClick={getCaptchaTime}>
                                    {btnDisable ? `${leftTime}????????????` : '???????????????'}
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            xs: {
                                span: 24,
                                offset: 0,
                            },
                            sm: {
                                span: 21,
                                offset: 3,
                            }
                        }}
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value ? Promise.resolve() : Promise.reject(new Error('??????????????????????????????')),
                            },
                        ]}
                        {...tailFormItemLayout}
                    >
                        <Checkbox>
                            ????????????????????? <a href="">????????????</a> ??? <a href="">????????????</a>
                        </Checkbox>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            span: 24,
                            offset: 0,
                        }}
                    >
                        <Button type="primary" htmlType="submit" className="register-form-button">
                            ??????
                        </Button>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            span: 24,
                            offset: 0,
                        }}
                        style={{
                            margin: '-12px 0 24px'
                        }}
                    >
                        <Button className="register-form-button" onClick={showLogin}>
                            ????????????? ????????????
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default connect(
    state => ({
        registerRedux: state.register
    }),
    { loginShowAction, registerShowAction, registerHiddenAction }
)(RegisterModal)