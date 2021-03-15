import { fenToBoard, boardToFen } from "./Fen";

describe("FEN: Create a board", () => {
  test("Wrong fen", () => {
    expect(fenToBoard("strangefenthatiswrong")).toEqual(
      expect.objectContaining({
        error: "Invalid Fen.",
      })
    );

    expect(fenToBoard("8/2p5/8/8/8/8/8/8 w aQkq - 0 1")).toEqual(
      expect.objectContaining({
        error: "Invalid Fen.",
      })
    );
  });

  test("color", () => {
    expect(fenToBoard("8/2p5/8/8/8/8/8/8 w KQkq - 0 1")).toEqual(
      expect.objectContaining({
        board: expect.arrayContaining([
          expect.arrayContaining([
            expect.objectContaining({
              color: "black",
              name: "p",
            }),
          ]),
        ]),
        numberMoves: 1,
      })
    );
    expect(fenToBoard("8/2P5/8/8/8/8/8/8 w KQkq - 0 1")).toEqual(
      expect.objectContaining({
        board: expect.arrayContaining([
          expect.arrayContaining([
            expect.objectContaining({
              color: "white",
              name: "p",
            }),
          ]),
        ]),
        numberMoves: 1,
      })
    );
  });

  test("pieces", () => {
    expect(
      fenToBoard("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
    ).toEqual(
      expect.objectContaining({
        board: expect.arrayContaining([
          expect.arrayContaining([
            expect.objectContaining({
              color: "black",
              name: "p",
            }),
          ]),
          expect.arrayContaining([
            expect.objectContaining({
              color: "black",
              name: "r",
            }),
            expect.objectContaining({
              color: "black",
              name: "n",
            }),
            expect.objectContaining({
              color: "black",
              name: "b",
            }),
            expect.objectContaining({
              color: "black",
              name: "q",
            }),
            expect.objectContaining({
              color: "black",
              name: "k",
            }),
          ]),
          expect.arrayContaining([
            expect.objectContaining({
              color: "white",
              name: "p",
            }),
          ]),
          expect.arrayContaining([
            expect.objectContaining({
              color: "white",
              name: "r",
            }),
            expect.objectContaining({
              color: "white",
              name: "n",
            }),
            expect.objectContaining({
              color: "white",
              name: "b",
            }),
            expect.objectContaining({
              color: "white",
              name: "q",
            }),
            expect.objectContaining({
              color: "white",
              name: "k",
            }),
          ]),
        ]),
        numberMoves: 1,
      })
    );
  });

  test("number moves", () => {
    expect(fenToBoard("rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1")).toEqual(
      expect.objectContaining({
        numberMoves: 1,
      })
    );

    expect(fenToBoard("rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 100")).toEqual(
      expect.objectContaining({
        numberMoves: 100,
      })
    );

    expect(fenToBoard("rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 65")).toEqual(
      expect.objectContaining({
        numberMoves: 65,
      })
    );
  });

  test("position", () => {
    const { board } = fenToBoard(
      "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    );
    expect(board[0][0]).toEqual(
      expect.objectContaining({
        name: "r",
        color: "black",
      })
    );
    expect(board[1][7]).toEqual(
      expect.objectContaining({
        name: "p",
        color: "black",
      })
    );
    expect(board[7][7]).toEqual(
      expect.objectContaining({
        name: "r",
        color: "white",
      })
    );
    expect(board[3][3]).toEqual(null);
  });
});

describe("FEN: Get the fen", () => {
  test("empty board", () => {
    const emptyBoard = [];
    for (let i = 0; i < 8; i++) {
      emptyBoard.push([null, null, null, null, null, null, null, null]);
    }

    expect(boardToFen(emptyBoard, "w", 0)).toEqual(
      "8/8/8/8/8/8/8/8 w KQkq - 0 0"
    );
  });

  test("some pieces", () => {
    const board = [];
    for (let i = 0; i < 8; i++) {
      board.push([
        null,
        null,
        { name: "p", color: "black" },
        null,
        null,
        { name: "k", color: "white" },
        null,
        null,
      ]);
    }

    expect(boardToFen(board, "w", 0)).toEqual(
      "2p2K2/2p2K2/2p2K2/2p2K2/2p2K2/2p2K2/2p2K2/2p2K2 w KQkq - 0 0"
    );
  });

  test("all pieces", () => {
    const board = [
      [
        { name: "r", color: "black" },
        { name: "n", color: "black" },
        { name: "b", color: "black" },
        { name: "q", color: "black" },
        { name: "p", color: "black" },
        { name: "n", color: "white" },
        { name: "b", color: "white" },
        { name: "k", color: "white" },
      ],
    ];
    for (let i = 0; i < 7; i++) {
      board.push([null, null, null, null, null, null, null, null]);
    }

    expect(boardToFen(board, "w", 0)).toEqual(
      "rnbqpNBK/8/8/8/8/8/8/8 w KQkq - 0 0"
    );
  });
});
