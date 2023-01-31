import React from 'react'
import { Checkbox } from 'antd';
import './StoreCheckBox.css'
import { LockOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useEffect } from 'react';

export default function StoreCheckBox(props) {
    const {data,updateClickList} = props

    const [isStore, setIsStore] = useState(data ? data.isStore : false);
    
    function clickItem() {
        updateClickList({uuid:data.uuid,flag:!isStore})
        setIsStore(!isStore)
    }

    return (
        <div className='store-check-box' onClick={clickItem}>
            <div className='store-check-box-font-div'>
                <div className='store-check-box-font-div-name'>{data.name} { data.state === '1' ? '' : <LockOutlined /> }</div>
                <div className='store-check-box-font-number'>{data.articleNum}篇文章</div>
            </div>
            <Checkbox
                checked={isStore}
                onChange={()=>{setIsStore(!isStore)}}
                style={{ float: 'right', marginTop: '12px' }}
            />
        </div>
    )
}
