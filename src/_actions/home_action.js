import {
    HOME_PAGE_UNLOADED,
    HOME_PAGE_LOADED
} from './actionTypes'

export function onUnload(){
    return{
        type:HOME_PAGE_UNLOADED
    }
}
export function onLoad(tab, pager, payload){
    return{
        type:HOME_PAGE_LOADED, 
        tab:tab, 
        pager:pager, 
        payload:payload
    }
}
/* export function registerUser(dataToSubmit){
    const request=axios.post('https://agmall.herokuapp.com/api/user/register', dataToSubmit, config)
        .then(response=>response.data)
    return{
        type:Register_USER, payload:request
    }
} */