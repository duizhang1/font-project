import PropTypes from 'prop-types'
import React from 'react'
import { Dropdown, message, Modal, Tag, Tooltip } from 'antd'
import { EllipsisOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import './CreatorArticleItem.css'
import { useNavigate } from 'react-router-dom'
import { axiosReq } from '@src/util/request/axios'
const { confirm } = Modal

const approveIcon = [
  {
    key: 0,
    value: (
      <Tag key={'1'} color="processing">审核中</Tag>
    )
  },
  {
    key: 1,
    value: (
      <Tag key={'2'} color="processing">审核中</Tag>
    )
  },
  {
    key: 2,
    value: (
      <Tag key={'3'} color="success">审核通过</Tag>
    )
  },
  {
    key: 3,
    value: (
      <Tag key={'4'} color="error">未通过</Tag>
    )
  }
]

export default function CreatorArticleItem (props) {
  const { data, afterDelete } = props
  const navigate = useNavigate()

  const dpitem = [
    {
      key: 'edit',
      label: '编辑'
    },
    {
      key: 'delete',
      label: '删除'
    }
  ]

  function clickDP (e) {
    if (e.key === 'edit') {
      navigate(`/mdeditor/${data.uuid}`)
    } else if (e.key === 'delete') {
      showDeleteConfirm()
    }
    e.domEvent.stopPropagation()
  }

  const menuProps = {
    items: dpitem,
    onClick: clickDP
  }

  function clickItem () {
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
      onOk () {
        axiosReq.post('/article/deleteArticle', { articleId: data.uuid }).then(
          value => {
            message.info(value.message)
            afterDelete()
          },
          reason => {
            message.error(reason.message)
          }
        )
      },
      onCancel () {

      }
    })
  }

  return (
    <Tooltip title={data.approveState === 3 ? data.approveTip : ''} color={'gold'}>
    <div className='creator-article-item-div' onClick={clickItem}>
      <div className='creator-article-item-head'>
        <div style={{ float: 'left' }}>
          {data.title}
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <Dropdown
            menu={menuProps}
            placement="bottom"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <EllipsisOutlined/>
          </Dropdown>
        </div>
      </div>
      <div className='creator-article-item-info'>
        <span>{data.createTime}</span>
        <span className='creator-article-item-info-slice'>|</span>
        <span>{data.readCount}阅读</span>
        <span className='creator-article-item-info-point'>·</span>
        <span>{data.likeCount}点赞</span>
        <span className='creator-article-item-info-point'>·</span>
        <span>{data.storeCount}收藏</span>
        <span className='creator-article-item-info-point'> </span>
        {approveIcon.map((item) => {
          if (item.key === data.approveState) {
            return item.value
          }
          return ''
        })}
      </div>
    </div>
    </Tooltip>
  )
}

CreatorArticleItem.propTypes = {
  afterDelete: PropTypes.func,
  data: PropTypes.object
}
