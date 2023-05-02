import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { axiosReq } from '@src/util/request/axios'
import { Divider, message, Skeleton, Tag } from 'antd'
import { LockTwoTone, UnlockTwoTone, EditOutlined, CloseOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import './UserTabStoreCard.css'
import UserTabStoreEditModal from '@src/component/Modal/UserTabStoreEditModal/UserTabStoreEditModal'
import DeleteConfirmModal from '@src/component/Modal/DeleteConfirmModal/DeleteConfirmModal'
import PropTypes from 'prop-types'
import CreateStoreModal from '@src/component/Modal/CreateStoreModal/CreateStoreModal'

function UserTabStoreCard (props) {
  const { userRedux } = props
  const { userId } = useParams()

  useEffect(() => {
    loadMoreData([], 1)
  }, [])

  const [datas, setDatas] = useState([])
  const [nextPage, setNextPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const size = 20

  const [editOpen, setEditOpen] = useState(false)
  const [editStoreid, setEditStoreid] = useState('')
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [deleteId, setDeleteId] = useState('')
  const [addOpen, setAddOpen] = useState(false)

  const loadMoreData = (resetData, resetPage) => {
    const page = resetPage || nextPage
    const data = resetData || datas
    const params = { current: page, size, userId }
    axiosReq.get('/storeList/getUserStoreList', params).then(
      (value) => {
        if (!value.data || value.data.length < size) {
          setHasMore(false)
        } else {
          setHasMore(true)
        }
        setDatas(data.concat(value.data ? value.data : []))
        setNextPage(page + 1)
      },
      (reason) => {
        setHasMore(false)
      }
    )
  }

  function editStoreItem (e, storeId) {
    setEditOpen(true)
    setEditStoreid(storeId)
    e.stopPropagation()
  }

  function deleteStoreItem (e, storeId) {
    setIsConfirmOpen(true)
    setDeleteId(storeId)
    e.stopPropagation()
  }

  function onDelete () {
    setIsConfirmOpen(false)
    axiosReq._delete('/storeList/deleteStoreList', { storeListId: deleteId }).then(
      value => {
        message.info(value.message)
        onUpdateOrDeleteFinish()
      },
      reason => {
        message.error(reason.message)
      }
    )
  }

  function showAddStoreListModal () {
    setAddOpen(true)
  }

  function onUpdateOrDeleteFinish () {
    loadMoreData([], 1)
  }

  function onCreateFinish () {
    onUpdateOrDeleteFinish()
  }

  function clickOnStoreList (e) {
    return () => {
      const w = window.open('about:blank')
      w.location.href = '/collection/' + e
    }
  }

  function singleItem (item) {
    return (
      <div
        className='user-tab-store-card-div'
        key={item.uuid}
        style={{
          padding: '5px 0 15px 0',
          borderBottom: '1px solid #f0f0f0',
          cursor: 'pointer'
        }}
        onClick={clickOnStoreList(item.uuid)}
      >
        <div>
          <span style={{
            color: '#252933',
            fontWeight: '500',
            fontSize: '16px'
          }}>{item.name}</span>
          {item.state === '1'
            ? <UnlockTwoTone style={{ fontSize: '16px', marginLeft: '5px' }}/>
            : <LockTwoTone style={{ fontSize: '16px', marginLeft: '5px' }}/>
          }
          {item.isDefault === 1
            ? <Tag color="processing" style={{ fontSize: '16px', marginLeft: '5px' }}>默认</Tag>
            : ''
          }
        </div>
        <div
          className='text-over-hidden-one'
          style={{
            lineHeight: '22px',
            marginTop: '8px',
            fontSize: '14px',
            color: '#515767'
          }}
        >
          {item.summary}
        </div>
        <div style={{
          display: 'flex',
          fontSize: '13px',
          lineHeight: '22px',
          marginTop: '8px',
          color: '#8a919f'
        }}>
          <div>{item.articleNum}篇文章 · {item.updateTime}</div>
          {userRedux.uuid === item.userId
            ? (<div
            className='user-tab-store-card-tools'
            style={{
              marginLeft: 'auto'
            }}
          >
            <div
              onClick={(event => editStoreItem(event, item.uuid))}
              style={{
                cursor: 'pointer'
              }}
            >
              <EditOutlined/>编辑
            </div>
            <div
              style={{
                marginLeft: '5px',
                cursor: 'pointer',
                display: item.isDefault === 1 ? 'none' : 'block'
              }}
              onClick={(e) => { deleteStoreItem(e, item.uuid) }}
            >
              <CloseOutlined/>删除
            </div>
          </div>)
            : ''}
        </div>
      </div>
    )
  }

  return (
    <div>
      {userRedux.uuid === userId
        ? (<div style={{ display: 'flex', height: '25px', lineHeight: '25px' }}>
          <div
            style={{
              margin: '0 0 0 auto',
              cursor: 'pointer',
              color: '#1e80ff',
              fontSize: '14px'
            }}
            onClick={showAddStoreListModal}
          >
            +添加收藏夹
          </div>
        </div>)
        : ''
      }
      <InfiniteScroll
        dataLength={datas.length}
        next={loadMoreData}
        hasMore={hasMore}
        loader={
          <Skeleton
            style={{ padding: '0 11px', margin: '10px 0 0 0' }}
            paragraph={{
              rows: 3
            }}
            active
            round
            title
          />
        }
        pullDownToRefreshThreshold={0}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
      >
        {datas.map((item) => {
          return singleItem(item)
        })}
      </InfiniteScroll>
      <UserTabStoreEditModal
        editOpen={editOpen}
        setEditOpen={setEditOpen}
        editStoreid={editStoreid}
        onUpdateFinish={onUpdateOrDeleteFinish}
      />
      <DeleteConfirmModal
        onDelete={onDelete}
        isConfirmOpen={isConfirmOpen}
        setIsConfirmOpen={setIsConfirmOpen}
      />
      <CreateStoreModal
        setCreateStoreOpen={setAddOpen}
        createStoreOpen={addOpen}
        onCreateFinish={onCreateFinish}
      />
    </div>
  )
}

export default connect(
  state => ({
    userRedux: state.user
  }),
  {}
)(UserTabStoreCard)

UserTabStoreCard.propTypes = {
  userRedux: PropTypes.any
}
