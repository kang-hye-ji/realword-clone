import "@testing-library/react/cleanup-after-each";
import "@testing-library/jest-dom/extend-expect"
import React from "react";
import { render } from " @testing-library/react";
import App from "./App";

describe("<App /> 컴포넌트 관련", () => {
	it("잘 렌더링 되는가", () => {
		const {getByText} = render(<App />);
		const tagName = getByText("Popular Tags")
		expect(tagName).toBeInTheDocument();
	});
	// it('shows the props correctly', () => {
	// const utils = render(<Profile username="velopert" name="김민준" />);
	// utils.getByText('velopert'); // velopert 라는 텍스트를 가진 엘리먼트가 있는지 확인
	// utils.getByText('(김민준)'); // (김민준) 이라는 텍스트를 가진 엘리먼트가 있는지 확인
	// utils.getByText(/김/); // 정규식 /김/ 을 통과하는 엘리먼트가 있는지 확인
	// });
});
