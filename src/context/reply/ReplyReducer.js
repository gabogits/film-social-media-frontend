import {CREATE_REPLY, GET_REPLIES} from "../../types/";

export  default (state, action) => {
    switch (action.type) {
        case CREATE_REPLY:
            return {
                ...state,
                replies: [action.payload, ...state.replies ]
            }
            case GET_REPLIES:
                return {
                    ...state,
                    replies: action.payload
                }
        default:
            return state
    }
}
