import { game } from "./utils/game.js";

//input
const form = document.querySelector('form');
const input1 = document.querySelector('#name1');
const input2 = document.querySelector('#name2')

//Buttons
const startButton = document.querySelector('#startButton');
const resetButton = document.querySelector('#resetButton');
const newGameButton = document.querySelector('#newGameButton')

// board
const board = document.querySelector('#board')
const cells = document.querySelectorAll('.cell');

let gameInstance = null;

startButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevents the form from submitting
    const playerOne = document.querySelector('#name1').value;
    const playerTwo = document.querySelector('#name2').value;
    if (playerOne && playerTwo) {
        gameInstance = game(playerOne, playerTwo);

        // add board and resetButton
        board.style.display = "flex";
        resetButton.style.display = "block";

        // hide input and startButtonsElements
        form.style.display = "none";

        const messageContainer = document.querySelector('#messageContainer');

        let roundMessage = document.createElement('p')
        roundMessage.textContent = `Your turn ${gameInstance.nameOfCurrentPlayer()}`
        messageContainer.appendChild(roundMessage);


    } else {
        alert("Please enter both player names");
    }
})

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        try {
            const symbolUsed = gameInstance.makeMove(row, col); // Speichern des Rückgabewerts
            cell.textContent = symbolUsed; // Verwendung des Symbols für die UI-Aktualisierung
            document.querySelector('#messageContainer p').textContent = `Your turn ${gameInstance.nameOfCurrentPlayer()}`;
            if (gameInstance.checkForWin()) {
                const winMessage = document.createElement('h2');
                winMessage.textContent = `${gameInstance.nameOfCurrentPlayer()} wins!`;
                messageContainer.appendChild(winMessage);
                messageContainer.querySelector('#messageContainer p').textContent = "";
                // remove event-listener from cells
                cells.forEach(cell => {
                    cell.removeEventListener('click', makeMove);
                })
            }
        } catch (error) {
            console.error(error.message);
            // Fehlerbehandlung...
        }
    });
});

resetButton.addEventListener('click', () => {
    board.style.display = "none";
    resetButton.style.display = "none";
    form.style.display = "flex";
    input1.value = "";
    input2.value = "";
    messageContainer.textContent = "";
    cells.forEach(cell => {
        cell.textContent = "";
    });
    gameInstance = null;
})

newGameButton.addEventListener('click', () => {
    messageContainer.textContent = "";
    cells.forEach(cell => {
        cell.textContent = "";
    });
})








