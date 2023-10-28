# Tic Tac Toe Game

This is a simple implementation of the classic game Tic Tac Toe. It is built using HTML, CSS, and JavaScript.

## How to Play

1. Enter the names of Player 1 and Player 2 in the respective input fields.
2. Click the "Start" button to begin the game.
3. Players take turns clicking on the squares to mark them with their symbol (Player 1 is "X", Player 2 is "O").
4. The first player to get three of their marks in a row (up, down, across, or diagonally) is the winner.
5. If all squares are marked and no player has three marks in a row, the game is a tie.
6. Click the "Reset" button to clear the board and start a new game.

## Features

- The game board is a 3x3 grid.
- Players' names are customizable.
- The game detects when a player has won and displays a winning message.
- The game also detects a tie game (when the entire board is filled without a winner).
- The game can be reset at any time.

## Installation

1. Clone this repository to your local machine.
2. Open the `index.html` file in your web browser to start the game.


## Code Explanation

### HTML

The HTML structure of the game consists of input fields for the players' names, a start button, a reset button, and a container for the game board. Each square on the game board is represented by a `div` element. There are also `div` elements for displaying messages such as the current player's turn, the winner, and a tie game.

### CSS

The CSS styles the game to have a clean and modern look. The game board is displayed as a grid with three columns, and each square has a border and a hover effect. The winner message is styled to appear in the center of the screen with a semi-transparent background.

### JavaScript

The JavaScript code controls the game logic. It uses the Module pattern to encapsulate related code into self-contained modules. 

- The `player` module creates a player object with a name and a mark ("X" or "O").
- The `gameBoard` module controls the state of the game board.
- The `gameController` module controls the game flow, such as switching players, checking if a square is already marked, checking for a win or a tie, and starting and resetting the game.
- The `displayController` module controls the display of the game, such as updating the game board, displaying messages, and showing and hiding buttons.

The game starts when the "Start" button is clicked. Players take turns to mark squares on the board. The game checks for a win or a tie after each turn. When a player wins, a winning message is displayed. If the game is a tie, a tie message is displayed. The game can be reset at any time by clicking the "Reset" button.


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.