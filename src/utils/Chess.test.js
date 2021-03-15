import { generateMoves, isPositionEmpty, isPositionValid } from "./Chess";

const board = [
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, { name: "p", color: "black" }, null],
  [null, null, null, null, null, { name: "p", color: "white" }, null, null],
  [null, { name: "p", color: "white" }, null, null, null, null, null, null],
  [null, { name: "p", color: "black" }, null, null, null, null, null, null],
  [null, { name: "p", color: "white" }, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
];

describe("Chess", () => {
  test("isPositionValid", () => {
    expect(isPositionValid({ x: -1, y: 0 })).toEqual(false);
    expect(isPositionValid({ x: 0, y: -1 })).toEqual(false);
    expect(isPositionValid({ x: 8, y: 0 })).toEqual(false);
    expect(isPositionValid({ x: 0, y: 8 })).toEqual(false);
    expect(isPositionValid({ x: 0, y: 0 })).toEqual(true);
    expect(isPositionValid({ x: 7, y: 7 })).toEqual(true);
    expect(isPositionValid({ x: 5, y: 7 })).toEqual(true);
    expect(isPositionValid({ x: 3, y: 6 })).toEqual(true);
    expect(isPositionValid({ x: 2, y: 4 })).toEqual(true);
  });

  test("isPositionEmpty", () => {
    expect(isPositionEmpty(board, { x: 0, y: 0 })).toEqual(true);
    expect(isPositionEmpty(board, { x: 7, y: 7 })).toEqual(true);
    expect(isPositionEmpty(board, { x: 1, y: 4 })).toEqual(false);
  });

  test("pawn moves", () => {
    expect(generateMoves(board)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          moves: expect.arrayContaining([
            expect.objectContaining({
              x: 1,
              y: 2,
            }),
          ]),
          piece: expect.objectContaining({
            x: 1,
            y: 3,
          }),
        }),
      ])
    );
  });

  test("pawn first move", () => {
    expect(generateMoves(board)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          moves: expect.arrayContaining([
            expect.objectContaining({
              x: 6,
              y: 2,
            }),
            expect.objectContaining({
              x: 6,
              y: 3,
            }),
          ]),
          piece: expect.objectContaining({
            x: 6,
            y: 1,
          }),
        }),
      ])
    );
  });

  test("pawn eat", () => {
    expect(generateMoves(board)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          moves: expect.arrayContaining([
            expect.objectContaining({
              x: 5,
              y: 1,
            }),
            expect.objectContaining({
              x: 6,
              y: 1,
            }),
          ]),
          piece: expect.objectContaining({
            x: 5,
            y: 2,
          }),
        }),
      ])
    );
  });

  test("pawn blocked", () => {
    expect(generateMoves(board)).toEqual(
      expect.arrayContaining([
        expect.not.objectContaining({
          piece: expect.objectContaining({
            x: 1,
            y: 5,
          }),
        }),
      ])
    );
  });
});
