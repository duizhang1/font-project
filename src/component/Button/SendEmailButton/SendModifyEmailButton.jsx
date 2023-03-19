import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Button, message } from 'antd'
import { axiosReq } from '@src/util/request/axios'

let timer
/**
 * 发送邮箱修改的按钮，后期如果需要可以在抽参数，将请求路径进行props设置
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function SendModifyEmailButton (props) {
  const { getEmailAddress, getErrorMessage } = props
  const [btnDisable, setBtnDisable] = useState(false)
  const [leftTime, setLeftTime] = useState(59)

  const getCaptchaTime = () => {
    const errorMessage = getErrorMessage()
    if (errorMessage !== null && errorMessage.length > 0) {
      message.error(errorMessage[0])
      return
    }
    const emailAddress = getEmailAddress()
    axiosReq.get('/mail/getVerifyCode', { emailAddress }).then(
      (value) => {
        message.info(value.message)
        timer = setInterval(() => setLeftTime(pre => pre - 1), 1000)
        setBtnDisable(true)
      },
      (reason) => {
        message.error(reason.message)
      }
    )
  }

  useEffect(() => {
    clearInterval(timer)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <Button disabled={btnDisable} onClick={getCaptchaTime}>
      {btnDisable ? `${leftTime}秒后获取` : '获得验证码'}
    </Button>
  )
}

SendModifyEmailButton.propTypes = {
  getEmailAddress: PropTypes.func,
  getErrorMessage: PropTypes.func
}
