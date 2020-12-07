import {
    ASYNC_START,
    ASYNC_END,
    REGISTER,
    LOGOUT,
    LOGIN
} from './_actions/actionTypes'
import Agent from './_actions/agent'

const promiseMiddleware = store => next => action => {
    if (isPromise(action.payload)) {
        store.dispatch({ type: ASYNC_START, subtype: action.type });

        const currentView = store.getState().viewChangeCounter;
        const skipTracking = action.skipTracking;

        action.payload.then(
        res => {
            const currentState = store.getState()
            if (!skipTracking && currentState.viewChangeCounter !== currentView) {
            return
            }
            console.log('RESULT', res);
            action.payload = res;
            store.dispatch({ type: ASYNC_END, promise: action.payload });
            store.dispatch(action);
        },
        error => {
            const currentState = store.getState()
            if (!skipTracking && currentState.viewChangeCounter !== currentView) {
            return
            }
            console.log('ERROR', error);
            action.error = true;
            action.payload = error.response.body;
            if (!action.skipTracking) {
            store.dispatch({ type: ASYNC_END, promise: action.payload });
            }
            store.dispatch(action);
        }
        );

        return;
    }

    next(action);
    };

const localStorageMiddleware = store=>next=>action=>{
    if(action.type===REGISTER || action.type===LOGIN){
        if(!action.error){
            localStorage.setItem('jwt', action.payload.user.token);
            Agent.setToken(action.payload.user.token);
        }
    }else if(action.type===LOGOUT){
        localStorage.setItem('jwt', '');
        Agent.setToken(null)
    }

    next(action);
}

function isPromise(v) {
    return v && typeof v.then === 'function';
}

export {promiseMiddleware, localStorageMiddleware}