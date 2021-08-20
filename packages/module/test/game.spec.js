const Game = require("../src/Game");
const GameBoardSize = 4;

describe('Game', () => {
    it('Should init a new game board', () => {
        const game = new Game();
        game.init();
        expect(game.getBoard()).not.toBeNull();
    })

    it('Should has two values in a new game board', () => {
        const game = new Game();
        game.init();
        const gameBoard = game.getBoard();
        let count = 0;
        gameBoard.forEach(column => {
            column.forEach(tile => {
                if (tile > 0)
                    count++
            })
        })
        expect(count).toBe(2);
    })

    it('Should generate a game as we customized', () => {
        const expectedBoard = [[0, 2, 4, 8], [0, 2, 4, 8], [0, 2, 4, 8], [0, 2, 4, 8]];
        const game = new Game();
        game.init(expectedBoard);
        expect(game.getBoard()).toEqual(expectedBoard);
    })

    it('Should update the status to "WIN" after a winning move', () => {
        const customizedBoard = [[1024, 2, 4, 8], [0, 2, 4, 8], [0, 2, 4, 8], [1024, 2, 4, 8]];
        const game = new Game();
        game.init(customizedBoard);
        game.move('RIGHT')
        expect(game.gameStatus).toBe('WIN');
    })

    it('Should update the status to "LOSE" when there is nothing to move', () => {
        const customizedBoard = [[2, 32, 4, 2], [64, 4, 8, 16], [2, 8, 256, 8,], [32, 16, 4, 2]];
        const game = new Game();
        game.init(customizedBoard);
        game.updateStatus();
        expect(game.gameStatus).toBe('LOSE');
    })
})