import { game } from "./utils/game.js";
import { handleCellClick } from "./utils/handleCellClick.js";


// function for removing eventlistener
function removeCellClickHandler(cells) {
    cells.forEach(cell => {
        cell.removeEventListener('click', cellClickHandler);
    })
}
// cellClickHandler
function cellClickHandler(event) {
    handleCellClick(cells, gameInstance, winMessage, resetButton, newGameButton, removeCellClickHandler, event);
}

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
let winMessage = null;

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

        // add event-listener for cells
        cells.forEach(cell => {
            cell.addEventListener('click', cellClickHandler);
        });


    } else {
        alert("Please enter both player names");
    }
})


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
    // remove EventListener from cells
    cells.forEach(cell => {
        cell.removeEventListener('click', cellClickHandler);
    });
})

newGameButton.addEventListener('click', () => {
    // Den Store des Spielstatus zurücksetzen (neues Spiel instanziieren)
    const playerOne = document.querySelector('#name1').value;
    const playerTwo = document.querySelector('#name2').value;
    gameInstance = game(playerOne, playerTwo);
    // Den Spielstatus in dem UI aktualisieren
    document.querySelector('#messageContainer p').textContent = `Your turn ${gameInstance.nameOfCurrentPlayer()}`;
    // Jede Zelle leeren
    cells.forEach(cell => {
        cell.textContent = "";
    });
    // Event-Listener zu jeder Zelle hinzufügen
    cells.forEach(cell => {
        cell.addEventListener('click', cellClickHandler);
    });
    // Den "New Game"-Button verstecken und den Reset-Button wieder anzeigen
    newGameButton.style.display = 'none';
    resetButton.style.display = 'block';
    // drop win message
    if(winMessage) {
        document.body.removeChild(winMessage);
        winMessage = null;
    }
});







