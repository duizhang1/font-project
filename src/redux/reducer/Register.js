import { REGISTER_HIDDEN,REGISTER_SHOW } from "../Constant"

const initState = { registerShow: false }

export default function RegisterReducer(preState = initState, action) {
    switch (action.type) {
        case REGISTER_SHOW:
            return { registerShow: true };
        case REGISTER_HIDDEN:
            return { registerShow: false };
        default:
            return preState;
    }
}