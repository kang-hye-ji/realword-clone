import {applyMiddleware, createStore} from 'redux';
import ReduxThunk from 'redux-thunk';
import {promiseMiddleware, localStorageMiddleware} from './reduxMiddleware';
import {createLogger} from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import reducer from './_reducers/reducers'

const getMiddleware=()=>{
    if(process.env.NODE_ENV==='production'){
        return applyMiddleware(promiseMiddleware, localStorageMiddleware, ReduxThunk);
    }else{
        return applyMiddleware(promiseMiddleware, localStorageMiddleware, ReduxThunk, createLogger());
    }
}

export const store=createStore(
    reducer, composeWithDevTools(getMiddleware()));