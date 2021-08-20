const express = require('express');
const Game = require('./packages/module/src/Game');
const app = express();
const port = 12048;

let game = new Game();

app.get('/2048/newGame', (req, res) => {
    game.init();
    res.send({ status: game.gameStatus, gameBoard: JSON.stringify(game.getBoard()) });
});

app.put('/2048/addTile', (req, res) => {
    if (game.insertTile()) {
        res.send({ status: game.gameStatus, gameBoard: JSON.stringify(game.getBoard()) });
    } else {
        res.send({ error: "There is no space for inserting a tile." });
    }
})

app.get('/2048/move/:direction', (req, res) => {
    let result = game.move(req.params.direction);
    if (result === false) {
        res.send({ error: "It's not a valid move." });
    } else {
        // the new tile should be automatically added into the gameBoard
        if (game.isBoardChanged())
            game.insertTile();
        res.send({ status: game.gameStatus, gameBoard: JSON.stringify(game.getBoard()) });
    }
})

app.get('/2048/status', (req, res) => {
    res.send({ status: game.gameStatus, gameBoard: JSON.stringify(game.getBoard()) });
})

app.listen(port, () => {
    console.log(`Game Server 2048 is listening on port: ${port}`);
})