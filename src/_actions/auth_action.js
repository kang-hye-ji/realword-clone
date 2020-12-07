import {
    UPDATE_FIELD_AUTH,
    REGISTER,
    REGISTER_PAGE_UNLOADED,
    LOGIN
} from './actionTypes'
import Agent from './agent'

export function onUnloaded(value){
    return{
        type:REGISTER_PAGE_UNLOADED
    }
}
export function onChangeEmail(value){
    return{
        type:UPDATE_FIELD_AUTH,
        key:'email',
        value:value
    }
}
export function onChangePassword(value){
    return{
        type:UPDATE_FIELD_AUTH, 
        key:'password',
        value:value
    }
}
export function onChangeUsername(value){
    return{
        type:UPDATE_FIELD_AUTH, 
        key:'username',
        value:value
    }
}
export function submitForm(username, email, password){
    const payload=Agent.Auth.register(username, email, password);
    return{
        type:REGISTER,
        payload
    }
}

export function onSubmit(email, password){
    const payload=Agent.Auth.login(email, password);
    return{
        type:LOGIN,
        payload
    }
}
/* export function registerUser(dataToSubmit){
    const request=axios.post('https://agmall.herokuapp.com/api/user/register', dataToSubmit, config)
        .then(response=>response.data)
    return{
        type:Register_USER, payload:request
    }
} */