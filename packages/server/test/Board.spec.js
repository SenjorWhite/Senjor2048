const Board = require("../src/Board");

describe('Board', () => {
    it('should init a new board', () => {
        const board = new Board();
        board.init();
        const expectedBoard = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        expect(board.getTiles()).toEqual(expectedBoard);
    })

    it('Should set the tile as we assigned', () => {
        const board = new Board();
        board.init();
        board.setTile(1, 2, 8);
        const expectedBoard = [[0, 0, 0, 0], [0, 0, 8, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        expect(board.getTiles()).toEqual(expectedBoard);
    })

    it('Should replace all tiles as we assigned', () => {
        const expectedBoard = [[0, 2, 4, 8], [0, 2, 4, 8], [0, 2, 4, 8], [0, 2, 4, 8]];
        const board = new Board();
        board.init();
        board.setTiles(expectedBoard);
        expect(board.getTiles()).toEqual(expectedBoard);
    })
})