import {
    ASYNC_START
} from '../_actions/actionTypes';

export default (state={}, action) => {
    switch(action.type){
        case ASYNC_START :
            return {
                ...state,
                inProgress:true
            }

        default:
            return state;
    }
}