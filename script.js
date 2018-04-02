let playerChoice;
let compChoice;
// 0 | 1 | 2
// ---------
// 3 | 4 | 5
// ---------
// 6 | 7 | 8
let currentlyPlayerTurn = false;
let testing = true;

function setupGame() {  
  console.log('setupGame()');
  document.getElementById('pickXO').style.display = 'none';
  // Clear board
  for (i=0, e=document.getElementsByClassName('space'),len=e.length;i<len;i++) {
    e[i].style.display = 'block';
  }
  beginGame();
}

function testBeginGame() {
  console.log('testing beginGame() and minimax()');
  // Clear board
  let boardArray = [];
  for (i=0,len=document.getElementsByClassName('space').length;i<len;i++) {
    document.getElementsByClassName('space')[i].innerHTML = '';    
  }
  boardArray = ['O','X','O','O','X','O','','','O'];
  console.log(testMinimax(boardArray, true));
}

function clickOnSpace(spaceElement) {
  console.log('clickOnSpace('+spaceElement+')');
  if (currentlyPlayerTurn) {    
    if (spaceElement.innerHTML === '') {
      spaceElement.innerHTML = playerChoice;
      currentlyPlayerTurn = false;
      console.log('checking if someone won:');
      if (someoneWon()) {
        console.log('someone did win');
        console.log('it was '+someoneWon());
        scoreAndNewGame();
      }
      else {
        compTurn();
      }
    }
  }
}

function gameWon() {
  console.log('gameWon()');
  if (currentlyPlayerTurn) {
    console.log('Player wins');
    beginGame();
  }
  else {
    console.log('Computer wins');
    beginGame();
  }
}

function compTurn() {
  console.log('compTurn()');
  let boardArray = [];
  for (i=0,len=document.getElementsByClassName('space').length;i<len;i++) {
    boardArray = document.getElementsByClassName('space')[i].innerHTML;
  }
  document.getElementsByClassName('space')[minimax(boardArray, true)[1]].innerHTML = compChoice;
  if (someoneWon()) {
    console.log('someone did win');
    console.log('it was '+someoneWon());
    scoreAndNewGame();
  }
  else {
    currentlyPlayerTurn = true;
  }
}

function minimax(boardArray, computerIsGoing) {
  console.log('minimax('+boardArray+', '+computerIsGoing+')');
  // computer wants to maximize this value, player wants to minimize
  if (!boardArray.includes('') || someoneWon(boardArray)) {
    if (someoneWon(boardArray) === playerChoice) {
      return [-1, undefined];      
    }
    else if (someoneWon(boardArray) === compChoice) {
      return [1, undefined];
    }
    else {
      return [0, undefined];
    }
  }
  else {
    let bestValue; // Array of two: 1. heuristic value of next move. 2. position to go for in next move.
    let nextMove;
    let nextBoardState;
    if (computerIsGoing) {
      bestValue = [-10, undefined];
      for (i=0;i<9;i++) {
        if (boardArray[i]==='') {
          nextBoardState = boardArray.slice(0);
          nextBoardState[i] = compChoice;
          nextMove = minimax(nextBoardState, false);   
          if (bestValue[0] < nextMove[0]) {
            bestValue = nextMove.slice(0);
          }
        }
      }
    }
    else {
      bestValue = [10, undefined];
      for (i=0;i<9;i++) {
        if (boardArray[i]==='') {
          nextBoardState = boardArray.slice(0);
          nextBoardState[i] = playerChoice;
          nextMove = minimax(nextBoardState, true);   
          if (bestValue[0] > nextMove[0]) {
            bestValue = nextMove.slice(0);
          }
        }
      }
    }
    return bestValue;
  }
}

function someoneWon(boardArray) {
  console.log('someoneWon()');
  let s = [];
  for (i=0;i<9;i++) {
    s[i] = document.getElementsByClassName('space')[i].innerHTML;
  }

  if (boardArray) {
    s = boardArray;
  }
  
  if ((s[0]===s[1] && s[1]===s[2] && s[0]!=='') ||
       (s[0]===s[3] && s[3]===s[6] && s[0]!=='')) {
    return s[0];
  }
  else if ((s[3]===s[4] && s[4]===s[5] && s[3]!=='') ||
            (s[1]===s[4] && s[4]===s[7] && s[1]!=='') ||
            (s[2]===s[4] && s[4]===s[6] && s[2]!=='') ||
            (s[0]===s[4] && s[4]===s[8] && s[0]!=='')) {
    return s[4];
  }
  else if ((s[6]===s[7] && s[7]===s[8] && s[6]!=='') ||
           (s[2]===s[5] && s[5]===s[8] && s[2]!=='')) {    
    return s[8];
  }
  else {
    return false;
  }
}

function scoreAndNewGame() {
  console.log('scoreAndNewGame()');
}

for (i=0,len=document.getElementsByClassName('space').length;i<len;i++) {
  document.getElementsByClassName('space')[i].addEventListener('click',(e) => {
    clickOnSpace(e.target);
  });
  document.getElementsByClassName('space')[i].style.display = 'none';
}

document.getElementsByClassName('choices')[0].addEventListener('click', () => {
  playerChoice = 'X';  
  compChoice = 'X';
  setupGame();
});

document.getElementsByClassName('choices')[1].addEventListener('click', () => {
  playerChoice = 'O';  
  compChoice = 'X';
  setupGame();
});
/*
function compGoForWinOrBlock(s, choice) {
  console.log(s);
  if (s[0]===''&& (
     (s[1]===s[2]&&s[1]===choice) ||
     (s[3]===s[6]&&s[3]===choice) ||
     (s[4]===s[8]&&s[4]===choice))) {
    document.getElementsByClassName('space')[0].innerHTML=compChoice;
  }
  else if (s[1]===''&& (
          (s[0]===s[2]&&s[0]===choice) ||
          (s[4]===s[7]&&s[4]===choice))) {
    document.getElementsByClassName('space')[1].innerHTML=compChoice;
  }
  else if (s[2]===''&& (
     (s[0]===s[1]&&s[0]===choice) ||
     (s[4]===s[6]&&s[4]===choice) ||
     (s[5]===s[8]&&s[5]===choice))) {
    document.getElementsByClassName('space')[2].innerHTML=compChoice;
  }
  else if (s[3]===''&& (
          (s[4]===s[5]&&s[4]===choice) ||
          (s[0]===s[6]&&s[0]===choice))) {
    document.getElementsByClassName('space')[3].innerHTML=compChoice;
  }
  else if (s[4]===''&& (
          (s[1]===s[7]&&s[1]===choice) ||
          (s[3]===s[5]&&s[3]===choice) ||
          (s[0]===s[8]&&s[0]===choice) ||  
          (s[2]===s[6]&&s[2]===choice))) {
    document.getElementsByClassName('space')[4].innerHTML=compChoice;
  }
  else if (s[5]===''&& (
          (s[2]===s[8]&&s[2]===choice) ||
          (s[3]===s[4]&&s[3]===choice))) {
    document.getElementsByClassName('space')[5].innerHTML=compChoice;
  }
  else if (s[6]===''&& (
          (s[0]===s[3]&&s[0]===choice) ||
          (s[7]===s[8]&&s[7]===choice) ||
          (s[2]===s[4]&&s[2]===choice))) {
    document.getElementsByClassName('space')[6].innerHTML=compChoice;
  }
  else if (s[7]===''&& (
          (s[1]===s[4]&&s[1]===choice) ||
          (s[6]===s[8]&&s[6]===choice))) {
    document.getElementsByClassName('space')[7].innerHTML=compChoice;
  }
  else if (s[8]===''&& (
          (s[2]===s[5]&&s[2]===choice) ||
          (s[6]===s[7]&&s[6]===choice) ||
          (s[0]===s[4]&&s[0]===choice))) {
    document.getElementsByClassName('space')[8].innerHTML=compChoice;
  }
}

function compFork(s, choice, pChoice) {
  let numOfElements = s.join('').length;
  if (s[4]===choice) {
    if (s[0]===choice&&s[8]===pChoice) {
      if (s[1]===pChoice) {
        s[6] = choice;
      }
      else if (s[3]===pChoice) {
        s[2] = choice;
      }
    }
    else if (s[2]===choice&&s[6]===pChoice) {
      if (s[1]===pChoice) {
        s[8] = choice;
      }
      else if (s[5]===pChoice) {
        s[0] = choice;
      }
    }
    else if (s[6]===choice&&s[2]===pChoice) {
      if (s[3]===pChoice) {
        s[8] = choice;
      }
      else if (s[7]===pChoice) {
        s[0] = choice;
      }
    }
    else if (s[8]===choice&&s[0]===pChoice) {
      if (s[5]===pChoice) {
        s[6] = choice;
      }
      else if (s[7]===pChoice) {
        s[2] = choice;
      }
    }
  }
  
}
*/
/*
function checkWinState() {
  let s = [];
  for (i=0;i<9;i++) {
    s[i] = document.getElementsByClassName('space')[i].innerHTML;
  }
  console.log(s);
  if ( (s[0]===s[1] && s[1]===s[2] && s[0]!=='') ||
       (s[3]===s[4] && s[4]===s[5] && s[3]!=='') ||
       (s[6]===s[7] && s[7]===s[8] && s[6]!=='') ||
       (s[0]===s[3] && s[3]===s[6] && s[0]!=='') ||
       (s[1]===s[4] && s[4]===s[7] && s[1]!=='') ||
       (s[2]===s[5] && s[5]===s[8] && s[2]!=='') ||
       (s[0]===s[4] && s[4]===s[8] && s[0]!=='') ||
       (s[2]===s[4] && s[4]===s[6] && s[2]!=='')) {    
    gameWon();
  }
  else if (currentlyPlayerTurn) {
    currentlyPlayerTurn = false;
    compTurn();
  }
  else {
    currentlyPlayerTurn = true;    
  }
}
*/
/*
function compTurn() {
  let boardArray = [];
  for (i=0;i<9;i++) {
    boardArray[i] = document.getElementsByClassName('space')[i].innerHTML;
  }
  compGoForWinOrBlock(boardArray, compChoice); // If there's a chance to win, comp will go for it
  compGoForWinOrBlock(boardArray, playerChoice); // If player might win, comp will block
  
  compFork(boardArray, compChoice, playerChoice)
  
  checkWinState();
}
*/