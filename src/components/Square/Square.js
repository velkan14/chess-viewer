import React from "react";
import classNames from "classnames";
import "./Square.css";

const Square = (props) => {
  const { color, letterTag, numberTag } = props;
  return (
    <div
      className={classNames("Square", { black: color === "black" })}
    >
      {numberTag && <span className="numberTag">{numberTag}</span>}
      {letterTag && <span className="letterTag">{letterTag}</span>}
      {props.children}
    </div>
  );
};

export default Square;
