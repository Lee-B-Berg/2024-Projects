let isXTurn = true;
let gameOver = false;

let slotIDs = ["TopLef", "TopMid", "TopRig",
"MidLef", "MidMid", "MidRig", "BotLef", "BotMid", "BotRig"];
let slotStates = [];

function Initialize() { // this has been written but not called yet, currently X always starts
    determineWhoGoesFirst();
}

function place(slot) {

    if (gameOver) {return;}

    if (isXTurn) {
        slot.innerHTML = "x";
        isXTurn = false;
        slot.disabled = true;
    } else {
        slot.innerHTML = "o";
        isXTurn = true;
        slot.disabled = true;
    }

    getStates();
    let outcome = checkWin();
    document.getElementById("gameStatus").innerHTML = "The Winner Is: " + outcome;
    if (outcome != "?") {
        gameOver = true;
    }
    else {checkDraw();}

}

function reset() {
    let allButtons = document.getElementsByClassName("slot");
    for (let index = 0; index < allButtons.length; index++) {
        allButtons[index].disabled = false;
        allButtons[index].innerHTML = ".";
    }
    document.getElementById("gameStatus").innerHTML = "The Winner Is: ?";
    gameOver = false;
    isXTurn = true;
}

function getStates() {
    for (let index = 0; index < slotIDs.length; index++) {
        slotStates[index] = document.getElementById(slotIDs[index]).innerHTML
    }
}

function checkDraw() {
    let allFilled = true;
    for (let index = 0; index < slotStates.length; index++) {
        if (slotStates[index] == ".") { allFilled = false; }
    }
    if (allFilled) {
        gameOver = true;
        document.getElementById("gameStatus").innerHTML = "The game ended in a draw!";
    }
}

function checkWin() {
    let winner = "?"
    let current = slotStates[0];
    if (current != ".") {
        if ( current == slotStates[3] && current == slotStates[6] ) { winner = current; }
        if ( current == slotStates[1] && current == slotStates[2] ) { winner = current; }
        if ( current == slotStates[4] && current == slotStates[8] ) { winner = current; }
    }
    current = slotStates[3];
    if (current != ".") {
        if ( current == slotStates[4] && current == slotStates[5] ) { winner = current; }
    }
    current = slotStates[6];
    if (current != ".") {
        if ( current == slotStates[7] && current == slotStates[8] ) { winner = current; }
        if ( current == slotStates[4] && current == slotStates[2] ) { winner = current; }
    }
    current = slotStates[1];
    if (current != ".") {
        if ( current == slotStates[4] && current == slotStates[7] ) { winner = current; }
    }
    current = slotStates[2];
    if (current != ".") {
        if ( current == slotStates[5] && current == slotStates[8] ) { winner = current; }
    }
    return winner;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function determineWhoGoesFirst() {
    let num = getRandomInt(2);
    if (num == 0) { isXTurn = true; }
    else { isXTurn = false; }
}