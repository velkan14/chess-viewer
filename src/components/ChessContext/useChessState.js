import { useContext } from "react";
import { ChessContext } from "./ChessContext";
import { fenToBoard, boardToFen } from "../../utils/Fen";
import {
  generateMoves,
  isPositionEmpty,
  isPositionValid,
} from "../../utils/Chess";

const useChessState = () => {
  const [state, setState] = useContext(ChessContext);

  const { board, numberMoves, moves } = state;

  const load = (fen) => {
    const result = fenToBoard(fen);
    if (!result.error) {
      const { board, numberMoves } = result;
      setState({
        ...state,
        board: board,
        numberMoves: numberMoves,
        moves: generateMoves(board),
      });
    }
  };

  const getFen = () => {
    return boardToFen(board, "w", numberMoves);
  };

  const canMove = (oldPosition, newPosition) => {
    if (!isPositionValid(oldPosition) || isPositionEmpty(board, oldPosition))
      return false;

    return moves.some((current) => {
      if (
        current.piece.x === oldPosition.x &&
        current.piece.y === oldPosition.y
      ) {
        return current.moves.some(
          (move) => move.x === newPosition.x && move.y === newPosition.y
        );
      }
      return false;
    });
  };

  const addPiece = (piece, position) => {
    if (isPositionEmpty(board, position) && isPositionValid(position)) {
      const newBoard = board.slice();
      newBoard[position.y][position.x] = piece;
      setState({ ...state, board: newBoard, moves: generateMoves(newBoard) });
    }
  };

  const movePiece = (oldPosition, newPosition) => {
    if (canMove(oldPosition, newPosition)) {
      const newBoard = board.slice();
      newBoard[newPosition.y][newPosition.x] =
        newBoard[oldPosition.y][oldPosition.x];
      newBoard[oldPosition.y][oldPosition.x] = null;
      setState({
        ...state,
        board: newBoard,
        numberMoves: numberMoves + 1,
        moves: generateMoves(newBoard),
      });
    }
  };

  const getEmptyPositions = () => {
    return board.reduce((result, pieces, row) => {
      const empties = pieces.reduce((empties, piece, column) => {
        if (piece === null) {
          empties.push({ x: column, y: row });
        }
        return empties;
      }, []);
      return [...result, ...empties];
    }, []);
  };

  return {
    board,
    moves,
    addPiece,
    movePiece,
    load,
    getFen,
    getEmptyPositions,
  };
};

export { useChessState };
