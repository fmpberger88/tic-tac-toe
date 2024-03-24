const board = () => ({
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  // Method to put a value inside board
  setValue(row, col, value) {
    if (this.board[row] && this.board[row][col] === null) {
      this.board[row][col] = value;
      return true;
    }
    return false;
  },
  // Method to print board
  printBoard() {
    this.board.forEach((row) => {
      console.log(row.map((cell) => (cell === null ? '_' : cell)).join(' | '));
    });
  },
});

export { board };
