let startBtn = document.getElementsByClassName("start-button");
startBtn[0].addEventListener("click", startGame);
let frontImage = "front3.jpg";

const gameCards = [];
const gameContainer = document.getElementsByClassName("memory-game")[0];
let firstCard = null;
let secondCard = null;
let currentScore = 0;
let cardsFlipped = 0;
let hasFliped = false;
let lockBoard = false;
let isMatch = true;

let lowScore = localStorage.getItem("low-score");
let bestScore = localStorage.getItem("best-score") || Infinity;
if (bestScore) {
    document.getElementById("best-score").innerText = bestScore;
}

const planets = [
    "mercury",
    "venus",
    "earth",
    "mars",
    "uranus",
    "jupiter",
    "saturn",
    "neptune",
    "mercury",
    "venus",
    "earth",
    "mars",
    "uranus",
    "jupiter",
    "saturn",
    "neptune"
];


function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}


let shuffledPlanets = shuffle(planets);


// this function loops over the array of planets
// it creates a new div and an img, gives the img the src of the planet
// it also adds an event listener for a click for each card
function createDivForPlanets(planetsArray) {
    for (let planet of planetsArray) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("game-card");
        let imgPath = planet + ".jpg";
        newDiv.innerHTML = "<img class ='back' src=" + imgPath + ">"
        const newImg = document.createElement("img");
        newImg.src = "front3.jpg";
        newImg.classList.add("front");
        newDiv.append(newImg);

        gameCards.push(newDiv);

        gameContainer.append(newDiv);
    }
}

createDivForPlanets(shuffledPlanets);



for (let cards of gameCards) {

    cards.addEventListener("click", flipCard);
}

//start game function 
function startGame() {
    setScore(0);
}

//set new score 
function setScore(newScore) {
    currentScore = newScore;
    document.getElementById("current-score").innerText = currentScore;
}


//flips the card and stores the best score
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.toggle('flip');
    setScore(currentScore + 1);

    if (!hasFliped) {
        hasFliped = true;

        firstCard = this;
        return;
    }
    secondCard = this;
    cardsFlipped += 2;
    checkForMatch();
    if (isMatch == false) {
        cardsFlipped -= 2;
    }

    if (cardsFlipped === (shuffledPlanets.length)) {
        if (lowScore === null) {
            lowScore = currentScore;
        }
        if (currentScore < bestScore) {

            localStorage.setItem("best-score", currentScore);
            document.getElementById("best-score").innerText = currentScore;
        }
        alert("game over!");
    }
}

//checks if two clicked cards are match
function checkForMatch() {

    if (firstCard.innerHTML === secondCard.innerHTML) {
        disableCards();
        isMatch = true;
        return isMatch;
    } else {
        unFlipCards();
        isMatch = false;
        return isMatch;
    }
}

//disable cards when they match
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();

}

//unflip cards when they don't match
function unFlipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);


}

//reset the board
function resetBoard() {
    [hasFliped, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}