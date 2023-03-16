import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { List, Space, Divider, Skeleton, ConfigProvider, Tag } from 'antd';
import { axiosReq } from '@src/util/request/axios';

const focusType = [
  {
    name: '关注的用户',
    id: '1',
  },
  {
    name: '关注者',
    id: '2',
  },
]

export default function UserTabFocusCard() {

  const data = [

  ]

  const [chooseType,setChooseType] = useState('1')

  const [datas, setDatas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const size = 20

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

  const clickType = (id) => {
    return () => {
      setChooseType(id);
    }
  }

  return (
    <div>
      <div style={{
        display: 'flex',
        padding: '0 0 15px 0',
        borderBottom: '1px solid #f0f0f0'
      }}>
        <div
          style={{
            fontWeight: '600',
            fontSize: '14px',
          }}
        >
          关注
        </div>
        <div style={{
          display: 'flex',
          margin: '0 0 0 auto'
        }}>
          {focusType.map((item, index) => {
            return (
              <div
                style={{
                  display: 'flex',
                }}
                key={item.id}
              >
                <div
                  style={{
                    cursor: 'pointer',
                    fontSize: '15px',
                    color: chooseType === item.id ? '#000' : '#72777b',
                  }}
                  onClick={clickType(item.id)}
                >
                  {item.name}
                </div>
                {index !== focusType.length - 1 ?
                  <span style={{
                    padding: '0 15px',
                    color: '#72777b'
                  }}>|</span> : ''
                }
              </div>
            )
          })}
        </div>
      </div>
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

      </InfiniteScroll>
    </div>
  )
}
