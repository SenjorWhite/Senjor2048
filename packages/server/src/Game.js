const Board = require('./Board');

function Game() {
    let board = new Board();
    this.init = () => {
        board.init();
        board.assignNewTile();
        board.assignNewTile();
    }
    this.getBoard = () => board.getTiles();
}
module.exports = Game;