import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { render } from "@testing-library/react";
import App from "./App";

// jest는 __mocks__의 react-redux파일에 있는 애들을 mocking할거다.
// react-redux의 애들은 jest의 임의의 함수 jest.fn();이다.
jest.mock("react-redux");

// dispatch는 jest의 임의의 함수다.
const dispatch = jest.fn();
// react-redux파일에 있던 임의의 함수 중 useDispatch는 .. 호출 시 dispatch를 리턴한다.
useDispatch.mockImplementation(() => dispatch);

test("call 'onLoad' dispatch", async () => {
  const common = { currentUser: null, token: null, appLoaded: true };
  useSelector.mockImplementation((state) => common);
  render(<App />);
  expect(dispatch).toBeCalled();
});

test("render app by 'appLoaded'", async () => {
  function util(common) {
    useSelector.mockImplementation((state) => common);
    const utils = render(<App />);
    return utils;
  }
  context("loaded app ", () => {
    const common = { currentUser: null, token: null, appLoaded: true };
    const utils = util(common);
    expect(utils.getByText("로딩됐다."));
  });

  context("not loaded app ", () => {
    const common = { currentUser: null, token: null, appLoaded: false };
    const utils = util(common);
    expect(utils.getByText("로딩안됐다."));
  });
});

test("", async () => {});
