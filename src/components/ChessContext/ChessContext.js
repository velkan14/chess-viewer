import React, { useState, createContext } from "react";

export const ChessContext = createContext();

const defaultBoard = [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
];

export const ChessProvider = (props) => {
  const [state, setState] = useState({
    board: defaultBoard,
  });

  return (
    <ChessContext.Provider value={[state, setState]}>
      {props.children}
    </ChessContext.Provider>
  );
};
