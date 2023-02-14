import React from 'react'
import { Dropdown, Modal } from 'antd';
import { EllipsisOutlined,ExclamationCircleOutlined } from '@ant-design/icons'
import './CreatorArticleItem.css'
import { useNavigate } from 'react-router-dom';
const { confirm } = Modal;

export default function CreatorArticleItem() {
    const navigate = useNavigate()
    const data = {
        uuid: 'c3f9b85a896a3bad2c5e3eddf5b57449',
        title: 'Arrays.asList()你真的知道怎么用嘛？',
        createTime: '2022-06-27 15:46',

    }

    const dpitem = [
        {
            key: 'edit',
            label: '编辑'
        },
        {
            key: 'delete',
            label: '删除'
        },
    ]

    function clickDP(e) {
        if (e.key === 'edit') {
            navigate(`/mdeditor/${data.uuid}`)
        } else if(e.key === 'delete') {
            showDeleteConfirm()
        }
        e.domEvent.stopPropagation()
    }

    const menuProps = {
        items: dpitem,
        onClick: clickDP
    }

    function clickItem() {
        navigate(`/home/post/${data.uuid}`)
    }

    const showDeleteConfirm = () => {
        confirm({
          title: '你确定删除该文章吗？',
          icon: <ExclamationCircleOutlined />,
          content: '删除后操作不可逆',
          okText: '删除',
          okType: 'danger',
          cancelText: '取消',
          onOk() {
            console.log('OK');
          },
          onCancel() {
            
          },
        });
    };

    return (
        <div className='creator-article-item-div' onClick={clickItem}>
            <div className='creator-article-item-head'>
                <div style={{ float: 'left' }}>
                    {data.title}
                </div>
                <div style={{ marginLeft: 'auto' }}>
                    <Dropdown
                        menu={menuProps}
                        placement="bottom"
                        onClick={(e)=>{e.stopPropagation()}}
                    >
                        <EllipsisOutlined />
                    </Dropdown>
                </div>
            </div>
            <div className='creator-article-item-info'>
                <span>{data.createTime}</span>
                <span className='creator-article-item-info-slice'>|</span>
                <span>18阅读</span>
                <span className='creator-article-item-info-point'>·</span>
                <span>0点赞</span>
                <span className='creator-article-item-info-point'>·</span>
                <span>0评论</span>
                <span className='creator-article-item-info-point'>·</span>
                <span>0收藏</span>
            </div>
        </div>
    )
}
