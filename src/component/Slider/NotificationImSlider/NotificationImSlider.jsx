import NotificationImSliderItem from '@src/component/ListItem/NotificationImSliderItem/NotificationImSliderItem'
import React, { useEffect, useState } from 'react'
import './NotificationImSlider.css'
import { useSearchParams } from 'react-router-dom'
import { axiosReq } from '@src/util/request/axios'
import { message } from 'antd'

export default function NotificationImSlider(props) {
    let { setSelectItem, selectItem, sliderData, setSliderData } = props
    const [searchParams] = useSearchParams()
    const query = Object.fromEntries(searchParams)

    useEffect(() => {
        axiosReq.get('/imRecord/getChatList').then(
            (value) => {
                let newData;
                let chooseData;
                if (query.addChat) {
                    let data1 = value.data.map((item) => {
                        if (item.toUserId === query.addChat) {
                            chooseData = item
                        } else {
                            return item
                        }
                    });
                    if (chooseData) {
                        newData = [chooseData, ...data1];
                        setSliderData(newData)
                    } else {
                        axiosReq.get('/imRecord/getOneChat', { toUserId: query.addChat }).then(
                            (value) => {
                                newData = [value.data, ...data1]
                                setSliderData(newData)
                            },
                            (reason) => {
                                setSliderData(data1)
                            }
                        )
                    }
                } else {
                    newData = value.data
                    setSliderData(newData)
                }
            },
            (reason) => {
                message.error(reason.message)
            }
        )
    },[])

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
            })}
        </div>
    )
}
