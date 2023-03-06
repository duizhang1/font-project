import React from 'react'
import { Image,Button } from 'antd';
import {
    HomeFilled,
    MedicineBoxFilled,
} from '@ant-design/icons';
import './UserLeftBox.css'
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import SubscribeButton from "@src/component/Button/SubscribeButton/SubscribeButton";

function UserLeftBox(props) {
    const { userRedux } = props
    const { userId } = useParams();
    const data = {
        username: '大队长',
        avatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        companyName: 'fingard',
        position: 'software enginee',
        personProfile: '你好水水水水水水水水水水水水水水水水水水水'
    }

    return (
        <div className='user-left-box-div'>
            <div className='user-left-box-div-info-div'>
                <div style={{
                    margin: '0 28px 0 0'
                }}>
                    <Image
                        width={90}
                        src={data.avatar}
                        style={{
                            borderRadius: '50%'
                        }}
                    />
                </div>
                <div>
                    <div className='user-left-box-div-info-div-name'>
                        <div>{data.username}</div>
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                        <div>
                            {data.companyName ?
                                <div className='user-left-box-div-info-div-content'>
                                    <HomeFilled className='user-left-box-div-info-div-content-icon' />
                                    <span className='user-left-box-div-info-div-content-word'>{data.companyName}</span>
                                </div> : ''}
                            {data.position ?
                                <div className='user-left-box-div-info-div-content'>
                                    <MedicineBoxFilled className='user-left-box-div-info-div-content-icon' />
                                    <span className='user-left-box-div-info-div-content-word'>{data.position}</span>
                                </div> : ''}
                            {data.personProfile ?
                                <div className='user-left-box-div-info-div-content'>
                                    <MedicineBoxFilled className='user-left-box-div-info-div-content-icon' />
                                    <span className='user-left-box-div-info-div-content-word'>{data.personProfile}</span>
                                </div> : ''}
                        </div>
                        <div>
                            {userRedux.uuid === userId ?
                                <Button type="primary" ghost>
                                Primary
                                </Button> :
                                <div>
                                    <SubscribeButton userId={userId}/>
                                    <Button type="primary" ghost>
                                Primary
                                </Button>
                                </div>
                              }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default connect(
    state => ({
        userRedux: state.user
    }),
    {}
)(UserLeftBox)