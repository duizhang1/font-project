import { SET_SORT, CLEAR_SORT } from '../Constant'

const initState = []

export default function SortReducer (preState = initState, action) {
  switch (action.type) {
    case SET_SORT:
      return action.data
    case CLEAR_SORT:
      return []
    default:
      return preState
  }
}
