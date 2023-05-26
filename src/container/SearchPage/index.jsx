import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosReq } from '@src/util/request/axios'
import { ConfigProvider, Divider, List, message, Skeleton, Space } from 'antd'
import CommonHeader from '@src/component/Header/CommonHeader/CommonHeader'
import { EyeOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ArticleListLoading from '@src/component/Loading/ArticleListLoading/ArticleListLoading'
import InfiniteScroll from 'react-infinite-scroll-component'
import '@src/component/Main/ArticleList/ArticleList.css'

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

IconText.propTypes = {
  icon: PropTypes.any,
  text: PropTypes.any
}

function Index () {
  const { word } = useParams()
  const navigate = useNavigate()

  const [articleList, setArticleList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const size = 5

  const loadMoreData = (resetData, resetPage) => {
    const page = resetPage || currentPage
    const data = resetData || articleList
    const param = { current: page, size, word }
    axiosReq.get('/search/getArticleList', param).then(
      (value) => {
        if (!value.data || value.data.length < size) {
          setHasMore(false)
        } else {
          setHasMore(true)
        }
        setArticleList(data.concat(value.data ? value.data : []))
        setCurrentPage(page + 1)
      },
      (reason) => {
        setHasMore(false)
      }
    )
  }

  useEffect(() => {
    if (word === '') {
      navigate(-1)
      message.info('搜索内容不为空')
    }
    loadMoreData([], 1)
  }, [word])

  const listItemClick = (e) => {
    return () => {
      const w = window.open('about:blank')
      w.location.href = '/home/post/' + e
    }
  }

  return (
    <div>
      <CommonHeader />
      <div style={{
        backgroundColor: 'rgb(54, 117, 243)',
        color: '#fff'
      }}>
        <div style={{
          fontSize: '25px',
          fontWeight: '400',
          marginLeft: '20vw',
          padding: '25px 0 15px 0'
        }}>
          有关 {word} 的文章
        </div>
        <div style={{
          marginLeft: '20vw',
          padding: '25px 0 15px 0'
        }}>
          <div style={{ margin: '10px 0 0 0' }}>
            {articleList.length}篇文章
          </div>
        </div>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{
          backgroundColor: '#fff',
          marginTop: '15px',
          width: '800px',
          borderRadius: '15px'
        }}>
          <InfiniteScroll
            dataLength={articleList.length}
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
            <ConfigProvider renderEmpty={() => (<ArticleListLoading hasMore={hasMore} />)}>
              <List
                itemLayout="vertical"
                size="large"
                dataSource={articleList}
                renderItem={(item) => (
                  <List.Item
                    key={item.uuid}
                    onClick={listItemClick(item.uuid)}
                    actions={[
                      <IconText icon={EyeOutlined} text={item.readCount} key="list-vertical-message" />,
                      <IconText icon={LikeOutlined} text={item.likeCount} key="list-vertical-like-o" />,
                      <IconText icon={StarOutlined} text={item.storeCount} key="list-vertical-star-o" />
                    ]}
                    extra={
                      item.img != null && item.img.length > 0
                        ? <img
                          style={{
                            maxWidth: '250px',
                            maxHeight: '120px',
                            verticalAlign: 'middle',
                            minWidth: '120px'
                          }}
                          alt="加载图片失败"
                          src={item.img}
                        />
                        : <span></span>
                    }
                    className='article-list-item-set'
                  >
                    <List.Item.Meta
                      title={
                        <a
                          href={'/home/post/' + item.uuid}
                          target='_blank'
                          rel="noreferrer"
                          onClick={(e) => { e.stopPropagation() }}
                          style={{
                            fontWeight: 'bold',
                            fontSize: '18px'
                          }}
                        >
                          {item.title}
                        </a>
                      }
                      description={
                        <div>
                          <a
                            href={'/user/' + item.creatorId + '/msg'}
                            style={{
                              textDecoration: 'none',
                              color: 'rgba(0,0,0,.45)'
                            }}
                            onClick={(e) => { e.stopPropagation() }}
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
        </div>
      </div>
    </div>
  )
}

export default connect(
  state => ({
    userRedux: state.user
  }),
  {}
)(Index)

Index.propTypes = {
  userRedux: PropTypes.any
}
