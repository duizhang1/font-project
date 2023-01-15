import { SET_LABEL,CLEAR_LABEL } from "../Constant"

const initState = []

export default function LabelReducer(preState = initState, action) {
    switch (action.type) {
        case SET_LABEL:
            return action.data;
        case CLEAR_LABEL:
            return [];
        default:
            return preState;
    }
}