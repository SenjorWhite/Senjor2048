let tiles = [];
const boardSize = 4;
const probabilitySettings = [{ number: 2, probability: 90 }, { number: 4, probability: 10 }];
const probabilityTable = [];

function Board() {
    this.init = (elements) => {
        if (elements) {
            tiles = elements;
        } else {
            tiles = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
        }

        generateProbabilityTable();
        console.log(probabilityTable);
    };

    this.getTiles = () => tiles;

    this.getEmptyTiles = () => {
        let emptyTiles = [];
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if (tiles[i][j] === 0) {
                    emptyTiles.push({ x: i, y: j });
                }
            }
        }
        return emptyTiles;
    }

    this.setTile = (x, y, value) => {
        tiles[x][y] = value;
    }

    this.setTiles = (elements) => {
        tiles = elements;
    }

    this.assignNewTile = (number = diceANumber()) => {
        const emptyTiles = this.getEmptyTiles();
        const location = Math.floor(Math.random() * emptyTiles.length);
        this.setTile(emptyTiles[location].x, emptyTiles[location].y, number);
    }

    this.move = (direction) => {
        switch (direction.toUpperCase) {
            case 'UP':
                break;
            case 'DOWN':
                break;
            case 'RIGHT':
                break;
            case 'Left':
                break;
            default:
        }
    }
}

function generateProbabilityTable() {
    probabilityTable[0] = probabilitySettings[0].probability;
    for (let i = 1; i < probabilitySettings.length; i++) {
        probabilityTable[i] = probabilitySettings[i].probability + probabilityTable[i - 1];
    }
}

function diceANumber() {
    let number = probabilitySettings[0].number;
    const location = Math.floor(Math.random() * probabilityTable[probabilityTable.length - 1]) + 1;
    for (let i = 0; i < probabilityTable.length; i++) {
        if (location <= probabilityTable[i]) {
            number = probabilitySettings[i].number;
            break;
        }
    }

    return number;
}

module.exports = Board;