// Fixed and optimized JavaScript code for the Snake and Ladder game

let valueOfBox = 1;
let player = true; // True for player 1, false for player 2
let firstPlayerPosition = 0;
let secondPlayerPosition = 0;
let moved;

// Disable the play button initially
function disableFunction() {
    document.getElementById('play').disabled = true;
}

document.getElementById('play').addEventListener("click", randomNumberGenerator);

document.getElementById('PlayerTurn').innerHTML = 'First Player';
document.getElementById('PlayerTurn').style.backgroundColor = 'blue';

// Create the grid
for (let row = 1; row <= 10; row++) {
    const parentDiv = document.createElement('div');
    parentDiv.id = `parent${row}`;
    parentDiv.className = row % 2 === 0 ? 'parent reverse' : 'parent';
    document.getElementById('main').appendChild(parentDiv);

    for (let col = 1; col <= 10; col++) {
        const childDiv = document.createElement('div');
        const textValue = getTextForBox(valueOfBox);
        const childNode = document.createTextNode(textValue);
        const img1 = createImageElement(`img${valueOfBox}`);
        const img2 = createImageElement(`twoImg${valueOfBox}`);

        childDiv.appendChild(childNode);
        childDiv.appendChild(img1);
        childDiv.appendChild(img2);
        childDiv.id = valueOfBox;
        childDiv.className = getClassForBox(valueOfBox, col);
        parentDiv.appendChild(childDiv);
        valueOfBox++;
    }
}

// Helper functions for creating the grid
function getTextForBox(value) {
    const snakes = { 99: '-9', 90: '-43', 72: '-34', 53: '-22' };
    const ladders = { 4: '-23', 28: '-69', 42: '-96', 56: '-78' };
    return snakes[value] || ladders[value] || value;
}

function createImageElement(id) {
    const img = document.createElement('img');
    img.id = id;
    img.className = 'position';
    img.style.display = 'none';
    return img;
}

function getClassForBox(value, col) {
    const snakes = [99, 90, 72, 53];
    const ladders = [4, 28, 42, 56];
    if (snakes.includes(value)) return 'box snake';
    if (ladders.includes(value)) return 'box ladder';
    return col % 2 === 0 ? 'box alternateColor' : 'box';
}

// Game logic functions
function randomNumberGenerator() {
    if (firstPlayerPosition === 100 || secondPlayerPosition === 100) {
        document.getElementById('play').disabled = true;
        return;
    }

    document.getElementById('play').disabled = true;
    document.getElementById('diceImg').src = 'img/PB.gif';

    const diceValue = Math.floor(Math.random() * 6) + 1;
    const diceImg = `img/${['one', 'two', 'three', 'four', 'five', 'six'][diceValue - 1]}.png`;

    setTimeout(() => {
        document.getElementById('diceImg').src = diceImg;
        document.getElementById('num').innerText = diceValue;
        takeTurn(diceValue);
        document.getElementById('play').disabled = false;
    }, 2000);
}

function takeTurn(diceValue) {
    if (player) {
        firstPlayerPosition = movePlayer(firstPlayerPosition, diceValue, 'img', 'img/player1.png');
        if (firstPlayerPosition === 100) {
            endGame('Player 1');
            return;
        }
    } else {
        secondPlayerPosition = movePlayer(secondPlayerPosition, diceValue, 'twoImg', 'img/player2.png');
        if (secondPlayerPosition === 100) {
            endGame('Player 2');
            return;
        }
    }

    player = !player;
    document.getElementById('PlayerTurn').innerHTML = player ? 'First Player' : 'Second Player';
    document.getElementById('PlayerTurn').style.backgroundColor = player ? 'blue' : 'yellow';
}

function movePlayer(position, diceValue, imgPrefix, imgSrc) {
    const oldPosition = position;
    const newPosition = Math.min(position + diceValue, 100);
    document.getElementById(`${imgPrefix}${oldPosition}`).style.display = 'none';

    position = checkLadderOrSnake(newPosition);

    document.getElementById(`${imgPrefix}${position}`).src = imgSrc;
    document.getElementById(`${imgPrefix}${position}`).style.display = 'block';
    return position;
}

function checkLadderOrSnake(position) {
    const ladders = { 4: 23, 28: 69, 42: 96, 56: 78 };
    const snakes = { 99: 9, 90: 43, 72: 34, 53: 22 };
    return ladders[position] || snakes[position] || position;
}

function endGame(winner) {
    alert(`${winner} wins!`);
    if (confirm("Do you want to restart the game?")) {
        location.reload();
    }
}
