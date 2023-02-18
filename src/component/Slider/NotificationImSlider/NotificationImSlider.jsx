import NotificationImSliderItem from '@src/component/ListItem/NotificationImSliderItem/NotificationImSliderItem'
import React from 'react'
import './NotificationImSlider.css'

export default function NotificationImSlider(props) {
    let {setSelectItem,selectItem} = props

    return (
        <div className='notification-im-slider-div own-scroll-div-css'>
            <NotificationImSliderItem setSelectItem={setSelectItem} selectItem={selectItem} />
            <NotificationImSliderItem setSelectItem={setSelectItem} selectItem={selectItem} />
            <NotificationImSliderItem setSelectItem={setSelectItem} selectItem={selectItem} />
            <NotificationImSliderItem setSelectItem={setSelectItem} selectItem={selectItem} />
            <NotificationImSliderItem setSelectItem={setSelectItem} selectItem={selectItem} />
            <NotificationImSliderItem setSelectItem={setSelectItem} selectItem={selectItem}/>
        </div>
    )
}
