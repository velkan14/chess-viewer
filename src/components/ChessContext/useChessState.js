import { useContext } from "react";
import { ChessContext } from "./ChessContext";

const useChessState = () => {
  const [state, setState] = useContext(ChessContext);

  const { board, moves } = state;

  const isPositionEmpty = (position) => {
    return board[position.y][position.x] === null;
  };

  const isPositionValid = (position) => {
    return  position.x < 8 && position.x >= 0 &&
    position.y < 8 && position.y >= 0
  };

  const canMove = (oldPosition, newPosition) => {
    if (!isPositionValid(oldPosition) || isPositionEmpty(oldPosition))
      return false;

    const piece = board[oldPosition.y][oldPosition.x];

    //verify piece movement?
    return (
      isPositionValid(newPosition) &&
      (isPositionEmpty(newPosition) || hasEnemy(piece, newPosition))
    );
  };

  const hasEnemy = (pieceOne, position) => {
    if (isPositionEmpty(position)) return false;
    const pieceTwo = board[position.y][position.x];

    return getPieceColor(pieceOne) !== getPieceColor(pieceTwo);
  };

  const getPieceColor = (piece) => {
    if (piece === piece.toLowerCase()) return "white";
    else return "black";
  };

  const addPiece = (piece, position) => {
    if (isPositionEmpty(position) && isPositionValid(position)) {
      const newBoard = board.slice();
      newBoard[position.y][position.x] = piece;
      setState({ ...state, board: newBoard });
    }
  };

  const movePiece = (oldPosition, newPosition) => {
    if (canMove(oldPosition, newPosition)) {
      const newBoard = board.slice();
      newBoard[newPosition.y][newPosition.x] = newBoard[oldPosition.y][oldPosition.x];
      newBoard[oldPosition.y][oldPosition.x] = null;
      setState({ ...state, board: newBoard, moves: moves +1 });
    }
  };

  const isValidFen = (fen) => {
    const fenPattern = /^([rnbqkpRNBQKP1-8]{1,8}\/){7}[rnbqkpRNBQKP1-8]{1,8} (w|b) ([QqKk]{1,4}|-) ([a-h36]{2}|-) [0-9]+ [0-9]+$/;
    return fenPattern.test(fen);
  };

  const load = (fen) => {
    if (isValidFen(fen)) {
      const groups = fen.split(" ");
      const newBoard = groups[0].split("/").reduce((result, current) => {
        let row = []
        for (let i = 0; i < current.length; i++) {
          const number = parseInt(current[i]);
          if (isNaN(number)) {
            row.push(current[i]);
          } else {
            for (let j = 0; j < number; j++) {
              row.push(null);
            }
          }
        }
        return [...result, row];
      }, []);
      setState({ ...state, board: newBoard, moves: 
        parseInt(groups[5]) });
    }
  };

  const getFenFromRow = (row) => {
    let accumulator = 0;
    return row.reduce((rowFen, current, index, row) => {
      if (current === null) {
        accumulator = accumulator + 1;
      } else {
        if (accumulator !== 0) {
          rowFen = rowFen + String(accumulator);
          accumulator = 0;
        }
        rowFen = rowFen + current;
      }

      if (index === row.length - 1 && accumulator !== 0)
        return rowFen + String(accumulator);
      return rowFen;
    }, "");
  };

  const getFen = () => {
    const parcialFen = board.reduce((fen, row, index, board) => {
      fen = fen + getFenFromRow(row);
      if (index === board.length - 1) return fen;
      return fen + "/";
    }, "");

    return parcialFen + ` w KQkq - 0 ${moves}`;
  };

  const getMoves = () => {};

  return {
    board,
    addPiece,
    movePiece,
    getMoves,
    load,
    getFen,
  };
};

export { useChessState };
