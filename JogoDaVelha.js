const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const board = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
];

let currentPlayer = "X";

function boardPrinted() {
  console.log("--------------------------");
  console.log("|" + board[0][0] + "|" + board[0][1] + "|" + board[0][2] + "|");
  console.log("|" + board[1][0] + "|" + board[1][1] + "|" + board[1][2] + "|");
  console.log("|" + board[2][0] + "|" + board[2][1] + "|" + board[2][2] + "|");
  console.log("--------------------------");
}

function winByRows(player) {
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === player &&
      board[i][1] === player &&
      board[i][2] === player
    ) {
      return true;
    }
  }
  return false;
}

function winByCols(player) {
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] === player &&
      board[1][i] === player &&
      board[2][i] === player
    ) {
      return true;
    }
  }
  return false;
}

function winByDiagonals(player) {
  if (
    board[0][0] === player &&
    board[1][1] === player &&
    board[2][2] === player
  ) {
    return true;
  } else if (
    board[0][2] === player &&
    board[1][1] === player &&
    board[2][0] === player
  ) {
    return true;
  } else {
    return false;
  }
}

function checkWin(player) {
  return winByCols(player) || winByDiagonals(player) || winByRows(player);
}

function checkTie() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === " ") {
        return false;
      }
    }
  }
  return true;
}

function playGame() {
  rl.question(
    `Player ${currentPlayer}: Enter row,col to play using numbers from 0 to 2! Ex: 1,2 `,
    (response) => {
      const [row, col] = response.split(",");
      try {
        if (board[row][col] !== " ") {
          console.log(
            "Unavailable space, please select a space that's not occupied or a number from 0 to 2!"
          );
          playGame();
        } else {
          board[row][col] = currentPlayer;
          boardPrinted();
          if (checkWin(currentPlayer)) {
            console.log(`Player ${currentPlayer} wins!`);
            rl.close();
            return;
          }
          if (checkTie()) {
            console.log("It's a tie!");
            rl.close();
            return;
          }
          currentPlayer = currentPlayer === "X" ? "O" : "X";
          playGame();
        }
      } catch {
        console.log(
          "Unavailable space, please select a space that's not occupied or a number from 0 to 2!"
        );
        playGame();
      }
    }
  );
}

boardPrinted();
playGame();
