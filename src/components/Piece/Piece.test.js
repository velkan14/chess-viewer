import React from "react";
import { shallow } from "enzyme";
import shallowToJson from "enzyme-to-json";
import Piece from "./Piece";

test("Test snapshots", () => {
  let wrapper = shallow(
    <Piece
      piece={{ type: "p", color: "b" }}
      position={{ x: 0, y: 0 }}
      onDragStop={() => {}}
      onDragStart={() => {}}
    />
  );
  expect(shallowToJson(wrapper)).toMatchSnapshot();

  wrapper = shallow(
    <Piece
      piece={{ type: "k", color: "w" }}
      position={{ x: 0, y: 0 }}
      onDragStop={() => {}}
      onDragStart={() => {}}
    />
  );
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
