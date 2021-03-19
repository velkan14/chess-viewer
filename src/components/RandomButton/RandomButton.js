import React from "react";
import { useChessState } from "../../hooks/useChessState";
import "./RandomButton.css";

const RandomButton = () => {
  const { addPiece, getEmptyPositions } = useChessState();

  const emptyPositions = getEmptyPositions();

  const onButtonClick = () => {
    if (emptyPositions.length > 0) {
      const index = Math.floor(Math.random() * emptyPositions.length);
      addPiece({ type: "p", color: "w" }, emptyPositions[index]);
    }
  };

  return (
    <div className="RandomButton">
      <button onClick={onButtonClick} disabled={emptyPositions.length === 0}>
        🎲 Add Pawn
      </button>
    </div>
  );
};

export default RandomButton;
