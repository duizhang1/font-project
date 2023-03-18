import React, { useState } from 'react'
import { Avatar, Divider, Skeleton } from 'antd'
import UserNameHref from '@src/component/AHref/UserNameHref/UserNameHref'
import InfiniteScroll from 'react-infinite-scroll-component'
import { axiosReq } from '@src/util/request/axios'

export default function UserTabsMsgCard () {
  const avatarAndNameSpace = '10px'

  const data = [
    {
      type: 'focus',
      itemData: {
        recordId: '999999999',
        avatar: 'https://p3-passport.byteimg.com/img/mosaic-legacy/3795/3033762272~180x180.awebp',
        name: '大队长',
        userId: '123456',
        focusName: '小队长',
        focusUserId: '44444'
      }
    },
    {
      type: 'likeArticle',
      itemData: {
        recordId: '484812662',
        avatar: 'https://p3-passport.byteimg.com/img/mosaic-legacy/3795/3033762272~180x180.awebp',
        name: '大队长',
        userId: '9999999484',
        companyName: '京东',
        position: 'software enginee',
        createTime: '2022-06-06 23:58',
        title: 'list怎么使用啊啊sadsadddddddddddddddddasdwqrtgsvcfgsdfgfdggrte我红红火火恍恍惚惚水水水水水',
        summary: '前沿 最近 web3.0 的呼1111111111111111声真的是越来越高前沿 最近 web3.0 的呼1111111111111111声真的是越来越高前沿 最近 web3.0 的呼1111111111111111声真的是越来越高前沿 最近 web3.0 的呼1111111111111111声真的是越来越高，也越来越疯狂。对于我们前端来说，我们需要具备什么技术呢？ 首先先介绍一下 web3.0 是如何衍生的 互联网 我们先聊一下啥...',
        img: 'http://resource.duizhangz.cn//FqhrHawMGXoRRBWx-NKMp4wqfOT4'
      }
    },
    {
      type: 'createArticle',
      itemData: {
        recordId: '484111812662',
        avatar: 'https://p3-passport.byteimg.com/img/mosaic-legacy/3795/3033762272~180x180.awebp',
        name: '大队长',
        userId: '9999999484',
        companyName: '京东',
        position: 'software enginee',
        createTime: '2022-06-06 23:58',
        title: 'list怎么使用啊啊sadsadddddddddddddddddasdwqrtgsvcfgsdfgfdggrte我红红火火恍恍惚惚水水水水水',
        summary: '前沿 最近 web3.0 的呼1111111111111111声真的是越来越高前沿 最近 web3.0 的呼1111111111111111声真的是越来越高前沿 最近 web3.0 的呼1111111111111111声真的是越来越高前沿 最近 web3.0 的呼1111111111111111声真的是越来越高，也越来越疯狂。对于我们前端来说，我们需要具备什么技术呢？ 首先先介绍一下 web3.0 是如何衍生的 互联网 我们先聊一下啥...',
        img: 'http://resource.duizhangz.cn//FqhrHawMGXoRRBWx-NKMp4wqfOT4'
      }
    }
  ]

  const itemCss = {
    padding: '10px 0 10px 0',
    borderBottom: '1px solid #e5e6eb'
  }

  const [datas, setDatas] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const size = 20

  const loadMoreData = (resetData, resetPage) => {
    const page = resetPage || currentPage
    const data = resetData || datas
    const params = { current: page, size }
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
  }

  function focusItem (item) {
    return (
      <div style={itemCss} key={item.recordId}>
        <Avatar size={'large'} src={item.avatar} />
        <span style={{
          textAlign: 'center',
          lineHeight: '20px',
          padding: `0 0 0 ${avatarAndNameSpace}`
        }}>
          <UserNameHref name={item.name} uuid={item.userId} />
          <span style={{
            padding: '0 5px'
          }}>关注了</span>
          <UserNameHref name={item.focusName} uuid={item.focusUserId} />
        </span>
      </div>
    )
  }

  function likeArticleItem (item, type) {
    return (
      <div style={itemCss} key={item.recordId}>
        <div style={{
          display: 'flex'
        }}>
          <Avatar size={'large'} src={item.avatar} style={{ alignSelf: 'center' }} />
          <div style={{
            padding: `0 0 0 ${avatarAndNameSpace}`
          }}>
            <UserNameHref name={item.name} uuid={item.userId} />
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
          href={`/home/post/${item.recordId}`}
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
            <img
              style={{
                height: '65px',
                width: '65px',
                objectFit: 'cover',
                display: item.img ? 'block' : 'none'
              }}
              alt="img"
              src="http://resource.duizhangz.cn//FqhrHawMGXoRRBWx-NKMp4wqfOT4"
            />
          </div>
        </a>
      </div >
    )
  }

  return (
    <InfiniteScroll
      dataLength={data.length}
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
      {data.map((item) => {
        if (item.type === 'focus') {
          return focusItem(item.itemData)
        } else if (item.type === 'likeArticle' || item.type === 'createArticle') {
          return likeArticleItem(item.itemData, item.type)
        }
        return ''
      })}
    </InfiniteScroll>
  )
}
