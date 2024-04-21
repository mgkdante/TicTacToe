let cells = {};

for (let i = 1; i <= 9; i++) {
  cells["cell" + i] = document.getElementById(i.toString());
}

const elements = {
  playerTurn: document.getElementById("player-turn"),
  winner: document.getElementById("winner"),
  resetButton: document.getElementById("reset-button"),
  boardCol: document.getElementsByClassName("board-col"),
  dialog: document.getElementById("form-dialog"),
  player1Name: document.getElementById("player1"),
  player2Name: document.getElementById("player2"),
  submitPlayers: document.getElementById("submit-players"),
  board: document.getElementById("game-board"),
};

const player = (name, marker) => {
  let turn = false;
  const getTurn = () => turn;
  const setTurn = (bool = false) => (turn = !bool);
  return { name, marker, setTurn, getTurn };
};

const gameBoard = (() => {
  let board = [];
  const addMarker = (n, m, marker) => {
    board[n][m] = marker;
  };
  const getBoard = () => board;
  const resetBoard = () =>
    (board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
  return { getBoard, addMarker, resetBoard };
})();

const gameWin = (player) => {
  let board = gameBoard.getBoard();
  if (
    (board[0][0] === player.marker &&
      board[0][1] === player.marker &&
      board[0][2] === player.marker) ||
    (board[1][0] === player.marker &&
      board[1][1] === player.marker &&
      board[1][2] === player.marker) ||
    (board[2][0] === player.marker &&
      board[2][1] === player.marker &&
      board[2][2] === player.marker)
  ) {
    return player.name;
  } else if (
    (board[0][0] === player.marker &&
      board[1][1] === player.marker &&
      board[2][2] === player.marker) ||
    (board[0][2] === player.marker &&
      board[1][1] === player.marker &&
      board[2][0] === player.marker)
  ) {
    return player.name;
  } else if (
    (board[0][0] === player.marker &&
      board[1][0] === player.marker &&
      board[2][0] === player.marker) ||
    (board[0][1] === player.marker &&
      board[1][1] === player.marker &&
      board[2][1] === player.marker) ||
    (board[0][2] === player.marker &&
      board[1][2] === player.marker &&
      board[2][2] === player.marker)
  ) {
    return player.name;
  }
};

const player1 = player("", "X");
const player2 = player("", "O");

Object.values(cells).forEach((cell) => {
  cell.addEventListener("click", () => {
    let id = parseInt(cell.id);
    let row = Math.floor((id - 1) / 3);
    let col = (id - 1) % 3;
    if (player1.getTurn() && cell.textContent === "") {
      elements.playerTurn.textContent = player2.name;
      gameBoard.addMarker(row, col, player1.marker);
      cell.textContent = player1.marker;
      if (gameWin(player1) === player1.name) {
        elements.winner.textContent = player1.name;
        elements.board.style.pointerEvents = "none";
      } else if (checkTie()) {
        elements.winner.textContent = "Tie";
      }
      player1.setTurn(player1.getTurn());
      player2.setTurn(player2.getTurn());
    } else if (player2.getTurn() && cell.textContent === "") {
      elements.playerTurn.textContent = player1.name;
      gameBoard.addMarker(row, col, player2.marker);
      cell.textContent = player2.marker;
      if (gameWin(player2) === player2.name) {
        elements.winner.textContent = player2.name;
        elements.board.style.pointerEvents = "none";
      } else if (checkTie()) {
        elements.winner.textContent = "Tie";
      }
      player2.setTurn(player2.getTurn());
      player1.setTurn(player1.getTurn());
    }
  });
});

const startOrResetGame = () => {
  elements.dialog.showModal();
  gameBoard.resetBoard();
  player1.setTurn();
  player2.setTurn(true);
  Array.from(elements.boardCol).forEach((cell) => {
    cell.textContent = "";
  });
  elements.playerTurn.textContent = "N/A";
  elements.winner.textContent = "N/A";
  elements.board.style.pointerEvents = "auto";
};

startOrResetGame();

elements.resetButton.addEventListener("click", () => {
  console.log("test");
  startOrResetGame();
});

elements.submitPlayers.addEventListener("click", (event) => {
  event.preventDefault();
  player1.name = elements.player1Name.value;
  elements.playerTurn.textContent = player1.name;
  player2.name = elements.player2Name.value;
  elements.player1Name.value = "";
  elements.player2Name.value = "";
  elements.dialog.close();
});

const checkTie = () => {
  let board = gameBoard.getBoard();
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === "") {
        return false; // game is not a tie because there's an empty cell
      }
    }
  }
  return gameWin(player1) !== player1.name && gameWin(player2) !== player2.name;
};
