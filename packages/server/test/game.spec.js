const Game = require("../src/Game");
const GameBoardSize = 4;


describe('Game', () => {
    it('should init a new game board', () => {
        const game = new Game();
        game.init();
        expect(game.getBoard()).not.toBeNull();
    })
})