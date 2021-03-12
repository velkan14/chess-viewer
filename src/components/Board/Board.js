import React from "react";
import "./Board.css";
import Square from "../Square/Square";
import Piece from "../Piece/Piece";
import { useChessState } from "../ChessContext/useChessState";

const getPosition = (index) => {
  const x = index % 8;
  const y = Math.floor(index / 8);
  return { x: x, y: y };
};

const getColor = (x, y) => {
  if (y % 2 === 0) {
    return x % 2 === 0 ? "white" : "black";
  }
  return x % 2 === 0 ? "black" : "white";
};

const Board = () => {
  const { board, movePiece } = useChessState();

  let divBoard = null;

  const onDragStop = (e, piecePosition) => {
    const boardMetrics = divBoard.getClientRects()[0];
    const posOnBoardX = e.x - boardMetrics.x;
    const posOnBoardY = e.y - boardMetrics.y;
    const widthSquare = boardMetrics.width / 8;
    const indexX = Math.floor(posOnBoardX / widthSquare);
    const indexY = Math.floor(posOnBoardY / widthSquare);
    const position = indexY * 8 + indexX;
    movePiece(piecePosition, position);
  };
  return (
    <div
      className="Board"
      ref={(el) => {
        divBoard = el;
      }}
    >
      {board.map((piece, index) => {
        const { x, y } = getPosition(index);

        return (
          <Square
            key={index}
            color={getColor(x, y)}
            numberTag={x === 0 ? 8 - y : undefined}
            letterTag={y === 7 ? String.fromCharCode(97 + x) : undefined}
          >
            {piece && (
              <Piece position={index} piece={piece} onDragStop={onDragStop} />
            )}
          </Square>
        );
      })}
    </div>
  );
};

export default Board;
