
import {CREATE_POST, GET_POST} from "../../types";

export default (state, action) => {
    switch (action.type) {
        case CREATE_POST:
            return  {
                ...state,
                posts: [action.payload, ...state.posts] 
            }
        case GET_POST:
                return  {
                    ...state,
                    posts: action.payload 
                }
        default:
            return state
    }
}