import React, { useState, createContext } from "react";
import { fenToBoard } from "../../utils/Fen";
import { generateMoves } from "../../utils/Chess";

export const ChessContext = createContext();

const { board, numberMoves } = fenToBoard("8/2p5/8/8/8/8/8/8 w KQkq - 0 1");

export const ChessProvider = (props) => {
  const [state, setState] = useState({
    board: board,
    moves: generateMoves(board),
    numberMoves: numberMoves,
  });

  return (
    <ChessContext.Provider value={[state, setState]}>
      {props.children}
    </ChessContext.Provider>
  );
};
