let playerSymbol;
let compSymbol;
// 0 | 1 | 2
// ---------
// 3 | 4 | 5
// ---------
// 6 | 7 | 8
let currentlyPlayerTurn = false;
let testing = true;
let compHasPlayed;

function setupGame() {
  console.log('setupGame()');
  document.getElementById('pickXO').style.display = 'none';
  // Clear board
  for ( i=0,  e=document.getElementsByClassName('space');i<9;i++) {
    e[i].style.display = 'block';
  }
  beginGame();
}

function beginGame() {
  // Clear board
  for (i=0;i<9;i++) {
    document.getElementsByClassName('space')[i].innerHTML = '';    
  }
  if (Math.random() > 0.5) {
    currentlyPlayerTurn = true;
  }
  else {
    compTurn();
  }
}

function clickOnSpace(spaceElement) {
  console.log('clickOnSpace('+spaceElement+')');
  if (currentlyPlayerTurn && spaceElement.innerHTML === '') {    
    spaceElement.innerHTML = playerSymbol;
    compHasPlayed = false;
    console.log('checking if game is over:');
    checkVictorAndNextState();
  }
}

function compTurn() {
  console.log('compTurn()');  
  let currentBoardArray = [];
  for (i=0,len=document.getElementsByClassName('space').length;i<len;i++) {
    currentBoardArray[i] = document.getElementsByClassName('space')[i].innerHTML;
  }
  winOrBlockWin(currentBoardArray, compSymbol); // Go for the win
  winOrBlockWin(currentBoardArray, playerSymbol); // Block player's win
  createFork(currentBoardArray); // Go for a fork
  blockFork(currentBoardArray); // Block player's fork attempt
  markCenter(currentBoardArray);
  oppositeCorner(currentBoardArray);
  emptyCorner(currentBoardArray);
  emptySide(currentBoardArray);
  checkVictorAndNextState();
}

function checkBoardUpdate(array) {
  for (i=0;i<9;i++) {
    if (array[i]!==document.getElementsByClassName('space')[i].innerHTML) {
      compHasPlayed = true;
    }
  }
}

function winOrBlockWin(boardArray, keySymbol) {
  if (!compHasPlayed) {
    console.log('winOrBlockWin()');
    if (keySymbol==='X') {
      otherSymbol = 'O';
    }
    else if (keySymbol==='O') {
      othersymbol = 'X';
    }
    else {
      console.log('Error in winOrBlock()');
    }

    s=boardArray.slice(0); // just to make the next section a little easier on the eyes

    if (s[0]===''&& (
      (s[1]===s[2]&&s[1]===keySymbol) ||
      (s[3]===s[6]&&s[3]===keySymbol) ||
      (s[4]===s[8]&&s[4]===keySymbol))) {
      document.getElementsByClassName('space')[0].innerHTML=compSymbol;
    }
    else if (s[1]===''&& (
            (s[0]===s[2]&&s[0]===keySymbol) ||
            (s[4]===s[7]&&s[4]===keySymbol))) {
      document.getElementsByClassName('space')[1].innerHTML=compSymbol;
    }
    else if (s[2]===''&& (
        (s[0]===s[1]&&s[0]===keySymbol) ||
        (s[4]===s[6]&&s[4]===keySymbol) ||
        (s[5]===s[8]&&s[5]===keySymbol))) {
      document.getElementsByClassName('space')[2].innerHTML=compSymbol;
    }
    else if (s[3]===''&& (
            (s[4]===s[5]&&s[4]===keySymbol) ||
            (s[0]===s[6]&&s[0]===keySymbol))) {
      document.getElementsByClassName('space')[3].innerHTML=compSymbol;
    }
    else if (s[4]===''&& (
            (s[1]===s[7]&&s[1]===keySymbol) ||
            (s[3]===s[5]&&s[3]===keySymbol) ||
            (s[0]===s[8]&&s[0]===keySymbol) ||  
            (s[2]===s[6]&&s[2]===keySymbol))) {
      document.getElementsByClassName('space')[4].innerHTML=compSymbol;
    }
    else if (s[5]===''&& (
            (s[2]===s[8]&&s[2]===keySymbol) ||
            (s[3]===s[4]&&s[3]===keySymbol))) {
      document.getElementsByClassName('space')[5].innerHTML=compSymbol;
    }
    else if (s[6]===''&& (
            (s[0]===s[3]&&s[0]===keySymbol) ||
            (s[7]===s[8]&&s[7]===keySymbol) ||
            (s[2]===s[4]&&s[2]===keySymbol))) {
      document.getElementsByClassName('space')[6].innerHTML=compSymbol;
    }
    else if (s[7]===''&& (
            (s[1]===s[4]&&s[1]===keySymbol) ||
            (s[6]===s[8]&&s[6]===keySymbol))) {
      document.getElementsByClassName('space')[7].innerHTML=compSymbol;
    }
    else if (s[8]===''&& (
            (s[2]===s[5]&&s[2]===keySymbol) ||
            (s[6]===s[7]&&s[6]===keySymbol) ||
            (s[0]===s[4]&&s[0]===keySymbol))) {
      document.getElementsByClassName('space')[8].innerHTML=compSymbol;
    }
    checkBoardUpdate(boardArray);
  }
}

function createFork(boardArray) {
  if (!compHasPlayed) {
    console.log('createFork()');
    let s = boardArray.slice(0);
    if (s.join('').length===4&&s[4]===compSymbol) {    
      if (s[0]===compSymbol&&s[8]===playerSymbol) {
        if (s[1]===playerSymbol) {
          document.getElementsByClassName('space')[6].innerHTML = compSymbol;
        }
        else if (s[3]===playerSymbol) {
          document.getElementsByClassName('space')[2].innerHTML = compSymbol;
        }
      }
      else if (s[2]===compSymbol&&s[6]===playerSymbol) {
        if (s[1]===playerSymbol) {
          document.getElementsByClassName('space')[8].innerHTML = compSymbol;
        }
        else if (s[5]===playerSymbol) {
          document.getElementsByClassName('space')[0].innerHTML = compSymbol;
        }
      }
      else if (s[6]===compSymbol&&s[2]===playerSymbol) {
        if (s[3]===playerSymbol) {
          document.getElementsByClassName('space')[8].innerHTML = compSymbol;
        }
        else if (s[7]===playerSymbol) {
          document.getElementsByClassName('space')[0].innerHTML = compSymbol;
        }
      }
      else if (s[8]===compSymbol&&s[0]===playerSymbol) {
        if (s[5]===playerSymbol) {
          document.getElementsByClassName('space')[6].innerHTML = compSymbol;
        }
        else if (s[7]===playerSymbol) {
          document.getElementsByClassName('space')[2].innerHTML = compSymbol;
        }
      }
    }
    else if (s.join('').length===2&&s[4]===compSymbol) {
      if (s[1]===playerSymbol) {
        if (Math.random()>0.5) {
          document.getElementsByClassName('space')[6].innerHTML = compSymbol;
        }
        else {
          document.getElementsByClassName('space')[8].innerHTML = compSymbol;
        }
      }
      else if (s[3]===playerSymbol) {
        if (Math.random()>0.5) {
          document.getElementsByClassName('space')[2].innerHTML = compSymbol;
        }
        else {
          document.getElementsByClassName('space')[8].innerHTML = compSymbol;
        }
      }
      else if (s[5]===playerSymbol) {
        if (Math.random()>0.5) {
          document.getElementsByClassName('space')[0].innerHTML = compSymbol;
        }
        else {
          document.getElementsByClassName('space')[6].innerHTML = compSymbol;
        }
      }
      else if (s[7]===playerSymbol) {
        if (Math.random()>0.5) {
          document.getElementsByClassName('space')[0].innerHTML = compSymbol;
        }
        else {
          document.getElementsByClassName('space')[2].innerHTML = compSymbol;
        }
      }
    }
    checkBoardUpdate(boardArray);
  }
}

function blockFork(boardArray) {
  if (!compHasPlayed) {
    console.log('blockFork()');
    let s=boardArray.slice(0);
    if (s.join('').length===3&&s[4]===compSymbol) {
      if (s[0]+s[8]===playerSymbol.repeat(2)) {
        if (Math.random()>0.5) {
          document.getElementsByClassName('space')[1].innerHTML = compSymbol;
        }
        else {
          document.getElementsByClassName('space')[7].innerHTML = compSymbol;
        }
      }
      else if (s[2]+s[6]===playerSymbol.repeat(2)) {
        if (Math.random()>0.5) {
          document.getElementsByClassName('space')[3].innerHTML = compSymbol;
        }
        else {
          document.getElementsByClassName('space')[5].innerHTML = compSymbol;
        }
      }
      else if (s[1]+s[2]+s[3]+s[6]===playerSymbol.repeat(2)) {
        document.getElementsByClassName('space')[0].innerHTML = compSymbol;
      }
      else if (s[0]+s[1]+s[5]+s[8]===playerSymbol.repeat(2)) {
        document.getElementsByClassName('space')[2].innerHTML = compSymbol;
      }
      else if (s[0]+s[3]+s[7]+s[8]===playerSymbol.repeat(2)) {
        document.getElementsByClassName('space')[6].innerHTML = compSymbol;
      }
      else if (s[2]+s[5]+s[6]+s[7]===playerSymbol.repeat(2)) {
        document.getElementsByClassName('space')[8].innerHTML = compSymbol;
      }

    }
    else if (s.join('').length===3&&s[4]===playerSymbol) {
      if (s[0]===playerSymbol||s[8]===playerSymbol) {
        if (Math.random()>0.5) {
          document.getElementsByClassName('space')[6].innerHTML = compSymbol;        
                  }
                  else {
          document.getElementsByClassName('space')[2].innerHTML = compSymbol;   
        }
      }
      else if (s[2]===playerSymbol||s[6]===playerSymbol) {
        if (Math.random()>0.5) {
          document.getElementsByClassName('space')[0].innerHTML = compSymbol;        
        }
        else {
          document.getElementsByClassName('space')[8].innerHTML = compSymbol;   
        }
      }
    }
    checkBoardUpdate(boardArray);
  }
}

function markCenter(boardArray) {
  if (!compHasPlayed) {
    console.log('markCenter()');
    if (boardArray[4]==='') {
      document.getElementsByClassName('space')[4].innerHTML = compSymbol;
    }
    checkBoardUpdate(boardArray);
  }
}

function oppositeCorner(boardArray) {
  if (!compHasPlayed) {
    console.log('oppositeCorner()');
    if (boardArray[0]+boardArray[4]===playerSymbol+compSymbol) {
      document.getElementsByClassName('space')[8].innerHTML = compSymbol;
    }
    else if (boardArray[2]+boardArray[4]===playerSymbol+compSymbol) {
      document.getElementsByClassName('space')[6].innerHTML = compSymbol;
    }
    else if (boardArray[6]+boardArray[4]===playerSymbol+compSymbol) {
      document.getElementsByClassName('space')[2].innerHTML = compSymbol;
    }
    else if (boardArray[8]+boardArray[4]===playerSymbol+compSymbol) {
      document.getElementsByClassName('space')[0].innerHTML = compSymbol;
    }    
    checkBoardUpdate(boardArray);
  }
}

function emptyCorner(boardArray) {
  if (!compHasPlayed) {
    console.log('emptyCorner()');
    if (boardArray[0]==='') {
      document.getElementsByClassName('space')[0].innerHTML = compSymbol;
    }
    else if (boardArray[2]==='') {
      document.getElementsByClassName('space')[2].innerHTML = compSymbol;
    }
    else if (boardArray[6]==='') {
      document.getElementsByClassName('space')[6].innerHTML = compSymbol;
    }
    else if (boardArray[8]==='') {
      document.getElementsByClassName('space')[8].innerHTML = compSymbol;
    }
    checkBoardUpdate(boardArray);
  }
}

function emptySide(boardArray) {
  if (!compHasPlayed) {
    console.log('emptySide()');
    if (boardArray[1]==='') {
      document.getElementsByClassName('space')[1].innerHTML = compSymbol;
    }
    else if (boardArray[3]==='') {
      document.getElementsByClassName('space')[3].innerHTML = compSymbol;
    }
    else if (boardArray[5]==='') {
      document.getElementsByClassName('space')[5].innerHTML = compSymbol;
    }
    else if (boardArray[7]==='') {
      document.getElementsByClassName('space')[7].innerHTML = compSymbol;
    }
    checkBoardUpdate(boardArray);
  }
}

function checkVictorAndNextState() {
  console.log('checkVictorAndNextState()');
  if (gameVictor()) {
    console.log('The winner was '+gameVictor());
    scoreAndNewGame();
  }
  else if (currentlyPlayerTurn) {
    currentlyPlayerTurn = false;
    compTurn();
  } else {
    currentlyPlayerTurn = true;
  }
}

function gameVictor(boardArray) {
  console.log('gameVictor()');
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
  else if (!s.includes('')) {
    return 'draw';
  }
  else {
    return false;
  }
}

function scoreAndNewGame() {
  console.log('scoreAndNewGame()');
  beginGame();
}

for (i=0,len=document.getElementsByClassName('space').length;i<len;i++) {
  document.getElementsByClassName('space')[i].addEventListener('click',(e) => {
    clickOnSpace(e.target);
  });
  document.getElementsByClassName('space')[i].style.display = 'none';
}

document.getElementsByClassName('choices')[0].addEventListener('click', () => {
  playerSymbol = 'X';  
  compSymbol = 'O';
  setupGame();
});

document.getElementsByClassName('choices')[1].addEventListener('click', () => {
  playerSymbol = 'O';  
  compSymbol = 'X';
  setupGame();
});
/*

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
  
}*/