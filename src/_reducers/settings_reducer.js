import {
    ASYNC_START,
    APP_LOAD
} from '../_actions/actionTypes';

export default (state={}, action) => {
    switch(action.type){
        case ASYNC_START :
            if(action.subtype === APP_LOAD)
            return {
                ...state,
                inProgress:true
            }
            break;

        default:
            return state;
    }
}