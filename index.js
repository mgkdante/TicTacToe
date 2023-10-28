const player = (player, mark) => {
    return { player, mark };
}

const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];
    const getBoard = () => board;
    const setBoard = (index, mark) => {
        board[index] = mark;
    }
    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    }
    return { getBoard, setBoard, resetBoard };
})();


const gameController = (() => {
    const player1 = player("Player 1", "X");
    const player2 = player("Player 2", "O");
    let currentPlayer = player1;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    const getCurrentPlayer = () => currentPlayer;

    const isSquareMarked = (index) => {
        const board = gameBoard.getBoard();
        return board[index] !== "";
    }

    const startGame = () => {
        const player1Name = document.getElementById('player1').value;
        const player2Name = document.getElementById('player2').value;
        player1.player = player1Name || "Player 1";
        player2.player = player2Name || "Player 2";
        gameBoard.resetBoard();
        currentPlayer = player1;
        displayController.displayBoard();
        displayController.displayPlayerTurn();
        displayController.hideStartButton();
        displayController.displayResetButton();
        displayController.displayGame();
    }

    const resetGame = () => {
        document.getElementById('player1').value = '';
        document.getElementById('player2').value = '';
        gameBoard.resetBoard();
        currentPlayer = player1;
        displayController.displayBoard();
        document.getElementById('winner-message').style.display = 'none'; // hide winner message
    }

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const hasPlayerWon = (player) => {
        const board = gameBoard.getBoard();
        return winningCombinations.some(combination =>
            combination.every(index => board[index] === player.mark));
    }

    const isGameTie = () => {
        const board = gameBoard.getBoard();
        return board.every(square => square !== "") &&
            !hasPlayerWon(player1) &&
            !hasPlayerWon(player2);
    }

    return { switchPlayer, getCurrentPlayer, isSquareMarked, hasPlayerWon, isGameTie, startGame, resetGame };
})();

document.querySelector(".start-button").addEventListener('click', gameController.startGame);
document.querySelector(".reset-button").addEventListener('click', gameController.resetGame);

const displayController = (() => {
    let gameOver = false;
    const isGameOver = () => gameOver;
    const resetGameOver = () => {
        gameOver = false;
    }
    const hidePlayerTurn = () => {
        const playerTurn = document.querySelector(".player-turn");
        playerTurn.classList.add("hidden");
    }

    const displayBoard = () => {
        const board = gameBoard.getBoard();
        const boardContainer = document.querySelector(".board-container");
        boardContainer.innerHTML = "";
        for (let i = 0; i < board.length; i++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.setAttribute("data-index", i);
            square.textContent = board[i];
            square.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                const currentPlayer = gameController.getCurrentPlayer();
                if (!gameController.isSquareMarked(index) && !isGameOver()) {
                    gameBoard.setBoard(index, currentPlayer.mark);
                    displayBoard();
                    gameController.switchPlayer();
                    displayPlayerTurn();
                }

                if (gameController.hasPlayerWon(currentPlayer)) {
                    displayPlayerWin(currentPlayer.player);
                    gameOver = true;
                    hidePlayerTurn();  // Hide the player turn message
                }

                if (gameController.isGameTie()) {
                    displayTie();
                    gameOver = true;
                    hidePlayerTurn();  // Hide the player turn message
                }
            });
            boardContainer.appendChild(square);
        }
    }
    const displayMessage = (message) => {
        const messageContainer = document.querySelector(".message-container");
        messageContainer.textContent = message;
    }
    const displayStartButton = () => {
        const startButton = document.querySelector(".start-button");
        startButton.classList.remove("hidden");
    }
    const hideStartButton = () => {
        const startButton = document.querySelector(".start-button");
        startButton.classList.add("hidden");
    }
    const displayResetButton = () => {
        const resetButton = document.querySelector(".reset-button");
        resetButton.classList.remove("hidden");
    }
    const hideResetButton = () => {
        const resetButton = document.querySelector(".reset-button");
        resetButton.classList.add("hidden");
    }
    const displayPlayerTurn = () => {
        const playerTurn = document.querySelector(".player-turn");
        const currentPlayer = gameController.getCurrentPlayer();
        playerTurn.textContent = `${currentPlayer.player}'s turn`;
    }
    const displayPlayerWin = (playerName) => {
        const playerWin = document.querySelector(".player-win");
        playerWin.textContent = `${playerName} wins!`;
    }

    const displayWinner = (player) => {
        const winnerMessage = document.getElementById('winner-message');
        winnerMessage.textContent = `${player} is the winner!`;
        winnerMessage.style.display = 'block';
    }

    const displayTie = () => {
        const tie = document.querySelector(".tie");
        tie.textContent = "It's a tie!";
    }
    const displayGame = () => {
        const game = document.querySelector(".game");
        game.classList.remove("hidden");
    }
    const hideGame = () => {
        const game = document.querySelector(".game");
        game.classList.add("hidden");
    }
    return { displayWinner, displayBoard, displayPlayerTurn, hidePlayerTurn, hideStartButton, displayResetButton, displayGame, isGameOver, resetGameOver };
})();

