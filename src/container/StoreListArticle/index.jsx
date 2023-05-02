import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosReq } from '@src/util/request/axios'
import { ConfigProvider, Divider, List, message, Skeleton, Space } from 'antd'
import CommonHeader from '@src/component/Header/CommonHeader/CommonHeader'
import { EyeOutlined, LikeOutlined, LockTwoTone, StarOutlined, UnlockTwoTone } from '@ant-design/icons'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ArticleListLoading from '@src/component/Loading/ArticleListLoading/ArticleListLoading'
import InfiniteScroll from 'react-infinite-scroll-component'
import '@src/component/Main/ArticleList/ArticleList.css'
import DeleteConfirmModal from '@src/component/Modal/DeleteConfirmModal/DeleteConfirmModal'

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

function Index (props) {
  const { userRedux } = props
  const { id } = useParams()
  const navigate = useNavigate()

  const [storeList, setStoreList] = useState({})

  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [removeId, setRemoveId] = useState('')

  const [storeListArticle, setStoreListArticle] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const size = 5

  const loadMoreData = (resetData, resetPage) => {
    const page = resetPage || currentPage
    const data = resetData || storeListArticle
    const param = { current: page, size, storeListId: id }
    axiosReq.get('/storeList/getStoreListArticleById', param).then(
      (value) => {
        if (!value.data || value.data.length < size) {
          setHasMore(false)
        } else {
          setHasMore(true)
        }
        setStoreListArticle(data.concat(value.data ? value.data : []))
        setCurrentPage(page + 1)
      },
      (reason) => {
        setHasMore(false)
      }
    )
  }

  useEffect(() => {
    axiosReq.get('/storeList/getStoreInfo', { storeListId: id }).then(
      value => {
        setStoreList(value.data)
        loadMoreData([], 1)
      },
      reason => {
        message.error(reason.message)
        navigate(-1)
      }
    )
  }, [id])

  const listItemClick = (e) => {
    return () => {
      const w = window.open('about:blank')
      w.location.href = '/home/post/' + e
    }
  }

  function removeArticle () {
    setIsConfirmOpen(false)
    if (removeId === null || removeId === '') {
      return
    }
    axiosReq.post('/storeList/removeArticle', { storeListId: id, articleId: removeId }).then(
      value => {
        message.info(value.message)
        onUpdateOrDeleteFinish()
      },
      reason => {
        message.error(reason.message)
      }
    )
  }

  function onUpdateOrDeleteFinish () {
    loadMoreData([], 1)
  }

  function onClickRemove (e, articleId) {
    setIsConfirmOpen(true)
    setRemoveId(articleId)
    e.stopPropagation()
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
          {storeList.name}
          {
            userRedux.uuid === storeList.userId && storeList.state === '1'
              ? <UnlockTwoTone style={{ fontSize: '25px', marginLeft: '5px' }}/>
              : <LockTwoTone style={{ fontSize: '25px', marginLeft: '5px' }}/>
          }
        </div>
        <div style={{
          marginLeft: '20vw',
          padding: '25px 0 15px 0'
        }}>
          <div>
            {storeList.summary}
          </div>
          <div style={{ margin: '10px 0 0 0' }}>
            收藏夹一共{storeList.articleNum}篇文章
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
            dataLength={storeListArticle.length}
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
                dataSource={storeListArticle}
                renderItem={(item) => (
                  <List.Item
                    key={item.uuid}
                    onClick={listItemClick(item.uuid)}
                    actions={[
                      <IconText icon={EyeOutlined} text={item.readCount} key="list-vertical-message" />,
                      <IconText icon={LikeOutlined} text={item.likeCount} key="list-vertical-like-o" />,
                      <IconText icon={StarOutlined} text={item.storeCount} key="list-vertical-star-o" />,
                      <Space key={'remove'}>{userRedux.uuid === storeList.userId ? (<span style={{ color: 'rgb(54, 117, 243)' }} onClick={(e) => { onClickRemove(e, item.uuid) }}>移出收藏夹</span>) : ''}</Space>
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
      <DeleteConfirmModal
        onDelete={removeArticle}
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
)(Index)

Index.propTypes = {
  userRedux: PropTypes.any
}
