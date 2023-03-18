import { SET_USERINFO, CLEAR_USERINFO } from '../Constant'

export const setUserInfoAction = data => ({ type: SET_USERINFO, data })
export const clearUserInfoAction = data => ({ type: CLEAR_USERINFO, data })
