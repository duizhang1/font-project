import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { clearUserInfoAction } from '@src/redux/action/User'
import PropTypes from 'prop-types'

function Index (props) {
  const { clearUserInfoAction } = props
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.removeItem('token')
    navigate(-1)
    clearUserInfoAction()
  }, [])

  return (
    <>
    </>
  )
}
export default connect(
  state => ({

  }),
  { clearUserInfoAction }
)(Index)

Index.propTypes = {
  clearUserInfoAction: PropTypes.any
}
