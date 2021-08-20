const Board = require('./Board');
let board = new Board();

function Game() {
    this.gameStatus = 'PLAYABLE';
    this.init = (elements) => {
        board.init();
        if (elements) {
            board.setTiles(elements);
        } else {
            board.assignNewTile();
            board.assignNewTile();
        }
    }
    this.getEmptyTiles = () => board.getEmptyTiles();
    this.getBoard = () => board.getTiles();
    this.isBoardChanged = () => board.moved;

    this.move = (direction) => {
        let result = board.move(direction);
        this.updateStatus();
        return result;
    }
    this.insertTile = () => {
        return board.assignNewTile();
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