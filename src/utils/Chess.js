const isPositionEmpty = (board, position) => {
  return board[position.y][position.x] === null;
};

const isPositionValid = (position) => {
  return position.x < 8 && position.x >= 0 && position.y < 8 && position.y >= 0;
};

const hasEnemy = (board, pieceOne, position) => {
  if (isPositionEmpty(board, position)) return false;
  const pieceTwo = board[position.y][position.x];

  return pieceOne.color !== pieceTwo.color;
};

const pawnMoves = (board, piece, position) => {
  const { x, y } = position;
  const possibleMoves = [];

  const diff = {
    black: { dir: +1, base: 1 },
    white: { dir: -1, base: 6 },
  };

  let pos = { x: x - 1, y: y + diff[piece.color].dir };
  if (isPositionValid(pos) && hasEnemy(board, piece, pos)) {
    possibleMoves.push(pos);
  }

  pos = { x: x + 1, y: y + diff[piece.color].dir };
  if (isPositionValid(pos) && hasEnemy(board, piece, pos)) {
    possibleMoves.push(pos);
  }

  pos = { x: x, y: y + diff[piece.color].dir };
  if (isPositionValid(pos) && isPositionEmpty(board, pos)) {
    possibleMoves.push(pos);
    pos = { x: x, y: y + diff[piece.color].dir * 2 };
    if (y === diff[piece.color].base) {
      if (isPositionEmpty(board, pos)) {
        possibleMoves.push(pos);
      }
    }
  }

  return possibleMoves;
};

const rookMoves = (board, piece, position) => {
  return [];
};

const knightMoves = (board, piece, position) => {
  return [];
};

const bishopMoves = (board, piece, position) => {
  return [];
};

const queenMoves = (board, piece, position) => {
  return [];
};

const kingMoves = (board, piece, position) => {
  return [];
};

const piecesMovesMapping = {
  r: { getMoves: rookMoves },
  n: { getMoves: knightMoves },
  b: { getMoves: bishopMoves },
  q: { getMoves: queenMoves },
  k: { getMoves: kingMoves },
  p: { getMoves: pawnMoves },
};

const generateMoves = (board) => {
  const moves = [];

  board.forEach((pieces, row) => {
    pieces.forEach((piece, column) => {
      if (piece !== null) {
        let pieceMoves = piecesMovesMapping[piece.name].getMoves(board, piece, {
          x: column,
          y: row,
        });
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

export { generateMoves, isPositionEmpty, isPositionValid };
