import { board } from './board.js';
import { player } from './player.js';

function game(playerName1, playerName2) {
  const myBoard = board();
  const player1 = { ...player(playerName1), symbol: 'X' };
  const player2 = { ...player(playerName2), symbol: 'O' };
  let currentPlayer = player1;
  console.log(currentPlayer.getName())

  function nameOfCurrentPlayer() {
    return currentPlayer.getName();
  }

  function symbolOfCurrentPlayer() {
    return currentPlayer.symbol;
  }

  function makeMove(row, col) {
    if (myBoard.setValue(row, col, currentPlayer.symbol)) {
      const symbolUsed = currentPlayer.symbol;
      if (checkForWin()) {
        currentPlayer.updateScore();
        console.log(`${currentPlayer.getName()} wins!`)
        return symbolUsed;
      }
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      return symbolUsed;
    } else {
      throw new Error('Invalid move')
    }
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
    currentPlayer,
    nameOfCurrentPlayer,
    symbolOfCurrentPlayer,
    makeMove,
    checkForWin,
  };
}

export { game }
