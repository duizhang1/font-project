import React from 'react'
import './CreatorDataItem.css'

export default function CreatorDataItem () {
  const data = {
    label: '总关注者数',
    count: 55,
    beforeChange: -1
  }

  return (
        <div className='creator-data-item-div'>
            <div className='creator-data-item-label'>{data.label}</div>
            <div className='creator-data-item-count'>{data.count}</div>
            <div className='creator-data-item-before-change'>较前日 { data.beforeChange }</div>
        </div>
  )
}
