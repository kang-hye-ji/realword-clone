import { useDispatch } from "react-redux";
import {
  ASYNC_START,
  ASYNC_END,
  REGISTER,
  LOGOUT,
  LOGIN,
} from "./_actions/actionTypes";
import Agent from "./_actions/agent";

const promiseMiddleware = (store) => (next) => (action) => {
  if (isPromise(action.payload)) {
    store.dispatch({ type: ASYNC_START, subtype: action.type });
    // this.props.store.dispatch(action) : 상태값을 수정할 때 사용하는 메소드
    // 인수로 action이 전달됨

    // ASYNC_START reducer에서 undefined를 return 한다는 error message
    // auth_reducer에는 subtype이 REGISTER, LOGIN인 경우만 return하는 것이 존재
    // settings_reducer를 추가함
    // 그러나 여전히 같은 오류 메세지 발생

    const currentView = store.getState().viewChangeCounter;
    // this.props.store.getState() : 현재 스토어에 있는 데이터를 반환
    const skipTracking = action.skipTracking;

    action.payload.then(
      (res) => {
        const currentState = store.getState();
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return;
        }
        console.log("RESULT", res);
        action.payload = res;
        store.dispatch({ type: ASYNC_END, promise: action.payload });
        store.dispatch(action);
      },
      (error) => {
        const currentState = store.getState();
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return;
        }
        console.log("ERROR", error);
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

const localStorageMiddleware = (store) => (next) => (action) => {
  if (action.type === REGISTER || action.type === LOGIN) {
    if (!action.error) {
      localStorage.setItem("jwt", action.payload.user.token);
      Agent.setToken(action.payload.user.token);
    }
  } else if (action.type === LOGOUT) {
    localStorage.setItem("jwt", "");
    Agent.setToken(null);
  }

  next(action);
};

function isPromise(v) {
  return v && typeof v.then === "function";
}

export { promiseMiddleware, localStorageMiddleware };
