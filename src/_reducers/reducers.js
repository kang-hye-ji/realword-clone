import {combineReducers} from 'redux';
import auth from './auth_reducer';
import common from './common_reducer';
import settings from './settings_reducer';

const rootReducer=combineReducers({
    auth,
    common,
    settings,
});

export default rootReducer