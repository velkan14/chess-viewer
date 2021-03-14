const isValidFen = (fen) => {
  const fenPattern = /^([rnbqkpRNBQKP1-8]{1,8}\/){7}[rnbqkpRNBQKP1-8]{1,8} (w|b) ([QqKk]{1,4}|-) ([a-h36]{2}|-) [0-9]+ [0-9]+$/;
  return fenPattern.test(fen);
};

const getPieceFenLetter = (fenLetter) => {
  if (fenLetter === fenLetter.toLowerCase()) {
    return { name: fenLetter, color: "black" };
  }
  return { name: fenLetter.toLowerCase(), color: "white" };
};

const fenToBoard = (fen) => {
  if (isValidFen(fen)) {
    const groups = fen.split(" ");
    const board = groups[0].split("/").reduce((result, current) => {
      let row = [];
      for (let i = 0; i < current.length; i++) {
        const number = parseInt(current[i]);
        if (isNaN(number)) {
          row.push(getPieceFenLetter(current[i]));
        } else {
          for (let j = 0; j < number; j++) {
            row.push(null);
          }
        }
      }
      return [...result, row];
    }, []);
    return { board: board, numberMoves: parseInt(groups[5]) };
  }
  return { error: "Invalid Fen." };
};

const getStateFromRow = (row) => {
  let accumulator = 0;
  return row.reduce((state, current, index, row) => {
    if (current === null) {
      accumulator = accumulator + 1;
    } else {
      if (accumulator !== 0) {
        state = state + String(accumulator);
        accumulator = 0;
      }
      if (current.color === "white") {
        state = state + current.name.toUpperCase();
      }
      state = state + current.name;
    }

    if (index === row.length - 1 && accumulator !== 0)
      return state + String(accumulator);
    return state;
  }, "");
};

const boardToFen = (board, nextToMove, numberMoves) => {
  const boardState = board.reduce((state, row, index, board) => {
    state = state + getStateFromRow(row);
    if (index === board.length - 1) return state;
    return state + "/";
  }, "");

  return boardState + ` ${nextToMove} KQkq - 0 ${numberMoves}`;
};

export { fenToBoard, boardToFen };
