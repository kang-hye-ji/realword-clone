import {
    ASYNC_START,
    UPDATE_FIELD_AUTH,
    REGISTER,
    REGISTER_PAGE_UNLOADED,
    LOGIN
} from '../_actions/actionTypes'

export default function(state={}, action){
    switch(action.type){
        case ASYNC_START:
            if(action.subtype===LOGIN || action.subtype===REGISTER){
                return{...state, inProgress:true}
            }
            // break;

        case REGISTER_PAGE_UNLOADED:
            return{}

        case UPDATE_FIELD_AUTH : 
            return{...state, [action.key]:action.value}

        case LOGIN:
        case REGISTER :
            return{
                ...state,
                inProgress:false,
                errors:action.error ? action.payload.errors : null
            }

        default:
            return state;
    }
}