// Player Class: Represents Player
class Player {
    constructor(sign) {
        this.sign = sign;
    }

    getSign() {
        return this.sign;
    }
}

// GameBoard Class: Represents Gameboard
class GameBoard {
    constructor() {
        this.board = ['', '', '', '', '', '', '', '', ''];
    }

    setBox(index, sign) {
        if (index > this.board.length) return;
        this.board[index] = sign;
    }

    getBox(index) {
        if (index > this.board.length) return;
        return this.board[index];
    }

    reset() {
        for (let i = 0; i < this.board.length; i++) {
            this.board[i] = '';
        }
    }
}

// DisplayController Class: Handles UI Tasks
class DisplayController {
    static updateGameboard() {
        boxes.forEach((box) => {
            box.textContent = gameBoard.getBox(box);
        });
    }
}

// GameController Class: Handles Game Logic
class GameController {
    constructor() {
        this.playerX =  new Player('X');
        this.playerO = new Player('O');
        this.winner = null;
        this.isOver = false;
        this.round = 1;
    }
    
    playRound(index) {
        console.log(`Round: ${this.round} | Player: ${this.getCurrentPlayerSign()} | Index: ${index}`);

        gameBoard.setBox(index, this.getCurrentPlayerSign());

        if (this.checkWinner(index)) {
            // display winner
            this.isOver = true;
            return;
        }
        if (this.round === 9) {
            // display draw
            this.isOver = true;
            return;
        }

        this.round++;
    }

    getCurrentPlayerSign() {
        if (this.round % 2 === 1) {
            return this.playerX.getSign();
        } else {
            return this.playerO.getSign();
        }
    }

    checkWinner(index) {
        const winCondition = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];

        return winCondition
            .filter((combination) => combination.includes(index))
            .some((possibleCombination) => possibleCombination.every(
                (index) => gameBoard.getBox(index) === this.getCurrentPlayerSign()
            )
        );
    }

    reset() {
        this.round = 1;
        this.isOver = false;
    }
}


// Instantiate Game Board
const gameBoard = new GameBoard();

// Instantiate Game Controller
const gameController = new GameController();

// Constant DOM Elements
const boxes = Array.from(document.querySelectorAll('.box'));
const restartButton = document.querySelector('.restartButton');

// Event: Player Input
boxes.forEach((box) => 
    box.addEventListener('click', (event) => {
        if (gameController.isOver || event.target.textContent !== '') return;

        gameController.playRound(parseInt(event.target.id));
        DisplayController.updateGameboard();
    })
);

// Event: Restart Button
restartButton.addEventListener('click', () => {
    gameBoard.reset();
    gameController.reset();
});