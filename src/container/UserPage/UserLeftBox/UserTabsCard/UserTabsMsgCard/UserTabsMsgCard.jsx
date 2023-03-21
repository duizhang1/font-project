import React, { useEffect, useState } from 'react'
import { Avatar, Divider, Skeleton } from 'antd'
import UserNameHref from '@src/component/AHref/UserNameHref/UserNameHref'
import InfiniteScroll from 'react-infinite-scroll-component'
import { axiosReq } from '@src/util/request/axios'
import { useParams } from 'react-router-dom'

export default function UserTabsMsgCard () {
  const avatarAndNameSpace = '10px'

  useEffect(() => {
    loadMoreData([], 1)
  }, [])

  const itemCss = {
    padding: '10px 0 10px 0',
    borderBottom: '1px solid #e5e6eb'
  }

  const { userId } = useParams()

  const [datas, setDatas] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const size = 20

  const loadMoreData = (resetData, resetPage) => {
    const page = resetPage || currentPage
    const data = resetData || datas
    const params = { current: page, size, userId }
    axiosReq.get('/user/getUserAction', params).then(
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

  function focusItem (item) {
    return (
      <div style={itemCss} key={item.uuid}>
        <Avatar size={'large'} src={item.avatar} />
        <span style={{
          textAlign: 'center',
          lineHeight: '20px',
          padding: `0 0 0 ${avatarAndNameSpace}`
        }}>
          <UserNameHref name={item.username} uuid={item.userId} />
          <span style={{
            padding: '0 5px'
          }}>关注了</span>
          <UserNameHref name={item.beSubscribeName} uuid={item.beSubscribeId} />
        </span>
      </div>
    )
  }

  function likeArticleItem (item, type) {
    return (
      <div style={itemCss} key={item.uuid}>
        <div style={{
          display: 'flex'
        }}>
          <Avatar size={'large'} src={item.avatar} style={{ alignSelf: 'center' }} />
          <div style={{
            padding: `0 0 0 ${avatarAndNameSpace}`
          }}>
            <UserNameHref name={item.username} uuid={item.userId} />
            <div>
              {item.position ? item.position + ' @ ' : ''}
              {item.companyName ? item.companyName + ' · ' : ''}
              {item.createTime}
            </div>
          </div>
          <div style={{
            margin: '0 0 0 auto',
            alignSelf: 'center',
            color: '#1890ff'
          }}>
            {
              type === 'likeArticle' ? '点赞了文章' : ''
            }
            {
              type === 'createArticle' ? '创建了文章' : ''
            }
          </div>
        </div>
        <a
          href={`/home/post/${item.articleId}`}
          style={{
            margin: '5px 0 5px 50px',
            display: 'block'
          }}

        >
          <h3 style={{
            fontSize: '17px',
            color: '#17181a',
            lineHeight: '1.5',
            verticalAlign: 'middle',
            fontWeight: 'bold',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {item.title}
          </h3>
          <div style={{
            display: 'flex',
            margin: '5px 0 5px 0'
          }}>
            <div
              className='text-over-hidden-three'
              style={{
                fontSize: '15px',
                color: '#5c6066',
                wordBreak: 'break-all'
              }}
            >
              {item.summary}
            </div>
            <div style={{
              margin: '0 0 0 auto'
            }}>
              <img
                style={{
                  height: '65px',
                  width: '65px',
                  objectFit: 'cover',
                  display: item.img ? 'block' : 'none'
                }}
                alt="img"
                src={item.img}
              />
            </div>
          </div>
        </a>
      </div >
    )
  }

  return (
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
        if (item.type === 'focus') {
          return focusItem(item.obj)
        } else if (item.type === 'likeArticle' || item.type === 'createArticle') {
          return likeArticleItem(item.obj, item.type)
        }
        return ''
      })}
    </InfiniteScroll>
  )
}
