import {
    APP_LOAD,
} from './actionTypes'

export function onLoad(payload, token){
    return{
        type:APP_LOAD,
        // payload - reducer에 currentUser 정보를 가져옴
        payload:payload, 
        token:token,
        skipTracking:true
    }
}