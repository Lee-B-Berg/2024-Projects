let isXTurn = true;
let gameOver = false;

let slotIDs = ["TopLef", "TopMid", "TopRig",
"MidLef", "MidMid", "MidRig", "BotLef", "BotMid", "BotRig"];
let slotStates = [];

document.getElementById("board").style.display = "none";

function Initialize() { // this has been written but not called yet, currently X always starts
    determineWhoGoesFirst();
    reset();

    document.getElementById("board").style.display = "grid";
    document.getElementById("titleBox").style.display = "none";
    document.getElementById("NewGameButton").innerHTML = "NEW GAME";

    setTurnTrackerBox();
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
    setSlotAppearance(slot);

    getStates();
    let outcome = checkWin();
    document.getElementById("gameStatus").innerHTML = "WINNER: " + outcome;
    if (outcome != "?") {
        document.getElementById("turnTrackerText").innerHTML = "GAME OVER";
        gameOver = true;
    }
    else {
        checkDraw();
        setTurnTrackerBox();
    }

}

function setSlotAppearance(slot) {
    if (slot.innerHTML == "x") {
        slot.style.backgroundColor = "#3B7ED5"; //blue
    }
    if (slot.innerHTML == "o") {

        slot.style.backgroundColor = "#E20E3F"; //red
    }
    if (slot.innerHTML == ".") {
        slot.style.backgroundColor = "white";
    }
}

function reset() {
    let allButtons = document.getElementsByClassName("slot");
    for (let index = 0; index < allButtons.length; index++) {
        allButtons[index].disabled = false;
        allButtons[index].innerHTML = ".";
        setSlotAppearance( allButtons[index] );
    }
    document.getElementById("gameStatus").innerHTML = "WINNER: ?";
    gameOver = false;
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
        if ( current == slotStates[3] && current == slotStates[6] ) { winner = current; makeWinSlotsVisible(0, 3, 6); }
        if ( current == slotStates[1] && current == slotStates[2] ) { winner = current; makeWinSlotsVisible(0, 1, 2); }
        if ( current == slotStates[4] && current == slotStates[8] ) { winner = current; makeWinSlotsVisible(0, 4, 8); }
    }
    current = slotStates[3];
    if (current != ".") {
        if ( current == slotStates[4] && current == slotStates[5] ) { winner = current; makeWinSlotsVisible(3, 4, 5); }
    }
    current = slotStates[6];
    if (current != ".") {
        if ( current == slotStates[7] && current == slotStates[8] ) { winner = current; makeWinSlotsVisible(6, 7, 8); }
        if ( current == slotStates[4] && current == slotStates[2] ) { winner = current; makeWinSlotsVisible(6, 4, 2); }
    }
    current = slotStates[1];
    if (current != ".") {
        if ( current == slotStates[4] && current == slotStates[7] ) { winner = current; makeWinSlotsVisible(1, 4, 7); }
    }
    current = slotStates[2];
    if (current != ".") {
        if ( current == slotStates[5] && current == slotStates[8] ) { winner = current; makeWinSlotsVisible(2, 5, 8); }
    }
    return winner;
}

function makeWinSlotsVisible(s1, s2, s3) {
    let winningSlots = [s1, s2, s3];
    for (let index = 0; index < winningSlots.length; index++) {
        let slot = document.getElementById( slotIDs[ winningSlots[index] ] );
        slot.style.backgroundColor = "#00E408"; //green
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function determineWhoGoesFirst() {
    let num = getRandomInt(2);
    if (num == 0) { isXTurn = true; }
    else { isXTurn = false; }
}
function setTurnTrackerBox() {
    let text = document.getElementById("turnTrackerText");
    if (isXTurn) { text.innerHTML = "x"; }
    if (!isXTurn) { text.innerHTML = "o"; }
}