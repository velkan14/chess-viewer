import React, { useState, useRef } from "react";
import classNames from "classnames";
import "./Piece.css";
import Draggable from "react-draggable";

const piecesMapping = {
  P: { char: "♟", color: "white" },
  N: { char: "♞", color: "white" },
  B: { char: "♝", color: "white" },
  R: { char: "♜", color: "white" },
  Q: { char: "♚", color: "white" },
  K: { char: "♛", color: "white" },
  p: { char: "♟", color: "black" },
  n: { char: "♞", color: "black" },
  b: { char: "♝", color: "black" },
  r: { char: "♜", color: "black" },
  q: { char: "♚", color: "black" },
  k: { char: "♛", color: "black" },
};


const Piece = (props) => {
  const { piece, position, onDragStop } = props;

  const [dragging, setDragging] = useState(false);
  const nodeRef = useRef(null);

  return (
    <Draggable
    nodeRef={nodeRef}
      position={{ x: 0, y: 0 }}
      onStart={(a) => {
        setDragging(true);
      }}
      onStop={(e) => {
        setDragging(false);
        onDragStop(e, position);
      }}
    >
      <div
      ref={nodeRef}
        className={classNames("Piece", {
          pieceblack: piecesMapping[piece].color === "black",
          dragging: dragging,
        })}
      >
        {piecesMapping[piece].char}
      </div>
    </Draggable>
  );
};

export default Piece;
