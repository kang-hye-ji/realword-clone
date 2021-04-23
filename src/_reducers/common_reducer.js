import {
  APP_LOAD,
  LOGIN,
  REGISTER,
  HOME_PAGE_UNLOADED,
} from "../_actions/actionTypes";

const defaultState = {
  appName: "Conduit",
  token: null,
  // 뷰체인지 카운터 쓰는 이유를 알고 싶다 !! 상태변화를 인지하기 위한 것일까?
  viewChangeCounter: 0,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case APP_LOAD:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload.user : null,
      };

    case LOGIN:
    case REGISTER:
      return {
        ...state,
        redirectTo: action.error ? null : "/",
        token: action.error ? null : action.payload.user.token,
        currentUser: action.error ? null : action.payload.user,
      };

    case HOME_PAGE_UNLOADED:
      return { ...state, viewChangeCounter: state.viewChangeCounter + 1 };

    default:
      return state;
  }
}
