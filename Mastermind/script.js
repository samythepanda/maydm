// pieces of the game that are globally declared variables so all
// functions can access them
var possibleNumbers = [1, 2, 3, 4, 5, 6];
var answer = ;
var guessCount = 0;
var winner = false;

var guess0;
var guess1;
var guess2;
var guess3;

// HTML elements that will be manipulated by the script
var inputs = document.getElementById("guessInputs");
var instructions = document.getElementById("instructions");
var submit = document.getElementById("submitButton");
var reset = document.getElementById("resetButton");
var guessesElement = document.getElementById("guesses");
var gameResultElement = document.getElementById("gameResult");

function createCode() {
  // answer is an empty array
  answer = [];

  // this loop gets four numbers from possibleNumbers to create the answer
  for (var i = 0; i < 4; i++) {
    // get the index of one of the numbers from possibleNumbers array
    let random = getRandomInt(possibleNumbers.length);
    // add that number to the answers array
    answer.push(possibleNumbers[random]);
    // remove that number from possibleNumbers array
    possibleNumbers.splice([random], 1);
  }
}

function getRandomInt(numberOfElements) {
  // this picks a random number
  // min is 0 and max is the number of elements + 1
  // The maximum is exclusive and the minimum is inclusive
  var min = Math.ceil(0);
  var max = Math.floor(numberOfElements);

  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // parseInt attempts to turn a string into a number.
  // This means "1" becomes 1, and we can operate on it like a number.
  guess0 = parseInt(document.getElementById("guess0").value);
  guess1 = parseInt(document.getElementById("guess1").value);
  guess2 = parseInt(document.getElementById("guess2").value);
  guess3 = parseInt(document.getElementById("guess3").value);

  //  These three variables will be used to count correct numbers;
  //  number existing in the answer but in the wrong spot;
  //  or just plain wrong numbers.
  //  Because they are declared within the function, they will reset
  //  every time the checkGuess function runs.

  var correctNumber = 0;
  var presentNumber = 0;
  var wrongNumber = 0;

  if (guess0 === answer[0]) {
    // if the 1st number in the guess matches the 1st number in the answer,
    // add 1 to correctNumber
    correctNumber++;
  } else if (answer.indexOf(guess0) > 0) {
    // indexOf checks the answer array to see if 1st number is there
    // if the 1st number is in the answer, add 1 to presentNumber
    presentNumber++;
  } else {
    // if number isn't in the answer at all, add 1 to wrongNumber
    wrongNumber++;
  }

  /* Write if/else if/else statements to check the remaining numbers. */
  if (guess1 === answer [1]){
    correctNumber++;
  }
  else if (answer.indexOf(guess1) > 0) {
    presentNumber++;
  } else {
    wrongNumber++;
  }
  
  if (guess2 === answer [2]) {
    correctNumber++;
  }
  else if (answer.indexOf(guess2) > 0) {
    presentNumber++;
  }
  else {
  wrongNumber++;
  }
  
  if (guess3 === answer [3]) {
    correctNumber++;
  }
  else if(answer.indexOf(guess3) > 0) {
    presentNumber++;
  }
  else {
    wrongNumber++;
  }
  // Reset the inputs.
  inputs.reset();
  // Get the HTML code to add the results of the guesses.
  let resultsHTML = checkResults(correctNumber, presentNumber, wrongNumber);
  // Then add guesses & results to page w/ addGuessToPage function.
  addGuessToPage(resultsHTML);
}

function checkResults(correct, present, wrong) {
  // These are the bits of code that will return the results for the
  // submitted guess.
  let correctHTML = `<div class="result correct"></div>`;
  let presentHTML = `<div class="result present"></div>`;
  let wrongHTML = `<div class="result wrong"></div>`;

  let results = ``;

  // If all of the numbers are correct, then no need to go through the rest of
  // this function! Declare a winner and run the showGameResults function!
  if (correct === 4) {
    // we have a winner!
    winner = true;
    // Pass
    showGameResults(winner);
  }

  /*
    Use results += to build the HTML code. You will need to check each
    of the three results (correct, present, and wrong) to see if there that code
    needs to be added. The first one is provided. Write the other if statements.
  */

  if (correct > 0) {
    // The repeat method adds the string the number of specified times. In this
    // case it runs the number of times specified by the "correct" variable.
    results += correctHTML.repeat(correct);
  }
  
  if (present > 0) {
    results+= presentHTML.repeat(present); 
  }
  
  if (wrong > 0) {
    results= wrongHTML.repeat(present);
  }

  return results;
}

function addGuessToPage(results) {
  // This adds the guesses and the results to the page. ${results} is the HTML
  // that we built up in the checkResults function.
  guessesElement.insertAdjacentHTML(
    "beforeend",
    `<div class="guessWrapper d-flex">
      <div class="guessedCode d-flex">
        <div class="d-flex guess">${guess0}</div>
        <div class="d-flex guess">${guess1}</div>
        <div class="d-flex guess">${guess2}</div>
        <div class="d-flex guess">${guess3}</div>
      </div>
      <div class="results d-flex">${results}</div>
    </div>`
  );

  // The player has 10 chances to guess the code. Each time a guess is
  // added to the screen, increase the guessCount by one.
  guessCount++;
  if (guessCount > 10) {
    showGameResults(winner)
  }
  /*
    If there have been 10 guesses, it's time to run the showGameResults function!
    Create the if statement that will check guessCount to see if it's time to run
    the showGameResults function. Pass in the winner variable when you call the
    showGameResults function.
  */
}

function showGameResults(result) {
  if (result) {
    gameResultElement.insertAdjacentHTML("beforeend", "<h2>You broke the code!</h2>");
  } 
  else {
    gameResultElement.insertAdjacentHTML("beforeend", "<h2>Better luck next time!</h2>");
  }
  /*
    This function takes in result, which is passed as the winner variable,
    which is a Boolean. If it's true, we want to show the HTML declaring a winner.
    If winner is false, we show the "Better luck next time" text.

    Write an if/else statement to show the result of the game.
    Winning code: gameResultElement.insertAdjacentHTML("beforeend", "<h2>You broke the code!</h2>");
    Losing code: gameResultElement.insertAdjacentHTML("beforeend", "<h2>Better luck next time!</h2>");
  */

  // show reset button
  reset.classList.remove("hidden");
  // hide instructions & submit button
  submit.classList.add("hidden");
  instructions.classList.add("hidden");

  // show the answer code in order
  document.getElementById("guess0").value = answer[0];
  document.getElementById("guess1").value = answer[1];
  document.getElementById("guess2").value = answer[2];
  document.getElementById("guess3").value = answer[3];
}

function resetGame() {
  // reset the inputs to blanks
  inputs.reset();
  // hide the reset button
  reset.classList.add("hidden");
  // show submit button & instructions
  submit.classList.remove("hidden");
  instructions.classList.remove("hidden");

  // remove last game's guesses & result
  guessesElement.innerHTML = "";
  gameResultElement.innerHTML = "";

  // reset winner to false
  winner = false;
  // reset possible numbers to 1-6
  possibleNumbers = [1, 2, 3, 4, 5, 6];
  // create a new code
  createCode();
}
