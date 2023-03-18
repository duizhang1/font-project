import React from 'react'
import './EmojiList.css'
import PropTypes from 'prop-types'

export default function EmojiList (props) {
  const { insertEmoji } = props

  const emojiList = [
    '😀', '😁', '😂', '😃', '😄', '😅',
    '😘', '😙', '😚', '😛', '😜', '😝',
    '😞', '😟', '😨', '😪', '😭', '😰',
    '😱', '😹', '🙏', '🤗', '🤝', '🤡',
    '🤣', '🤤', '🤪', '🤮', '🤩', '🤙'
  ]

  function clickEmoji (item) {
    return () => {
      insertEmoji(item)
    }
  }
  return (
        <div className='emoji-list-content'>
            {emojiList.map((item) => {
              return <span key={item} className='emoji-list-item' onClick={clickEmoji(item)}>{item}</span>
            })}
        </div>
  )
}

EmojiList.propTypes = {
  insertEmoji: PropTypes.any
}
