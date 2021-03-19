import React, { useState, createContext } from "react";
import Chess from "chess.js";

export const ChessContext = createContext();

const chess = Chess();

export const ChessProvider = (props) => {
  const [state, setState] = useState({
    chess: chess,
    board: chess.board(),
  });

  return (
    <ChessContext.Provider value={[state, setState]}>
      {props.children}
    </ChessContext.Provider>
  );
};
