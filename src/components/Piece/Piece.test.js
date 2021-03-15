import React from "react";
import { shallow } from "enzyme";
import shallowToJson from "enzyme-to-json";
import Piece from "./Piece";

test("Test snapshots", () => {
  let wrapper = shallow(
    <Piece
      piece={{ name: "p", color: "black" }}
      position={{ x: 0, y: 0 }}
      onDragStop={() => {}}
      onDragStart={() => {}}
    />
  );
  expect(shallowToJson(wrapper)).toMatchSnapshot();

  wrapper = shallow(
    <Piece
      piece={{ name: "k", color: "white" }}
      position={{ x: 0, y: 0 }}
      onDragStop={() => {}}
      onDragStart={() => {}}
    />
  );
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
