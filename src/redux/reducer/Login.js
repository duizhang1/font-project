import { LOGIN_HIDDEN,LOGIN_SHOW } from "../Constant"

const initState = { loginShow: false }

export default function LoginReducer(preState = initState, action) {
    switch (action.type) {
        case LOGIN_SHOW:
            return { loginShow: true };
        case LOGIN_HIDDEN:
            return { loginShow: false };
        default:
            return preState;
    }
}