import { SET_ARTICLELISTHEADER } from '../Constant'

const initState = { orderBy: '1', hotDay: '0' }

export default function ArticleListHeaderRedux (preState = initState, action) {
  switch (action.type) {
    case SET_ARTICLELISTHEADER:
      return action.data
    default:
      return preState
  }
}
