import React, { useState, useRef } from "react";
import classNames from "classnames";
import "./Piece.css";
import Draggable from "react-draggable";

const piecesMapping = {
  p: { char: "♟" },
  n: { char: "♞" },
  b: { char: "♝" },
  r: { char: "♜" },
  q: { char: "♚" },
  k: { char: "♛" },
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
          pieceblack: piece.color === "b",
          dragging: dragging,
        })}
      >
        {piecesMapping[piece.type].char}
      </div>
    </Draggable>
  );
};

export default Piece;
