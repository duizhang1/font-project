import { SET_LABEL,CLEAR_LABEL } from "../Constant"

export const setLabelAction = data => ({ type: SET_LABEL, data })
export const clearLabelAction = data => ({type:CLEAR_LABEL,data})