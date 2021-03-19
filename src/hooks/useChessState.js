import { useContext } from "react";
import { ChessContext } from "../components/ChessContext/ChessContext";

const useChessState = () => {
  const [state, setState] = useContext(ChessContext);

  const { chess, board } = state;

  const getAlphaNumPosition = (position) => {
    return String.fromCharCode(position.x + 97) + String(8 - position.y);
  };

  const getPosition = (alphaNum) => {
    const finalPosPattern = /[abcdefgh][12345678]/;
    const pos = alphaNum.match(finalPosPattern)[0];

    return {
      x: pos.charCodeAt(0) - 97,
      y: 8 - parseInt(pos[1]),
    };
  };

  const load = (fen) => {
    if (chess.load(fen)) {
      setState({ ...state, board: chess.board() });
    }
  };

  const getFen = () => {
    return chess.fen();
  };

  const getMoves = (position) => {
    const alphanumericPos = getAlphaNumPosition(position);

    return chess.moves({ square: alphanumericPos }).map((current) => {
      return getPosition(current);
    });
  };

  const addPiece = (piece, position) => {
    chess.put(piece, getAlphaNumPosition(position));
    setState({ ...state, board: chess.board() });
  };

  const movePiece = (oldPosition, newPosition) => {
    const move = {
      from: getAlphaNumPosition(oldPosition),
      to: getAlphaNumPosition(newPosition),
    };
    if (chess.move(move)) {
      setState({
        ...state,
        board: chess.board(),
        chess: chess,
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
    chess,
    board,
    load,
    getFen,
    getMoves,
    addPiece,
    movePiece,
    getEmptyPositions,
  };
};

export { useChessState };
