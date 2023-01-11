import { LOGIN_HIDDEN,LOGIN_SHOW } from "../Constant";

export const loginShowAction = data => ({ type: LOGIN_SHOW, data })
export const loginHiddenAction = data => ({type:LOGIN_HIDDEN,data})