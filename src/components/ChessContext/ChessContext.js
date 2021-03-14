import React, { useState, createContext } from "react";

export const ChessContext = createContext();

const defaultBoard = [
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
];

export const ChessProvider = (props) => {
  const [state, setState] = useState({
    board: defaultBoard,
    moves: [],
    numberMoves: 0,
  });

  return (
    <ChessContext.Provider value={[state, setState]}>
      {props.children}
    </ChessContext.Provider>
  );
};
