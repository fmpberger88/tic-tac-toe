import { board } from './board.js';
import { player } from './player.js';

function game(playerName1, playerName2) {
  const myBoard = board();
  const player1 = { ...player(playerName1), symbol: 'X' };
  const player2 = { ...player(playerName2), symbol: 'O' };
  let currentPlayer = player1;

  function makeMove(row, col) {
    if (myBoard.setValue(row, col, currentPlayer.symbol)) {
      if (checkForWin()) {
        console.log(`${currentPlayer.name} wins!`);
        currentPlayer.updateScore();
        console.log(`${currentPlayer.name} has a score value of ${currentPlayer.getScore()}`)
        return true;
      }
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    } else {
      throw new Error('Invalid move')
    }
    return false;
  }

  function checkForWin() {
    const rows = myBoard.board;
    const cols = [[], [], []];
    const diagonals = [[], []];

    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < rows[i].length; j++) {
        cols[j][i] = rows[i][j];
        if (i === j) {
          diagonals[0].push(rows[i][j]);
        }
        if (i + j === rows.length - 1) {
          diagonals[1].push(rows[i][j]);
        }
      }
    }

    const lines = [...rows, ...cols, ...diagonals];

    for (let line of lines) {
      if (line.every((cell) => cell === currentPlayer.symbol)) {
        return true;
      }
    }

    return false;
  }

  return {
    printBoard: () => myBoard.printBoard(),
    players: [player1, player2],
    makeMove,
  };
}

export { game }
