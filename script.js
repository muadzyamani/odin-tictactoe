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

// UI Class: Handles UI Tasks
class UI {
    static updateGameBoard(index, sign) {
        boxes[index].textContent = sign;
    }

    static clear() {
        boxes.forEach((box) => box.textContent = '');
        gameMessage.textContent = '';
    }

    static displayWinnerMessage(currentPlayerSign) {
        setTimeout(() => {
            gameMessage.textContent = `Player ${currentPlayerSign} wins!`;
        }, 100);
    }

    static displayDrawMessage() {
        setTimeout(() => {
            gameMessage.textContent = `Draw!`;
        }, 100);
    }
}

// GameController Class: Handles Game Logic
class GameController {
    constructor() {
        this.playerX =  new Player('X');
        this.playerO = new Player('O');
        this.currentPlayer = undefined;
        this.isOver = false;
        this.round = 1;
    }
    
    playRound(index) {
        gameBoard.setBox(index, this.getCurrentPlayerSign());
        UI.updateGameBoard(index, this.getCurrentPlayerSign());

        // Check for Winner
        if (this.checkWinner(index) === true) {
            UI.displayWinnerMessage(this.currentPlayer.sign);
            this.isOver = true;
            return;
        }
        // Check for Draw
        if (this.round === 9) {
            UI.displayDrawMessage();
            this.isOver = true;
            return;
        }

        this.round++;
    }

    getCurrentPlayerSign() {
        // Odd number round - PlayerX
        // Even number round - PlayerO
        if (this.round % 2 === 1) {
            this.currentPlayer = this.playerX;
            return this.playerX.getSign();
            
        } else {
            this.currentPlayer = this.playerO;
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
const gameMessage = document.querySelector('.gameMessage');

// Event: Player Input
boxes.forEach((box) => box.addEventListener('click', (event) => {

    if (gameController.isOver === true || event.target.textContent !== '') {
        return;
    }

    gameController.playRound(parseFloat(event.target.id));
}));

// Event: Restart Button
restartButton.addEventListener('click', () => {
    gameBoard.reset();
    gameController.reset();
    UI.clear();
});