import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";
import App from "./App";
import context from "jest-plugin-context";

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
  const utils = render(
    <Router>
      <App />
    </Router>
  );
  expect(dispatch).toBeCalled();
});

describe("display appName and header when logout state", () => {
  function util(common) {
    useSelector.mockImplementation((state) => common);
    const utils = render(
      <Router>
        <App />
      </Router>
    );
    return utils;
  }
  context("loaded app ", () => {
    const common = {
      ...defaultState,
      currentUser: null,
      appLoaded: true,
    };
    const utils = util(common);
    expect(utils.getByText(common.appName.toLowerCase()));
    expect(utils.getByText("Home"));
    expect(utils.getByText("Sign in"));
    expect(utils.getByText("Sign up"));
  });

  context("not loaded app ", () => {
    const common = {
      ...defaultState,
      currentUser: undefined,
      appLoaded: undefined,
    };
    const utils = util(common);
    expect(utils.getAllByText(common.appName.toLowerCase()));
    expect(utils.getAllByText("Home"));
    expect(utils.getAllByText("Sign in"));
    expect(utils.getAllByText("Sign up"));
  });
});

test("", async () => {});
