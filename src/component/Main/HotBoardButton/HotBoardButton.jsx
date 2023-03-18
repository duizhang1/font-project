import React from 'react'
import { Select } from 'antd'
import { connect } from 'react-redux'
import { setArticleListHeaderAction } from '@src/redux/action/ArticleListHeader'
import PropTypes from 'prop-types'

function HotBoardButton (props) {
  const { currentKey, compkey, setArticleListHeaderAction } = props

  const handleChange = (e) => {
    setArticleListHeaderAction({ orderBy: compkey, hotDay: e })
  }

  return (
        <div>
            热榜
            <Select
                defaultValue="3"
                onChange={handleChange}
                options={[
                  {
                    value: '3',
                    label: '最近3天'
                  },
                  {
                    value: '7',
                    label: '最近7天'
                  },
                  {
                    value: '30',
                    label: '最近1个月'
                  }
                ]}
                style={{ display: currentKey === compkey ? 'inline-block' : 'none', width: '110px', marginLeft: '10px' }}
            />
        </div>
  )
}
export default connect(
  state => ({

  }),
  { setArticleListHeaderAction }
)(HotBoardButton)

HotBoardButton.propTypes = {
  compkey: PropTypes.any,
  currentKey: PropTypes.any,
  setArticleListHeaderAction: PropTypes.any
}
