import React, { useEffect } from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";

import Header from "./views/Header";
import Home from "./views/Home/Home";
import Register from "./views/Register";
import Login from "./views/Login";

import Agent from "../_actions/agent";
import { onLoad } from "../_actions/common_actions";
import { useDispatch, useSelector } from "react-redux";

// import Profile from "../Profile";

function App(props) {
  const common = useSelector((state) => state.common);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      Agent.setToken(token);
    }
    // 토큰이 LStorage에 있는지 먼저 확인 --> 있다면 Agent.js에 토큰 셋팅!
    // 궁금한건, 셋팅을 하면... 이후에도 셋팅한 값이 먹히는가. 하는것.

    // ** 디스패치 통신 후 원하는 조치가 되었는지 ** //

    // LS에 토큰이 있고. 위에서 setToken이 된 상태라면.  Agent.Auth.current()를 하면 ! 토큰을 사용한채로 get통신을 하게 된다.
    // 위에서 setToken을 한게 그대로 살아있는게 신기할 따름이다.

    // common_action.js
    // action return{payload:currentUser정보, token:token, skipTracking:true}
    // reducer return{token:token, appLoaded:true, currentUser:action.payload.user}

    // 토큰이 없다면 ? 그러니까 로그인정보가 없다면 ? 아무런 payload가 없는 채로,
    // action{payload:null, token:null, skipTracking:true}
    // reducer{token:null, appLoaded:true, currentUser:null}

    // action에 skipTracking 값은 왜 들어가는 건지 모르겠다 !!!
    dispatch(onLoad(token ? Agent.Auth.current() : null, token));
    // onLoad가 action을 타고 나서 => reduxMiddleware로 향한 후 => reducer로 이동한다.
    // Auth.current()는 currentUser를 불러옴!

    // 이제 redux에는 currentUser, token, appLoaded:true가 저장된다.

    // 로그인했을 때 vs 안했을 때 에 따라서. test ??? 이게 먼저일까?
    // 내가 할 수 있는 가장 빠른 테스트를 해야하지 않을까?
  }, []);

  if (common.appLoaded) {
    return (
      <div>
        로딩됐다.
        {/* <Header appName={common.appName} currentUser={common.currentUser} /> */}
      </div>
    );
  }
  return (
    <div>
      로딩안됐다.
      {/* <Header appName={common.appName} currentUser={common.currentUser} /> */}
    </div>
  );
  // ** common 셀렉터에 appLoaded가 잘 받아지는지 ** //
  // if (common && common.appLoaded) {
  //   return (
  //     <div>
  //       {/* header에 props가 잘 넘어가는지 */}
  //       <Header appName={common.appName} currentUser={common.currentUser} />
  //       {/* <Profile username="velopert" name="김민준" /> */}
  //       <Switch>
  //         <Route exact path="/" component={Home} />
  //         <Route path="/register" component={Register} />
  //         <Route path="/login" component={Login} />
  //       </Switch>
  //     </div>
  //   );
  // } else if (common) {
  //   {/* common일 경우에 에러가 나지는 않는지 */}
  //   return (
  //     <div>
  //       <Header appName={common.appName} currentUser={common.currentUser} />
  //     </div>
  //   );
  // } else {
  //   return null;
  // }
}

export default App;
