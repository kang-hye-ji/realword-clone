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
test("초기에 useDispatch를 호출하는가", async () => {
  useSelector.mockImplementation((state) => ({
    currentUser: null,
    token: null,
    appLoaded: true,
  }));
  const AppCom = render(<App />);
  expect(dispatch).toBeCalled();

  const loadedDiv = AppCom.getByText("로딩됐다.");
  expect(loadedDiv);
  //   App.getByText("Popular Tags");
  // const tagName = getByText("Popular Tags")
  // expect(tagName).toBeInTheDocument();
  // it('shows the props correctly', () => {
  // const utils = render(<Profile username="velopert" name="김민준" />);
  // utils.getByText('velopert'); // velopert 라는 텍스트를 가진 엘리먼트가 있는지 확인
  // utils.getByText('(김민준)'); // (김민준) 이라는 텍스트를 가진 엘리먼트가 있는지 확인
  // utils.getByText(/김/); // 정규식 /김/ 을 통과하는 엘리먼트가 있는지 확인
  // });
});
