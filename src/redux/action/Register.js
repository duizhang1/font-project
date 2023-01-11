import { REGISTER_HIDDEN,REGISTER_SHOW } from "../Constant";

export const registerShowAction = data => ({ type: REGISTER_SHOW, data })
export const registerHiddenAction = data => ({type:REGISTER_HIDDEN,data})