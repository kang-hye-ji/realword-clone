import React, { useEffect } from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "./views/Header";
import Home from "./views/Home/Home";
import Register from "./views/Register";
import Login from "./views/Login";

import Agent from "../_actions/agent";
import { onLoad } from "../_actions/common_actions";

function App(props) {
	const dispatch = useDispatch();
	const common = useSelector((state) => state.common);
	useEffect(() => {
		const token = localStorage.getItem("jwt");

		if (token) {
			Agent.setToken(token);
		}
		dispatch(onLoad(token ? Agent.Auth.current() : null, token));
		console.log(token);
		console.log(common);
	}, []);

	if (common && common.appLoaded) {
		return (
			<div>
				<Header appName={common.appName} currentUser={common.currentUser} />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/register" component={Register} />
					<Route path="/login" component={Login} />
				</Switch>
			</div>
		);
	} else if (common) {
		return (
			<div>
				<Header appName={common.appName} currentUser={common.currentUser} />
			</div>
		);
	} else {
		return null;
	}
}

export default App;
