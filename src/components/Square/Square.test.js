import React from "react";
import { render } from "@testing-library/react";
import { shallow } from "enzyme";
import shallowToJson from "enzyme-to-json";
import Square from "./Square";

test("Render tags", () => {
  const { getByTestId } = render(
    <Square color="white" letterTag="a" numberTag="1" target={false} />
  );
  expect(getByTestId(/letterTag/i).textContent).toBe("a");
  expect(getByTestId(/numberTag/i).textContent).toBe("1");
});

test("Doesn't render tags", () => {
  const { queryByTestId } = render(<Square color="white" target={false} />);
  expect(queryByTestId(/letterTag/i)).toBeNull();
  expect(queryByTestId(/numberTag/i)).toBeNull();
});

test("Doesn't render tags", () => {
  const { queryByTestId } = render(<Square color="white" target={false} />);
  expect(queryByTestId(/letterTag/i)).toBeNull();
  expect(queryByTestId(/numberTag/i)).toBeNull();
});

test("Test snapshots", () => {
  let wrapper = shallow(
    <Square color="white" letterTag="a" numberTag="1" target={false} />
  );
  expect(shallowToJson(wrapper)).toMatchSnapshot();

  wrapper = shallow(
    <Square color="black" letterTag="a" numberTag="1" target={false} />
  );
  expect(shallowToJson(wrapper)).toMatchSnapshot();

  wrapper = shallow(<Square color="white" numberTag="1" target={false} />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();

  wrapper = shallow(<Square color="white" letterTag="a" target={false} />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();

  wrapper = shallow(<Square color="white" target={false} />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();

  wrapper = shallow(
    <Square color="white" letterTag="a" numberTag="1" target={true} />
  );
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
