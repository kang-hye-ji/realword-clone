import {
    APP_LOAD,
} from './actionTypes'

export function onLoad(payload, token){
    return{
        type:APP_LOAD,
        payload, 
        token,
        skipTracking:true
    }
}