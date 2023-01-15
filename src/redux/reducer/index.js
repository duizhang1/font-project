/* 
	该文件用于汇总所有的reducer为一个总的reducer
*/
//引入combineReducers，用于汇总多个reducer
import { combineReducers } from 'redux'
import login from './Login'
import register from './Register'
import user from './User'
import sort from './Sort'
import label from './Label'

export default combineReducers({
    login,
    register,
    user,
    sort,
    label
})