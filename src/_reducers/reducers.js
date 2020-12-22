import {combineReducers} from 'redux';
import auth from './auth_reducer';
import common from './common_reducer';

const rootReducer=combineReducers({
    auth,
    common,
});

export default rootReducer