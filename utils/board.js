const board = () => ({
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  // Method to put a value inside board
  setValue(row, col, value) {
    console.log(`Versuch, Wert zu setzen: ${value} bei [${row}, ${col}]`);
    if (this.board[row] && this.board[row][col] === null) {
      this.board[row][col] = value;
      console.log("Wert erfolgreich gesetzt.");
      return true;
    } else {
      console.log("Wert konnte nicht gesetzt werden.");
      return false;
    }
  }
});

export { board };
