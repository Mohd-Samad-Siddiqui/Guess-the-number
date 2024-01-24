const form = document.querySelector('form');
let userInput = document.querySelector('input');
const button = document.querySelector('button');
let guessArray = document.querySelector('#guessArray');
const answer = document.querySelector('#correctIncorrect');
const remainingChance = document.querySelector('#remainingChance');
const lessMore = document.querySelector('#lessMore');
const newGame = document.querySelector('#newGame');
let numberOfGuesses = 1;
let remainingGuess = 10;
let playGame = true;
let randomNumGenerator = parseInt(Math.random() * 100 + 1);



form.addEventListener('submit', (e) => {
  e.preventDefault();
  let guess = userInput.value;
  
  if(remainingGuess >= 0){
    guessValidate(guess);
  }else{
    endGame();
  }
  
})

function guessValidate(guess){
  if(guess < 1){
    alert(`${guess} is less than 1, it has to be more than 1.`)
  }
  else if(guess > 100){
      alert(`${guess} is more than 100, it has to be less than 100.`)
    }
  else if(isNaN(guess)){
    alert(`${guess} is invalid number.`)
  }
  else{
    remainingGuess = 10 - numberOfGuesses;
    if(remainingGuess >= 0){
      numberOfGuesses++;
      userInput.value = '';
      checkTheGuess(guess);
    }else{
      endGame(); 
    }
  }
}

function checkTheGuess(guess){
  if(remainingGuess === 9){
    guessArray.innerHTML += guess;
  }else{
    guessArray.innerHTML += `, ${guess}`;
  }

  if(numberOfGuesses === 11 && (guess < randomNumGenerator || guess > randomNumGenerator)){
    correctIncorrect.innerHTML = `You lost the game!!`
    remainingChance.innerHTML = `The right number was ${randomNumGenerator}`;
    lessMore.innerHTML = '';
    endGame();
  }
  else if(guess < randomNumGenerator){
    correctIncorrect.innerHTML = 'Incorrect!!!'
    remainingChance.innerHTML = `You have ${remainingGuess} attemps remaining`;
    lessMore.innerHTML = ": GO HIGH";
  }
  else if(guess > randomNumGenerator){
    correctIncorrect.innerHTML = 'Incorrect!!!'
    remainingChance.innerHTML = `You have ${remainingGuess} attemps remaining`;
    lessMore.innerHTML = ": GO LOW";
  }
  else{
    correctIncorrect.innerHTML = `Correct!!! You're absolutely right. The number was ${guess}`
    remainingChance.innerHTML = '';
    lessMore.innerHTML = '';
    endGame();
  }
}

function endGame(){
  userInput.setAttribute('disabled', ''); 
  playGame = false;
  newGame.style.display = 'block';
  startNewGame();
}

function startNewGame(){
  newGame.addEventListener('click', () => {
    playGame = true;
    userInput.removeAttribute('disabled');
    guessArray.innerHTML = '';
    correctIncorrect.innerHTML = ''
    remainingChance.innerHTML = '';
    lessMore.innerHTML = '';
    randomNumGenerator = parseInt(Math.random() * 100 + 1);
    numberOfGuesses = 1;
    remainingGuess = 10;
    newGame.style.display = 'none';
  })
}