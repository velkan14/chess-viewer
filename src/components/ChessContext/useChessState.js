import { useContext } from "react";
import { ChessContext } from "./ChessContext";

const useChessState = () => {
  const [state, setState] = useContext(ChessContext);

  //const { board } = state;

  const board = state.board.flat();

  const isPositionEmpty = (position) => {
    return board[position] === null;
  };

  const isPositionValid = (position) => {
    return position < board.length && position >= 0;
  };

  const canMove = (oldPosition, newPosition) => {
    if (!isPositionValid(oldPosition) || isPositionEmpty(oldPosition))
      return false;

    const piece = board[oldPosition];

    //verify piece movement?
    return (
      isPositionValid(newPosition) &&
      (isPositionEmpty(newPosition) || hasEnemy(piece, newPosition))
    );
  };

  const hasEnemy = (pieceOne, position) => {
    if (isPositionEmpty(position)) return false;
    const pieceTwo = board[position];

    return getPieceColor(pieceOne) !== getPieceColor(pieceTwo);
  };

  const getPieceColor = (piece) => {
    if (piece === piece.toLowerCase()) return "white";
    else return "black";
  };

  const addPiece = (piece, position) => {
    if (isPositionEmpty(position) && isPositionValid(position)) {
      const newBoard = board.slice();
      newBoard[position] = piece;
      setState({ ...state, board: newBoard });
    }
  };

  const movePiece = (oldPosition, newPosition) => {
    if (canMove(oldPosition, newPosition)) {
      const newBoard = board.slice();
      newBoard[newPosition] = newBoard[oldPosition];
      newBoard[oldPosition] = null;
      setState({ ...state, board: newBoard });
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
        for (let i = 0; i < current.length; i++) {
          const number = parseInt(current[i]);
          if (isNaN(number)) {
            result.push(current[i]);
          } else {
            for (let j = 0; j < number; j++) {
              result.push(null);
            }
          }
        }
        return result;
      }, []);
      setState({ ...state, board: newBoard });
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
    const parcialFen = state.board.reduce((fen, row, index, board) => {
      fen = fen + getFenFromRow(row);
      if (index === board.length - 1) return fen;
      return fen + "/";
    }, "");

    return parcialFen + " w KQkq - 0 1";
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
