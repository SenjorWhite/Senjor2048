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

    it('Should slide a tile to an expected location', () => {
        const board = new Board();
        board.init();
        board.setTiles([[2, 4, 0, 0], [2, 2, 0, 2], [0, 4, 0, 0], [2, 4, 0, 0]]);
        const nextLocation = board.slideTile({ x: 1, y: 3 }, { x: 0, y: -1 });
        const expectedBoard = [[2, 4, 0, 0], [2, 4, 0, 0], [0, 4, 0, 0], [2, 4, 0, 0]]
        expect(board.getTiles()).toEqual(expectedBoard);
    })

    it('Should match the result we expected by moving LEFT', () => {
        const board = new Board();
        board.init();
        board.setTiles([[2, 4, 2, 0], [2, 2, 2, 0], [0, 4, 0, 0], [4, 4, 2, 0]]);
        board.move('LEFT');
        const expectedBoard = [[4, 4, 4, 0], [4, 2, 2, 0], [0, 8, 0, 0], [0, 0, 0, 0]];
        expect(board.getTiles()).toEqual(expectedBoard);
    })

    it('Should match the result we expected by moving RIGHT', () => {
        const board = new Board();
        board.init();
        board.setTiles([[4, 4, 2, 0], [2, 2, 2, 0], [0, 4, 0, 0], [2, 4, 2, 0]]);
        board.move('RIGHT');
        const expectedBoard = [[0, 0, 0, 0], [0, 4, 0, 0], [4, 2, 2, 0], [4, 8, 4, 0]];
        expect(board.getTiles()).toEqual(expectedBoard);
    })

    it('Should match the result we expected by moving UP', () => {
        const board = new Board();
        board.init();
        board.setTiles([[2, 4, 0, 0], [2, 2, 0, 0], [0, 4, 0, 0], [2, 4, 0, 0]]);
        board.move('UP');
        const expectedBoard = [[2, 4, 0, 0], [4, 0, 0, 0], [4, 0, 0, 0], [2, 4, 0, 0]];
        expect(board.getTiles()).toEqual(expectedBoard);
    })

    it('Should match the result we expected by moving DOWN', () => {
        const board = new Board();
        board.init();
        board.setTiles([[2, 4, 0, 0], [2, 2, 0, 0], [0, 4, 0, 0,], [2, 4, 0, 0]]);
        board.move('DOWN');
        const expectedBoard = [[0, 0, 2, 4], [0, 0, 0, 4], [0, 0, 0, 4], [0, 0, 2, 4]];
        console.log(board.getTiles());
        expect(board.getTiles()).toEqual(expectedBoard);
    })
})