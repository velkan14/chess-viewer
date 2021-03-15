import React from "react";
import classNames from "classnames";
import "./Square.css";

const Square = (props) => {
  const { color, letterTag, numberTag, target } = props;
  return (
    <div
      className={classNames("Square", {
        black: color === "black",
        target: target,
      })}
    >
      {numberTag && (
        <span className="numberTag" data-testid="numberTag">
          {numberTag}
        </span>
      )}
      {letterTag && (
        <span className="letterTag" data-testid="letterTag">
          {letterTag}
        </span>
      )}
      {props.children}
    </div>
  );
};

export default Square;
