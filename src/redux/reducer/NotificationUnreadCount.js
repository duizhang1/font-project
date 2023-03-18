import {
  SET_NOTIFICATION_UNREAD_COUNT,
  CLEAR_NOTIFICATION_UNREAD_LIKE,
  CLEAR_NOTIFICATION_UNREAD_FOCUS,
  CLEAR_NOTIFICATION_UNREAD_COMMENT,
  DECR_NOTIFICATION_UNREAD_IM,
  INCR_NOTIFICATION_UNREAD_IM
} from '../Constant'

const initState = {
  uuid: '',
  userId: '',
  likeCount: 0,
  commentCount: 0,
  focusCount: 0,
  imCount: 0,
  createTime: '1970-01-01 00:00:01',
  updateTime: '1970-01-01 00:00:01'
}

export default function NotificationUnreadCountReducer (preState = initState, action) {
  let newObj
  switch (action.type) {
    case SET_NOTIFICATION_UNREAD_COUNT:
      return action.data
    case CLEAR_NOTIFICATION_UNREAD_LIKE:
      newObj = Object.assign({}, preState)
      newObj.likeCount = 0
      return newObj
    case CLEAR_NOTIFICATION_UNREAD_FOCUS:
      newObj = Object.assign({}, preState)
      newObj.focusCount = 0
      return newObj
    case CLEAR_NOTIFICATION_UNREAD_COMMENT:
      newObj = Object.assign({}, preState)
      newObj.commentCount = 0
      return newObj
    case DECR_NOTIFICATION_UNREAD_IM:
      newObj = Object.assign({}, preState)
      newObj.imCount = newObj.imCount - action.data
      if (newObj.imCount < 0) {
        newObj.imCount = 0
      }
      return newObj
    case INCR_NOTIFICATION_UNREAD_IM:
      newObj = Object.assign({}, preState)
      newObj.imCount = newObj.imCount + action.data
      return newObj
    default:
      return preState
  }
}
