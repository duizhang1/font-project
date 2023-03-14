import { LikeOutlined, EyeOutlined, StarOutlined } from '@ant-design/icons';
import ArticleListLoading from '@src/component/Loading/ArticleListLoading/ArticleListLoading';
import { axiosReq } from '@src/util/request/axios';
import { List, Space, Divider, Skeleton, ConfigProvider } from 'antd';
import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import './UserTabArticleCard.css'

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export default function UserTabArticleCard() {

  const [datas, setDatas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const size = 5

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

  useEffect(() => {
    loadMoreData([], 1);
  }, []);

  const listItemClick = (e) => {
    return () => {
      const w = window.open('about:blank');
      w.location.href = '/home/post/' + e
    }
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
      <ConfigProvider renderEmpty={() => (<ArticleListLoading hasMore={hasMore} />)}>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={datas}
          renderItem={(item) => (
            <List.Item
              key={item.uuid}
              onClick={listItemClick(item.uuid)}
              actions={[
                <IconText icon={EyeOutlined} text={item.readCount} key="list-vertical-message" />,
                <IconText icon={LikeOutlined} text={item.likeCount} key="list-vertical-like-o" />,
                <IconText icon={StarOutlined} text={item.storeCount} key="list-vertical-star-o" />,
              ]}
              extra={
                item.img != null ? <img
                  style={{
                    maxWidth: '250px',
                    maxHeight: '120px',
                    verticalAlign: 'middle',
                    minWidth: '120px'
                  }}
                  alt="加载图片失败"
                  src={item.img}
                /> : <span></span>
              }
              className='user-tab-article-card-item'
            >
              <List.Item.Meta
                title={
                  <a
                    href={'/home/post/' + item.uuid}
                    target='_blank'
                    rel="noreferrer"
                    onClick={(e) => { e.stopPropagation(); }}
                    style={{
                      fontWeight: 'bold',
                      fontSize: '18px',
                    }}
                  >
                    {item.title}
                  </a>
                }
                description={
                  <div>
                    <a
                      href={'/user/' + item.creatorId}
                      style={{
                        textDecoration: 'none',
                        color: 'rgba(0,0,0,.45)',
                      }}
                      onClick={(e) => { e.stopPropagation(); }}
                    >
                      {item.creatorName}
                    </a>
                    {'\u00A0'}| {item.sortName}{item.labelName.map((item) => { return <span key={item}> • {item}</span> })}
                  </div>
                }
              />
              <div className='text-over-hidden-one'>{item.summary}</div>
            </List.Item>
          )
          }
        />
      </ConfigProvider>
    </InfiniteScroll>
  )
}
