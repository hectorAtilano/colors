const gameContainer = document.getElementById("game");
const score = document.querySelector("#points");
const highScore = document.querySelector("#clicks");
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];
const cardOne = {
  color: null,
  cardRef: null,
};
const cardTwo = {
  color: null,
  cardRef: null,
};
let flippedCards = 0;
let points = 0;

//locastorage nont working
document.addEventListener("load", (e) => {
  highScore.innerHTML = localStorage.getItem("scoreCard");
});

// if (localStorage.getItem("scoreCard")) {
//   highScore.innerText = "";
//   highScore.innerText = localStorage.getItem("scoreCard");
// }

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
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

let shuffledColors = shuffle(COLORS);

//return random rgb string
function setRGB() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;
}

//create individual spans elements for each letter of logo name -> colors
function addText(span) {
  const cardText = "COLORS";
  for (let letter of cardText) {
    const innerSpan = document.createElement("span");
    innerSpan.innerText = letter;
    innerSpan.classList.add("letter");

    innerSpan.style.color = setRGB();
    span.append(innerSpan);
  }
}
highScore;
//flips card div & uses a counter to only allow
//two flipped cards at a time.
//fix bug: app breaks if card-logo (<span>innerspans</span>) is clicked instead of card div
function handleCardClick(e) {
  if (flippedCards === 0) {
    flippedCards++;
    points++;

    cardOne["color"] = e.target.classList[0];
    cardOne["cardRef"] = e.target;

    score.innerText = `Score: ${points}`;
    e.target.classList.toggle("flip");
    setTimeout(() => {
      e.target.children[0].classList.toggle("hide");
      e.target.style.backgroundColor = e.target.classList[0];
    }, 500);
  } else if (flippedCards === 1 && e.target != cardOne["cardRef"]) {
    flippedCards++;
    points++;

    cardTwo["color"] = e.target.classList[0];
    cardTwo["cardRef"] = e.target;

    score.innerText = `Score: ${points}`;
    e.target.classList.toggle("flip");
    setTimeout(() => {
      e.target.children[0].classList.toggle("hide");
      e.target.style.backgroundColor = e.target.classList[0];
    }, 500);

    if (cardOne["color"] === cardTwo["color"]) {
      let scoreNum = score.innerText.slice(7);

      if (parseInt(scoreNum) < localStorage["scoreCard"]) {
        localStorage.setItem("scoreCard", points);
        //reset algorithm
        flippedCards = 0;
      } else {
        //reset algorithm
        flippedCards = 0;
      }
    } else if (cardOne["color"] !== cardTwo["color"]) {
      //unflip both cards after 5 seconds
      setTimeout(() => {
        cardOne["cardRef"].classList.toggle("flip");
        cardTwo["cardRef"].classList.toggle("flip");
      }, 3000);

      setTimeout(() => {
        cardOne["cardRef"].style.backgroundColor = "black";
        cardOne["cardRef"].children[0].classList.toggle("hide");
        cardTwo["cardRef"].style.backgroundColor = "black";
        cardTwo["cardRef"].children[0].classList.toggle("hide");
        flippedCards = 0;
      }, 4000);
    }
  }
  localStorage.setItem("scoreCard", clicks);
  // you can use event.target to see which element was clicked
  console.log("you just clicked", e.target);
}

//reset points & shuffle cards
//fix bug: on click last two cards are not removed;
function handleNewGameClick(e) {
  highScore.innerText = points;
  for (let iteration = 0; iteration < 1; iteration++) {
    for (let card of gameContainer.children) {
      console.log(card);
      card.remove();
    }
  }

  score.innerText = "matched: 0";
  createDivsForColors(shuffledColors);
}

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
//it creates a logo span & adds to the new div
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    const newSpan = document.createElement("span");
    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    //logo container
    newSpan.classList.add("class", "card-logo");
    addText(newSpan);
    //add logo span to card div
    newDiv.append(newSpan);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);

const newGame = document.querySelector("#new-game");

newGame.addEventListener("click", handleNewGameClick);
