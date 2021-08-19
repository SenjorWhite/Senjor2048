let tiles = [];
const boardSize = 4;
const probabilitySettings = [{ number: 2, probability: 90 }, { number: 4, probability: 10 }];
const probabilityTable = [];
let unmergedTiles = [];

function Board() {
    this.init = (elements) => {
        if (elements) {
            tiles = elements;
        } else {
            tiles = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
        }

        resetMergedTile();
        generateProbabilityTable();
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
        resetMergedTile();
        switch (direction.toUpperCase()) {
            case 'UP':
                for (let i = 0; i < boardSize; i++) {
                    for (let j = 0; j < boardSize; j++) {
                        this.slideTile({ x: i, y: j }, { x: 0, y: -1 });
                    }
                }
                break;
            case 'DOWN':
                for (let i = 0; i < boardSize; i++) {
                    for (let j = boardSize - 1; j >= 0; j--) {
                        this.slideTile({ x: i, y: j }, { x: 0, y: 1 });
                    }
                }
                break;
                break;
            case 'RIGHT':
                for (let i = boardSize - 1; i >= 0; i--) {
                    for (let j = 0; j < boardSize; j++) {
                        this.slideTile({ x: i, y: j }, { x: 1, y: 0 });
                    }
                }
                break;
            case 'LEFT':
                for (let i = 0; i < boardSize; i++) {
                    for (let j = 0; j < boardSize; j++) {
                        this.slideTile({ x: i, y: j }, { x: -1, y: 0 });
                    }
                }
                break;
            default:
        }
    }

    // vector format should looks like {x:value , y:value} 
    // e.g. {x:0, y:-1} means sliding UP
    this.slideTile = (location, vector) => {
        const currentValue = tiles[location.x][location.y];
        let currentLocation = location;

        if (currentValue === 0)
            return;

        while (true) {
            const nextLocation = { x: currentLocation.x + vector.x, y: currentLocation.y + vector.y };

            if (isValidLocation(nextLocation)) {
                const valueOnNextLocation = tiles[nextLocation.x][nextLocation.y];

                if (valueOnNextLocation === 0) {
                    tiles[nextLocation.x][nextLocation.y] = currentValue;
                    tiles[currentLocation.x][currentLocation.y] = 0;
                    currentLocation = nextLocation;
                } else if (valueOnNextLocation === currentValue && isUnmergedTile(nextLocation)) {
                    tiles[nextLocation.x][nextLocation.y] = currentValue * 2;
                    tiles[currentLocation.x][currentLocation.y] = 0;
                    unmergedTiles[nextLocation.x][nextLocation.y] = false;
                    break;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
    }
}

function isUnmergedTile(location) {
    return unmergedTiles[location.x][location.y];
}

function resetMergedTile() {
    for (let i = 0; i < boardSize; i++) {
        unmergedTiles[i] = [];
        for (let j = 0; j < boardSize; j++) {
            unmergedTiles[i].push(true);
        }
    }
}


function isValidLocation(location) {
    let valid = true;
    if (location.x < 0 || location.y < 0) {
        valid = false;
    } else if (location.x >= boardSize || location.y >= boardSize) {
        valid = false;
    }

    return valid;
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