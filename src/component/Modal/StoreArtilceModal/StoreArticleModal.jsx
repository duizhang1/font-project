import StoreCheckBox from '@src/component/CheckBox/StoreCheckBox/StoreCheckBox'
import { axiosReq } from '@src/util/request/axios'
import { Modal, Button, message } from 'antd'
import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './StoreArticleModal.css'

export default function StoreArticleModal(props) {
    const { storeOpen, setStoreOpen, setCreateStoreOpen } = props
    const [clickList, setClickList] = useState([])
    const [data, setData] = useState([])
    const { id } = useParams()

    function closeStoreModal() {
        setStoreOpen(false)
    }

    function updateClickList(data) {
        let clickData;
        if (!data.flag) {
            clickData = clickList.filter((item) => {
                return item !== data.uuid
            })
        } else {
            clickData = [data.uuid, ...clickList]
        }
        setClickList(clickData);
    }

    function clickCreateStore() {
        setCreateStoreOpen(true)
        setStoreOpen(false)
    }

    useEffect(() => {
        axiosReq.get('/storeList/getStoreListWithIsStore', { articleId: id }).then(
            (value) => {
                let data = value.data
                setData(data);
                let clickData = data.filter((item) => {
                    return item.isStore
                })
                let click = clickData.map((item) => {
                    return item.uuid
                })
                setClickList(click)
            },
            (reason) => {
                message.error(reason.message)
            }
        )
    }, [storeOpen])

    function clickStoreArticle() {
        axiosReq.post('/storeList/updateArticleStore', { articleId: id, updateList: clickList }).then(
            (value) => {
                setStoreOpen(!storeOpen)
            },
            (reason) => {
                message.error(reason.message)
            }
        )
    }

    return (
        <div>
            <Modal
                open={storeOpen}
                title="选择收藏夹"
                footer={
                    <div style={{ width: '100%', height: '100%' }}>
                        <Button onClick={clickCreateStore} type="link" style={{ float: 'left' }}>+新建收藏夹</Button>
                        <Button type="primary" onClick={clickStoreArticle}>完成</Button>
                    </div>
                }
                onCancel={closeStoreModal}
                width='400px'
                className='store-article-modal'
                maskClosable={false}
                destroyOnClose
            >
                <div className='own-scroll-div-css store-article-modal-content'>
                    {data.map((item) => {
                        return (
                            <StoreCheckBox
                                data={item}
                                updateClickList={updateClickList}
                                key={item.uuid}
                            />
                        )
                    })}
                </div>
            </Modal>
        </div>
    )
}
