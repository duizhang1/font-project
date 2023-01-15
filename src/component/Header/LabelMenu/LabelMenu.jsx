import { Header } from 'antd/lib/layout/layout'
import React, { useState, useEffect } from 'react'
import { Menu, message } from 'antd';
import './LabelMenu.css'
import { useNavigate, useLocation } from "react-router-dom";
import { connect } from 'react-redux';
import { axiosReq } from '@src/util/request/axios';
import { setSortAction } from '@src/redux/action/Sort'

function LabelMenu(props) {
    const { sortRedux, setSortAction } = props
    const [current, setCurrent] = useState('all');
    const navigate = useNavigate();

    const onClick = (e) => {
        setCurrent(e.key);
        navigate(`/home/sort/${e.key}`);
    };

    // 完成分类的获取
    let sortOptions = []
    if (sortRedux.length > 0) {
        sortOptions = sortRedux.map((item, key) => {
            return { key: item.routeName, label: item.sortName }
        })
    }
    sortOptions = [{label: '综合',key: 'all'},...sortOptions,{label: '关注',key: 'focus'}]

    useEffect(() => {
        // 请求分区的数据
        if (sortRedux.length === 0) {
            axiosReq.get('/sort/getSortList').then(
                (value) => {
                    setSortAction(value.data)
                },
                (reason) => {
                    message.error(reason.message)
                }
            )
        }
    }, [])

    return (
        <Header className='labelheader-set'>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={sortOptions } className='labelmenu-set' />
        </Header>
    )
}
export default connect(
    state => ({
        sortRedux: state.sort
    }),
    { setSortAction }
)(LabelMenu)