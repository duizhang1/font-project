import PropTypes from 'prop-types'
import React from 'react'
import './CreatorDataItem.css'

export default function CreatorDataItem (props) {
  const { data } = props

  return (
        <div className='creator-data-item-div'>
            <div className='creator-data-item-label'>{data.name}</div>
            <div className='creator-data-item-count'>{data.count}</div>
            <div className='creator-data-item-before-change'>
              较前日 { data.change > 0 ? `+${data.change}` : data.change}
            </div>
        </div>
  )
}

CreatorDataItem.propTypes = {
  data: PropTypes.any
}
