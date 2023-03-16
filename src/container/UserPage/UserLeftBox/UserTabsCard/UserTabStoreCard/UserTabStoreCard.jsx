import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { axiosReq } from '@src/util/request/axios';
import { List, Space, Divider, Skeleton, ConfigProvider, Tag } from 'antd';
import { LockTwoTone, UnlockTwoTone, EditOutlined, CloseOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import './UserTabStoreCard.css'
import UserTabStoreEditModal from '@src/component/Modal/UserTabStoreEditModal/UserTabStoreEditModal';
import DeleteConfirmModal from '@src/component/Modal/DeleteConfirmModal/DeleteConfirmModal';

function UserTabStoreCard(props) {
  const { userRedux } = props
  const { userId } = useParams()

  const data = [
    {
      uuid: '999999',
      name: '前端',
      summary: '这里有丰富的内容',
      isDefault: '1',
      state: '1',
      updateTime: '2022-06-27',
      articleNum: 99,
    },
    {
      uuid: '9919999',
      name: '后端',
      summary: '这里有丰富的内容',
      isDefault: '0',
      state: '2',
      updateTime: '2022-06-27',
      articleNum: 99,
    }
  ]

  const [datas, setDatas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const size = 20

  const [editOpen, setEditOpen] = useState(false)
  const [editStoreid, setEditStoreid] = useState('');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [deleteId,setDeleteId] = useState('')

  const loadMoreData = (resetData, resetPage) => {
    let page = resetPage ? resetPage : currentPage;
    let data = resetData ? resetData : datas;
    let params = { current: page, size }
    axiosReq.get('/article/getArticleList', params).then(
      (value) => {
        if (!value.data || value.data.length < size) {
          setHasMore(false)
        } else {
          setHasMore(true)
        }
        setDatas(data.concat(value.data ? value.data : []))
        setCurrentPage(page + 1)
      },
      (reason) => {
        setHasMore(false)
      }
    )
  };

  function editStoreItem(storeId) {
    return () => {
      setEditOpen(true)
      setEditStoreid(storeId)
    }
  }

  function deleteStoreItem(storeId) {
    return () => {
      setIsConfirmOpen(true)
      setDeleteId(storeId)
    }
  }

  function onDelete() {
    console.log(deleteId)
    setIsConfirmOpen(false)
  }

  function singleItem(item) {
    return (
      <div
        className='user-tab-store-card-div'
        key={item.uuid}
        style={{
          padding: '5px 0 15px 0',
          borderBottom: '1px solid #f0f0f0'
        }}
      >
        <div>
          <span style={{
            color: '#252933',
            fontWeight: '500',
            fontSize: '16px',
          }}>{item.name}</span>
          {userRedux.uuid === userId && item.state === '1' ?
            <UnlockTwoTone style={{ fontSize: '16px', marginLeft: '5px' }} /> :
            <LockTwoTone style={{ fontSize: '16px', marginLeft: '5px' }} />
          }
          {userRedux.uuid === userId && item.isDefault === '1' ?
            <Tag color="processing" style={{ fontSize: '16px', marginLeft: '5px' }}>默认</Tag> :
            ''
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
          <div
            className='user-tab-store-card-tools'
            style={{
              marginLeft: 'auto',
            }}
          >
            <div
              onClick={editStoreItem(item.uuid)}
              style={{
                cursor: 'pointer'
              }}
            >
              <EditOutlined />编辑
            </div>
            <div
              style={{
                marginLeft: '5px',
                cursor: 'pointer',
                display: item.isDefault === '1' ? 'none' : 'block',
              }}
              onClick={deleteStoreItem(item.uuid)}
            >
              <CloseOutlined />删除
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={hasMore}
        loader={
          <Skeleton
            style={{ padding: '0 11px', margin: '10px 0 0 0' }}
            paragraph={{
              rows: 3,
            }}
            active
            round
            title
          />
        }
        pullDownToRefreshThreshold={0}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
      >
        {data.map((item) => {
          return singleItem(item)
        })}
      </InfiniteScroll>
      <UserTabStoreEditModal
        editOpen={editOpen}
        setEditOpen={setEditOpen}
        editStoreid={editStoreid}
      />
      <DeleteConfirmModal
        onDelete={onDelete}
        isConfirmOpen={isConfirmOpen}
        setIsConfirmOpen={setIsConfirmOpen}
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