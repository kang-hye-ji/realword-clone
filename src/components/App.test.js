import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";
import App from "./App";
import context from "jest-plugin-context";
import { cleanup } from "@testing-library/react";

// jest는 __mocks__의 react-redux파일에 있는 애들을 mocking할거다.
// react-redux의 애들은 jest의 임의의 함수 jest.fn();이다.
jest.mock("react-redux");

// dispatch는 jest의 임의의 함수다.
const dispatch = jest.fn();
// react-redux파일에 있던 임의의 함수 중 useDispatch는 .. 호출 시 dispatch를 리턴한다.
useDispatch.mockImplementation(() => dispatch);

const defaultState = {
  appName: "Conduit",
  token: null,
  viewChangeCounter: 0,
};

test("call 'onLoad' dispatch", async () => {
  const common = {
    ...defaultState,
    currentUser: null,
    appLoaded: true,
  };
  useSelector.mockImplementation((state) => common);
  render(
    <Router>
      <App />
    </Router>
  );
  expect(dispatch).toBeCalled();
});

test("loaded app", async () => {
  const common = {
    ...defaultState,
    currentUser: null,
    appLoaded: true,
  };
  useSelector.mockImplementation((state) => common);
  const utils = render(
    <Router>
      <App />
    </Router>
  );
  expect(utils.getByText(common.appName.toLowerCase()));
  expect(utils.getByText("Home"));
  expect(utils.getByText("Sign in"));
  expect(utils.getByText("Sign up"));
});

test("not loaded app", async () => {
  const common = {
    ...defaultState,
    currentUser: undefined,
    appLoaded: undefined,
  };
  useSelector.mockImplementation((state) => common);
  const utils = render(
    <Router>
      <App />
    </Router>
  );
  expect(utils.getByText(common.appName.toLowerCase()));
  expect(utils.getByText("Home"));
  expect(utils.getByText("Sign in"));
  expect(utils.getByText("Sign up"));
});

test("", async () => {});
