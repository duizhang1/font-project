import React from 'react'
import './EmojiList.css'

export default function EmojiList(props) {

    const {insertEmoji} = props

    const emojiList = [
        'ð', 'ð', 'ð', 'ð', 'ð', 'ð',
        'ð', 'ð', 'ð', 'ð', 'ð', 'ð',
        'ð', 'ð', 'ðĻ', 'ðŠ', 'ð­', 'ð°',
        'ðą', 'ðđ', 'ð', 'ðĪ', 'ðĪ', 'ðĪĄ',
        'ðĪĢ', 'ðĪĪ', 'ðĪŠ', 'ðĪŪ', 'ðĪĐ', 'ðĪ'
    ]

    function clickEmoji(item){
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
