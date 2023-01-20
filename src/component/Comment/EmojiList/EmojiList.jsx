import React from 'react'
import './EmojiList.css'

export default function EmojiList(props) {

    const {insertEmoji} = props

    const emojiList = [
        '😀', '😁', '😂', '😃', '😄', '😅',
        '😘', '😙', '😚', '😛', '😜', '😝',
        '😞', '😟', '😨', '😪', '😭', '😰',
        '😱', '😹', '🙏', '🤗', '🤝', '🤡',
        '🤣', '🤤', '🤪', '🤮', '🤩', '🤙'
    ]

    function clickEmoji(item){
        return () => {
            insertEmoji(item)
        }
    }
    return (
        <div className='emoji-list-content'>
            {emojiList.map((item) => {
                return <span className='emoji-list-item' onClick={clickEmoji(item)}>{item}</span>
            })}
        </div>
    )
}
