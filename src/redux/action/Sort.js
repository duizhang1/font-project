import { SET_SORT, CLEAR_SORT } from '../Constant'

export const clearSortAction = data => ({ type: CLEAR_SORT, data })
export const setSortAction = data => ({ type: SET_SORT, data })
