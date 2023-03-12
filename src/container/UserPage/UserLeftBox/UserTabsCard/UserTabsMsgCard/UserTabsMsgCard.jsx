import React, { useState } from 'react'
import { Avatar } from 'antd'
import UserNameHref from '@src/component/AHref/UserNameHref/UserNameHref'
import InfiniteScroll from 'react-infinite-scroll-component';
import { axiosReq } from '@src/util/request/axios';
import { List, Space, Divider, Skeleton, ConfigProvider } from 'antd';

export default function UserTabsMsgCard() {

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
        recordId: '8888880',
        companyName: '京东',
        position: 'software enginee',
        createTime: '2022-06-06 23:58',
        title: 'list怎么使用啊啊'
      }
    }
  ]

  const itemCss = {
    padding: '0 0 10px 0',
    borderBottom: '1px solid #e5e6eb'
  }

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

  function focusItem(item) {
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

  function likeArticleItem(item) {
    return (
      <div  style={itemCss} key={item.recordId}>
        <div style={{
          display: 'flex'
        }}>
          <Avatar size={'large'} src={item.avatar} style={{alignSelf: 'center'}} />
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
            alignSelf: 'center'
          }}>
            点赞该文章
          </div>
        </div>
        <div>
          {item.title}
        </div>
        <div>
          <span>
            {item.summary}
          </span>
          <img alt="img" src="http://resource.duizhangz.cn//FqhrHawMGXoRRBWx-NKMp4wqfOT4" />
        </div>
      </div>
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
        if (item.type === 'focus') {
          return focusItem(item.itemData)
        } else if (item.type === 'likeArticle') {
          return likeArticleItem(item.itemData)
        }
      })}
    </InfiniteScroll>
  )
}
