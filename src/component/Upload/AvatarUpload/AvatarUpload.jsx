import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Avatar, message, Upload } from 'antd'
import qiniuUpload from '@src/util/qiniu/qiniuUpload'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

export default function AvatarUpload (props) {
  const { imageUrl, setImageUrl } = props
  const [loading, setLoading] = useState(false)

  function customRequest ({ action, data, file, filename, headers, onError, onProgress, onSuccess, withCredentials }) {
    setLoading(true)
    qiniuUpload(file).then(
      (value) => {
        setImageUrl(value)
        setLoading(false)
      },
      (reason) => {
        message.error(reason)
        setLoading(false)
      }
    )
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8
        }}
      >
        Upload
      </div>
    </div>
  )

  return (
    <Upload
      name="img"
      listType="picture-card"
      showUploadList={false}
      customRequest={customRequest}
    >
      {imageUrl
        ? (
          <Avatar
            src={imageUrl}
            alt="img"
            size={100}
          />
          )
        : (
            uploadButton
          )}
    </Upload>
  )
}

AvatarUpload.propTypes = {
  imageUrl: PropTypes.string,
  setImageUrl: PropTypes.any
}
