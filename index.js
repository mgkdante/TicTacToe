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


const displayController = (() => {
    const displayBoard = () => {
        const board = gameBoard.getBoard();
        const boardContainer = document.querySelector(".board-container");
        boardContainer.innerHTML = "";
        for (let i = 0; i < board.length; i++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.setAttribute("data-index", i);
            square.textContent = board[i];
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
    const displayPlayerTurn = (player) => {
        const playerTurn = document.querySelector(".player-turn");
        playerTurn.textContent = `Player ${player}'s turn`;
    }
    const displayPlayerWin = (player) => {
        const playerWin = document.querySelector(".player-win");
        playerWin.textContent = `Player ${player} wins!`;
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
    return {
        displayBoard,
        displayMessage,
        displayStartButton,
        hideStartButton,
        displayResetButton,
        hideResetButton,
        displayPlayerTurn,
        displayPlayerWin,
        displayTie,
        displayGame,
        hideGame
    };
})();

