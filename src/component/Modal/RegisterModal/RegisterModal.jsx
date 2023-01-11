import React,{useEffect, useState} from 'react'
import { Button,Checkbox,Col,Form,Input,Row,Modal, message } from 'antd';
import './RegisterModal.css'
import { connect } from 'react-redux'
import { registerShowAction, registerHiddenAction } from '../../../redux/action/Register'
import { loginShowAction } from '../../../redux/action/Login'

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
    },[leftTime])

    const getCaptchaTime = () => {
        if (form.getFieldError('emailAddress') !== null && form.getFieldError('emailAddress').length > 0) {
            message.error(form.getFieldError('emailAddress'))
            return
        }
        timer = setInterval(() => setLeftTime(pre => pre-1), 1000)
        setBtnDisable(true);
    }

    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    const showLogin = () => {
        registerHiddenAction();
        loginShowAction();
    }

    return (
        <div>
            <Modal
                open={registerRedux.registerShow}
                title="注册"
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
                        label="用户名"
                        tooltip="输入你常用的用户名"
                        rules={[
                            {
                                required: true,
                                message: '请输入你的用户名!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="密码"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码',
                            },
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
                                message: '请再一次输入密码',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('两次密码不相等!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="emailAddress"
                        label="邮箱"
                        rules={[
                            {
                                type: 'email',
                                message: '邮箱格式不正确',
                            },
                            {
                                required: true,
                                message: '邮箱不为空',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="verifyCode"
                        label="验证码"
                        tooltip="输入邮箱中获得的验证码"
                    >
                        <Row gutter={8}>
                            <Col span={14}>
                                <Form.Item
                                    name="captcha"
                                    noStyle
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入邮箱中获得的验证码!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={10}>
                                <Button disabled={btnDisable} onClick={getCaptchaTime}>
                                    { btnDisable ? `${leftTime}秒后获取` : '获得验证码' }
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
                                    value ? Promise.resolve() : Promise.reject(new Error('请阅读并同意用户协议')),
                            },
                        ]}
                        {...tailFormItemLayout}
                    >
                        <Checkbox>
                            我已阅读并同意 <a href="">服务条款</a> 和 <a href="">隐私协议</a>
                        </Checkbox>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            span: 24,
                            offset: 0,
                        }}
                    >
                        <Button type="primary" htmlType="submit" className="register-form-button">
                            注册
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
                            已有账号? 前往登陆
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default connect(
    state => ({
        registerRedux: state.register
    }),
    { loginShowAction,registerShowAction, registerHiddenAction }
)(RegisterModal)