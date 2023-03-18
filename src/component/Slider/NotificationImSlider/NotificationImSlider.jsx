import NotificationImSliderItem from '@src/component/ListItem/NotificationImSliderItem/NotificationImSliderItem'
import React, { useEffect } from 'react'
import './NotificationImSlider.css'
import { useSearchParams } from 'react-router-dom'
import { axiosReq } from '@src/util/request/axios'
import { message } from 'antd'
import PropTypes from 'prop-types'

export default function NotificationImSlider (props) {
  const { setSelectItem, selectItem, sliderData, setSliderData } = props
  const [searchParams] = useSearchParams()
  const query = Object.fromEntries(searchParams)

  useEffect(() => {
    axiosReq.get('/imRecord/getChatList').then(
      (value) => {
        let newData
        if (query.addChat) {
          const data1 = value.data.filter((item) => {
            return item.toUserId !== query.addChat
          })
          axiosReq.get('/imRecord/getOneChat', { toUserId: query.addChat }).then(
            (value) => {
              newData = [value.data, ...data1]
              setSliderData(newData)
            },
            (reason) => {
              setSliderData(data1)
            }
          )
        } else {
          newData = value.data
          setSliderData(newData)
        }
      },
      (reason) => {
        message.error(reason.message)
      }
    )
  }, [])

  return (
        <div className='notification-im-slider-div own-scroll-div-css'>
            {sliderData.map((item) => {
              if (item) {
                return (
                        <NotificationImSliderItem
                            key={item.toUserId}
                            setSelectItem={setSelectItem}
                            selectItem={selectItem}
                            data={item}
                        />
                )
              }
              return ''
            })}
        </div>
  )
}

NotificationImSlider.propTypes = {
  selectItem: PropTypes.any,
  setSelectItem: PropTypes.any,
  setSliderData: PropTypes.any,
  sliderData: PropTypes.any
}
