// Funktion zur Ausführung des Spielzugs und Aktualisierung der UI
function handleCellClick(cells, gameInstance, winMessage, resetButton, newGameButton, removeCellClickHandler, event) {
    const cell = event.target;
    const index = Array.from(cells).indexOf(cell);
    const row = Math.floor(index / 3);
    const col = index % 3;

    if (gameInstance === null) {
        throw new Error('Game not initialized');
    }

    try {
        const symbolUsed = gameInstance.makeMove(row, col);
        cell.textContent = symbolUsed;
        document.querySelector('#messageContainer p').textContent = `Your turn ${gameInstance.nameOfCurrentPlayer()}`;

        // Prüfen ob das Spiel nach dem aktuellen Zug gewonnen wurde
        if (gameInstance.checkForWin()) {
            winMessage = document.createElement('h2');
            winMessage.textContent = `${gameInstance.nameOfCurrentPlayer()} wins!`;
            document.querySelector('#messageContainer').appendChild(winMessage);
            document.querySelector('#messageContainer p').textContent = "";

            // Event-Listener von allen Zellen entfernen
            removeCellClickHandler(cells);


            // remove resetButton
            resetButton.remove();
            // add newGameButton
            newGameButton.style.display = 'block';

        }
    } catch (error) {
        console.error(error.message);
        // Fehlerbehandlung...
    }
}

export { handleCellClick };