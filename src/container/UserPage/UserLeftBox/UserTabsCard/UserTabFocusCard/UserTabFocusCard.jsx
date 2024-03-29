import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Divider, Skeleton } from 'antd'
import { axiosReq } from '@src/util/request/axios'
import AvatarAndHref from '@src/component/Avatar/AvatarAndHref/AvatarAndHref'
import UserNameHref from '@src/component/AHref/UserNameHref/UserNameHref'
import SubscribeButton from '@src/component/Button/SubscribeButton/SubscribeButton'
import { useParams } from 'react-router-dom'

const focusType = [
  {
    name: '关注的用户',
    id: '1'
  },
  {
    name: '关注者',
    id: '2'
  }
]

export default function UserTabFocusCard () {
  const { userId } = useParams()
  const [chooseType, setChooseType] = useState('1')

  const [datas, setDatas] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const size = 20

  const loadMoreData = (resetData, resetPage, type) => {
    const page = resetPage || currentPage
    const data = resetData || datas
    const url = type === '1' ? '/userSubscribe/getUserFocusByUserId' : '/userSubscribe/getUserFollowerByUserId'
    const params = { current: page, size, userId }
    axiosReq.get(url, params).then(
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
  }

  useEffect(() => {
    loadMoreData([], 1, chooseType)
  }, [chooseType])

  const clickType = (id) => {
    return () => {
      setChooseType(id)
      // todo 设置数据请求并发送数据请求
    }
  }

  function userFocusItem (item) {
    return (
      <div
        key={item.userSubscribe.uuid}
        style={{
          display: 'flex',
          height: '70px',
          alignItems: 'center',
          borderBottom: '1px solid #e5e6eb'
        }}
      >
        <div style={{
          display: 'flex'
        }}>
          <AvatarAndHref srcHref={item.avatar} uuid={item.userId} center/>
          <div
            style={{
              marginLeft: '5px'
            }}
          >
            <UserNameHref name={item.username} uuid={item.userId} />
            <div style={{
              fontSize: '13px',
              fontWeight: '500',
              color: '#b9c0c8'
            }}>
              {item.companyAndPosition}
            </div>
          </div>
        </div>
        <div style={{
          margin: '0 0 0 auto'
        }}>
          <SubscribeButton userId={item.userId} />
        </div>
      </div>
    )
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
            fontSize: '14px'
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
                  display: 'flex'
                }}
                key={item.id}
              >
                <div
                  style={{
                    cursor: 'pointer',
                    fontSize: '15px',
                    color: chooseType === item.id ? '#000' : '#72777b'
                  }}
                  onClick={clickType(item.id)}
                >
                  {item.name}
                </div>
                {index !== focusType.length - 1
                  ? <span style={{
                    padding: '0 15px',
                    color: '#72777b'
                  }}>|</span>
                  : ''
                }
              </div>
            )
          })}
        </div>
      </div>
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
          if (chooseType === '1' || chooseType === '2') {
            return userFocusItem(item)
          }
          return ''
        })}
      </InfiniteScroll>
    </div>
  )
}
