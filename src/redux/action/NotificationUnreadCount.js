import { SET_NOTIFICATION_UNREAD_COUNT,CLEAR_NOTIFICATION_UNREAD_LIKE,
  CLEAR_NOTIFICATION_UNREAD_FOCUS,CLEAR_NOTIFICATION_UNREAD_COMMENT,DECR_NOTIFICATION_UNREAD_IM,INCR_NOTIFICATION_UNREAD_IM } from "../Constant"

export const setNotificationUnreadAction = data => ({ type: SET_NOTIFICATION_UNREAD_COUNT, data })
export const clearNotificationUnreadLikeAction = data => ({type:CLEAR_NOTIFICATION_UNREAD_LIKE,data})
export const clearNotificationUnreadFocusAction = data => ({type:CLEAR_NOTIFICATION_UNREAD_FOCUS,data})
export const clearNotificationUnreadCommentAction = data => ({type:CLEAR_NOTIFICATION_UNREAD_COMMENT,data})
export const decrNotificationUnreadImAction = data => ({type:DECR_NOTIFICATION_UNREAD_IM,data})
export const incrNotificationUnreadImAction = data => ({type:INCR_NOTIFICATION_UNREAD_IM,data})