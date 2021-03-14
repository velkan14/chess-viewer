import React, { useRef, useState } from "react";
import "./Board.css";
import Square from "../Square/Square";
import Piece from "../Piece/Piece";
import { useChessState } from "../ChessContext/useChessState";

const getColor = (x, y) => {
  if (y % 2 === 0) {
    return x % 2 === 0 ? "white" : "black";
  }
  return x % 2 === 0 ? "black" : "white";
};

const Board = () => {
  const { board, moves, movePiece } = useChessState();
  const boardRef = useRef();

  const [selectedPiece, setSelectedPiece] = useState(null);

  let selectedMoves = undefined;

  if (selectedPiece) {
    selectedMoves = moves.find((element) => {
      return (
        element.piece.x === selectedPiece.x &&
        selectedPiece.y === element.piece.y
      );
    });
  }

  const onDragStart = (position) => {
    setSelectedPiece(position);
  };
  const onDragStop = (e, position) => {
    const boardMetrics = boardRef.current.getClientRects()[0];
    const posOnBoardX = e.x - boardMetrics.x;
    const posOnBoardY = e.y - boardMetrics.y;
    const widthSquare = boardMetrics.width / 8;
    const indexX = Math.floor(posOnBoardX / widthSquare);
    const indexY = Math.floor(posOnBoardY / widthSquare);
    setTimeout(() => movePiece(position, { x: indexX, y: indexY }));
  };
  return (
    <div className="Board" ref={boardRef}>
      {board.map((pieces, row) => {
        return pieces.map((piece, column) => {
          return (
            <Square
              key={row * 8 + column}
              color={getColor(row, column)}
              numberTag={column === 0 ? 8 - row : undefined}
              letterTag={
                row === 7 ? String.fromCharCode(97 + column) : undefined
              }
              target={
                selectedMoves &&
                selectedMoves.moves.some(
                  (el) => el.x === column && el.y === row
                )
              }
            >
              {piece && (
                <Piece
                  position={{ x: column, y: row }}
                  piece={piece}
                  onDragStop={onDragStop}
                  onDragStart={onDragStart}
                />
              )}
            </Square>
          );
        });
        //const { x, y } = getPosition(index);
      })}
    </div>
  );
};

export default Board;
