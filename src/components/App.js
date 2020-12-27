import React, { useEffect } from "react";
import {
  BrowserRouter as Switch, Route
} from "react-router-dom";

import Header from './views/Header'
import Home from './views/Home/Home'
import Register from './views/Register'
import Login from './views/Login'

import Agent from '../_actions/agent'
import {
  onLoad
} from '../_actions/common_actions'
import { useDispatch, useSelector } from "react-redux";


function App(props) {
  const common = useSelector(state => state.common)
  const dispatch = useDispatch();
  useEffect(() => {
    const token=localStorage.getItem('jwt');
    if(token){
      Agent.setToken(token)
    }
    dispatch(onLoad(token ? Agent.Auth.current() : null, token))
    // onLoad가 action을 타고 나서 => reduxMiddleware로 향한 후 => reducer로 이동한다.
  }, [])

  if(common && common.appLoaded){
    return(
      <div>
        <Header
          appName={common.appName}
          currentUser={common.currentUser}
        />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
        </Switch>
    </div>
    )
  }else if(common){
    return(
      <div>
        <Header
          appName={common.appName}
          currentUser={common.currentUser}
        />
      </div>
    )
  }else{
    return null;
  }
}

export default App;