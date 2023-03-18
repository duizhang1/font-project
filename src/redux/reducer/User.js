import { SET_USERINFO, CLEAR_USERINFO } from '../Constant'

const initState = {
  uuid: '',
  username: '',
  password: '',
  emailAddress: '',
  sex: null,
  avatar: '',
  companyName: '',
  position: '',
  personProfile: '',
  createTime: ''
}

export default function UserReducer (preState = initState, action) {
  switch (action.type) {
    case SET_USERINFO:
      return action.data
    case CLEAR_USERINFO:
      return {
        uuid: '',
        username: '',
        password: '',
        emailAddress: '',
        sex: null,
        avatar: '',
        companyName: '',
        position: '',
        personProfile: '',
        createTime: ''
      }
    default:
      return preState
  }
}
