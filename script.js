import { game } from "./utils/game.js";

//Input
const playerOne = document.querySelector('#name1').value;
const playerTwo = document.querySelector('#name2').value;

//Buttons
const startButton = document.querySelector('#startButton').value;
const resetButton = document.querySelector('#resetButton').value;

//

startButton.addEventListener('click', () =>{
    if (playerOne && playerTwo) {
        game(playerOne, playerTwo);
    }
})