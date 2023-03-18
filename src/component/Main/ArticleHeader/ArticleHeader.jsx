import React, { useState } from 'react'
import { Tabs } from 'antd'
import HotBoardButton from '../HotBoardButton/HotBoardButton'
import { connect } from 'react-redux'
import { setArticleListHeaderAction } from '@src/redux/action/ArticleListHeader'
import PropTypes from 'prop-types'

function ArticleHeader (props) {
  const [currentKey, setCurrentKey] = useState('1')
  const { setArticleListHeaderAction } = props

  const tabChange = (key, e) => {
    setCurrentKey(key)
    if (key === '1') {
      setArticleListHeaderAction({ orderBy: key, hotDay: '0' })
    } else {
      setArticleListHeaderAction({ orderBy: key, hotDay: '3' })
    }
  }

  return (
        <div style={{
          padding: '0 15px',
          overflow: 'hidden'
        }}>
            <Tabs
                defaultActiveKey="1"
                items={[
                  {
                    label: <span style={{ height: '32px', lineHeight: '32px' }}>最新</span>,
                    key: '1'
                  },
                  {
                    label: <HotBoardButton
                        currentKey={currentKey}
                        compkey={'2'}
                    />,
                    key: '2'
                  }
                ]}
                style={{
                  height: '38px',
                  lineHeight: '36px',
                  marginBottom: '15px'
                }}
                size='small'
                onChange={tabChange}
            />
        </div>
  )
}

export default connect(
  state => ({
    articleHeaderRedux: state.articleHeader
  }),
  { setArticleListHeaderAction }
)(ArticleHeader)

ArticleHeader.propTypes = {
  setArticleListHeaderAction: PropTypes.any
}
