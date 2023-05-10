import PropTypes from 'prop-types'
import React from 'react'
import './CreatorDataItem.css'

export default function CreatorDataItem (props) {
  const { data } = props

  return (
        <div className='creator-data-item-div'>
            <div className='creator-data-item-label'>{data.label}</div>
            <div className='creator-data-item-count'>{data.count}</div>
            <div className='creator-data-item-before-change'>较前日 { data.beforeChange }</div>
        </div>
  )
}

CreatorDataItem.propTypes = {
  data: PropTypes.any
}
