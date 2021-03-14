import { useContext } from "react";
import { ChessContext } from "./ChessContext";
import { fenToBoard, boardToFen } from "../../utils/Fen";

const useChessState = () => {
  const [state, setState] = useContext(ChessContext);

  const { board, numberMoves } = state;

  const isPositionEmpty = (position) => {
    return board[position.y][position.x] === null;
  };

  const isPositionValid = (position) => {
    return (
      position.x < 8 && position.x >= 0 && position.y < 8 && position.y >= 0
    );
  };

  const canMove = (oldPosition, newPosition) => {
    if (!isPositionValid(oldPosition) || isPositionEmpty(oldPosition))
      return false;

    const moves = getMoves();

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

  const hasEnemy = (pieceOne, position) => {
    if (isPositionEmpty(position)) return false;
    const pieceTwo = board[position.y][position.x];

    return pieceOne.color !== pieceTwo.color;
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
      newBoard[newPosition.y][newPosition.x] =
        newBoard[oldPosition.y][oldPosition.x];
      newBoard[oldPosition.y][oldPosition.x] = null;
      setState({ ...state, board: newBoard, numberMoves: numberMoves + 1 });
    }
  };

  const load = (fen) => {
    const result = fenToBoard(fen);
    if (!result.error) {
      const { board, numberMoves } = result;
      setState({ ...state, board: board, numberMoves: numberMoves });
    }
  };

  const getFen = () => {
    return boardToFen(board, "w", numberMoves);
  };

  const getMoves = () => {
    const moves = [];
    const noMoves = (board) => {
      return [];
    };

    const piecesMovesMapping = {
      r: { getMoves: noMoves },
      n: { getMoves: noMoves },
      b: { getMoves: noMoves },
      q: { getMoves: noMoves },
      k: { getMoves: noMoves },
      p: {
        getMoves: (board, piece, position) => {
          const { x, y } = position;
          const possibleMoves = [];

          const diff = {
            black: { dir: +1, base: 1 },
            white: { dir: -1, base: 6 },
          };

          let pos = { x: x - 1, y: y + diff[piece.color].dir };
          if (isPositionValid(pos) && hasEnemy(piece, pos)) {
            possibleMoves.push(pos);
          }

          pos = { x: x + 1, y: y + diff[piece.color].dir };
          if (isPositionValid(pos) && hasEnemy(piece, pos)) {
            possibleMoves.push(pos);
          }

          pos = { x: x, y: y + diff[piece.color].dir };
          if (isPositionValid(pos) && isPositionEmpty(pos)) {
            possibleMoves.push(pos);
            if (y === diff[piece.color].base)
              possibleMoves.push({ x: x, y: y + diff[piece.color].dir * 2 });
          }

          return possibleMoves;
        },
      },
    };

    board.forEach((pieces, row) => {
      pieces.forEach((piece, column) => {
        if (piece !== null) {
          let pieceMoves = piecesMovesMapping[piece.name].getMoves(
            board,
            piece,
            { x: column, y: row }
          );
          if (pieceMoves.length > 0) {
            moves.push({
              piece: { x: column, y: row },
              moves: pieceMoves,
            });
          }
        }
      });
    });
    return moves;
  };

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
