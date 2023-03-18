import React, { useEffect, useState } from 'react'
import { LikeFilled, CommentOutlined, StarFilled, LikeTwoTone } from '@ant-design/icons'
import { Affix, message } from 'antd'
import './ArticleTool.css'
import { axiosReq } from '@src/util/request/axios'
import { useParams } from 'react-router-dom'
import StoreArticleModal from '@src/component/Modal/StoreArtilceModal/StoreArticleModal'
import CreateStoreModal from '@src/component/Modal/CreateStoreModal/CreateStoreModal'
import { connect } from 'react-redux'

function ArticleTool (props) {
  const { id } = useParams()
  const [liked, setLiked] = useState(false)
  const [storeOpen, setStoreOpen] = useState(false)
  const [createStoreOpen, setCreateStoreOpen] = useState(false)

  function clickLike (e) {
    if (!liked) {
      axiosReq.get('/article/likeArticle', { articleId: id }).then(
        (value) => {
          setLiked(true)
        },
        (reason) => {
          setLiked(false)
          message.error(reason.message)
        }
      )
    } else {
      axiosReq.get('/article/dislikeArticle', { articleId: id }).then(
        (value) => {
          setLiked(false)
        },
        (reason) => {
          setLiked(true)
          message.error(reason.message)
        }
      )
    }
    setLiked(!liked)
  }

  function clickStore (e) {
    setStoreOpen(!storeOpen)
  }

  useEffect(() => {
    axiosReq.get('/article/getArticleLike', { articleId: id }).then(
      (value) => {
        if (value.data && value.data.state === 1) {
          setLiked(true)
        }
      },
      (reason) => {

      }
    )
  }, [])

  return (
        <Affix offsetTop={0}>
            <div className='article-tool-div'>
                <div className='article-tool-single-tool' onClick={clickLike}>
                    {liked
                      ? <LikeTwoTone style={{ fontSize: '22px', color: '#515767' }} />
                      : <LikeFilled style={{ fontSize: '22px', color: '#515767' }} />
                    }
                </div>
                <a href='#articlePageComment'>
                    <div className='article-tool-single-tool' style={{ margin: '15px 0 0 0' }}>
                        <CommentOutlined style={{ fontSize: '22px', color: '#515767' }} />
                    </div>
                </a>
                <div
                    className='article-tool-single-tool'
                    onClick={clickStore}
                    style={{ margin: '15px 0 0 0' }}
                >
                    <StarFilled style={{ fontSize: '22px', color: '#515767' }} />
                </div>
                <StoreArticleModal
                    storeOpen={storeOpen}
                    setStoreOpen={setStoreOpen}
                    setCreateStoreOpen={setCreateStoreOpen}
                />
                <CreateStoreModal
                    createStoreOpen={createStoreOpen}
                    setCreateStoreOpen={setCreateStoreOpen}
                    setStoreOpen={setStoreOpen}
                />
            </div>
        </Affix>
  )
}

export default connect(
  (state) => ({
    userRedux: state.user
  }),
  {}
)(ArticleTool)
