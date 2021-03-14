import React, { useState, useRef } from "react";
import classNames from "classnames";
import "./Piece.css";
import Draggable from "react-draggable";

const piecesMapping = {
  p: { char: "♟", color: "black" },
  n: { char: "♞", color: "black" },
  b: { char: "♝", color: "black" },
  r: { char: "♜", color: "black" },
  q: { char: "♚", color: "black" },
  k: { char: "♛", color: "black" },
};

const Piece = (props) => {
  const { piece, position, onDragStop, onDragStart } = props;

  const [dragging, setDragging] = useState(false);
  const nodeRef = useRef(null);

  return (
    <Draggable
      nodeRef={nodeRef}
      position={{ x: 0, y: 0 }}
      onStart={(a) => {
        setDragging(true);
        onDragStart(position);
      }}
      onStop={(e) => {
        setDragging(false);
        onDragStop(e, position);
      }}
    >
      <div
        ref={nodeRef}
        className={classNames("Piece", {
          pieceblack: piece.color === "black",
          dragging: dragging,
        })}
      >
        {piecesMapping[piece.name].char}
      </div>
    </Draggable>
  );
};

export default Piece;
