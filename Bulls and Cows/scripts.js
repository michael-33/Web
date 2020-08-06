let computerNumber = generateRandomNum();
console.log(computerNumber);

async function onStartClick() {

    for (let roundNumber = 0; roundNumber < 5; roundNumber++) {
        let userGuess = +prompt("Enter a 4 different digits number");
        validateUserInput(userGuess);
        let amountOfHits = calcAmountOfHits(computerNumber, userGuess);
        if (amountOfHits == 4) {
            alert("You Won!");
            return;
        }
        let amountOfNearHits = calcAmountOfNearHits(computerNumber, userGuess);
        document.write("<b>Your Guess: " + userGuess + ".  Amount of hits: " + amountOfHits +
         ".  Amount of near hits: " + amountOfNearHits + ".</b><br>");
        await new Promise(r => setTimeout(r, 1000));
    }
    alert("Game over. The number is " + computerNumber);
}

function generateRandomNum() {
    let number = Math.floor(Math.random() * 9000) + 1000;
    while (!isValidDigits(number)) {
        number = Math.floor(Math.random() * 9000) + 1000;
    }
    return number;
}

function isValidDigits(num) {
    var numDigits = num.toString().split('');
    return (new Set(numDigits).size == numDigits.length);
}

function validateUserInput(userGuess) {
    if (userGuess < 1234) {
        throw new Error("Too low, enter a number between 1234-9876");
    }
    if (userGuess > 9876) {
        throw new Error("Too high, enter a number between 1234-9876");
    }
    if (!isValidDigits(userGuess)) {
        throw new Error("repeated digit, Enter a 4 different digits number");
    }
}

function calcAmountOfHits(computerNum, userNum) {
    var amountOfHits = 0;
    var computerNumDigits = computerNum.toString().split('');
    var userNumDigits = userNum.toString().split('');

    for (let i = 0; i < computerNumDigits.length; i++) {
        if (computerNumDigits[i] == userNumDigits[i]) {
            amountOfHits++;
        }
    }
    return amountOfHits;
}

function calcAmountOfNearHits(computerNum, userNum) {
    var amountOfNearHits = 0;
    var computerNumDigits = computerNum.toString().split('');
    var userNumDigits = userNum.toString().split('');
    
    for (let i = 0; i < computerNumDigits.length; i++) {
        for (let j = 0; j < computerNumDigits.length; j++) {
            if (i != j && computerNumDigits[i] == userNumDigits[j]) {
                amountOfNearHits++;
            }
        }
    }
    return amountOfNearHits;
}
