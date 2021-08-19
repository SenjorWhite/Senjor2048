const Board = require('./Board');
let board = new Board();

function Game() {
    this.gameStatus = 'PLAYABLE';
    this.board = new Board();
    this.init = (elements) => {
        board.init();
        if (elements) {
            this.board.setTiles(elements);
        } else {
            board.assignNewTile();
            board.assignNewTile();
        }
    }
    this.getEmptyTiles = () => board.getEmptyTiles();
    this.getBoard = () => board.getTiles();

    this.move = (direction) => {
        board.move(direction);
        this.updateStatus();
    }
    this.insertTile = () => {
        board.assignNewTile();
    }

    this.updateStatus = () => {
        if (board.getMaxValue() >= 2048) {
            this.gameStatus = 'WIN';
        } else if (!board.isMovable()) {
            this.gameStatus = 'LOSE';
        }
    }
}

module.exports = Game;