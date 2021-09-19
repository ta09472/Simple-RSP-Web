// When PlayButton clicked : toggle the page
const toggleThePage = () => {
  document.querySelector('.btn_play').addEventListener('click', () => {
    const container = document.querySelector('.container_title');
    const playBoard = document.querySelector('.play_board');

    container.style.display = 'none';
    playBoard.style.display = 'block';
  })
};

// Get random int for computer's hand to change
const getRandomInt = () => {
  return Math.floor(Math.random() * (3 - 0)) + 0; //최댓값은 제외, 최솟값은 포함
};

// // When clicked RSP Buttons: change player hands and Computer change state
const changeHands = () => {
  const rspList = document.querySelectorAll('div.rsp-selector > button');
  // Player change hand
  rspList.forEach((e) => {
    e.addEventListener('click', () => {
      const playerState = e.innerText.toLowerCase();
      const playerHand = document.querySelector('#player-hand');

      playerHand.setAttribute('src', `image/${playerState}.png`);
      playerHand.dataset.state = playerState;

      // Copmuter change hand (randomly)
      let randomInt = getRandomInt();
      const computerState = rspList[randomInt].innerHTML.toLowerCase();
      const computerHand = document.querySelector('#computer-hand');

      computerHand.setAttribute('src', `image/${computerState}.png`);
      computerHand.dataset.state = computerState;

      judgeMatch();
    })
  })
};

const scoreCounter = winner => {
  let playerScore = document.querySelector('#playerScore');
  let computerScore = document.querySelector('#computerScore');

  if (winner === 'player') {
    playerScore.textContent++;
    playerScore.textContent = playerScore.textContent;
  } else {
    computerScore.textContent++;
    computerScore.textContent = computerScore.textContent;
  }
};

// view result
const viewResult = winner => {
  let result = document.querySelector('.result');

  if (winner === 'player') {
    result.textContent = 'Player Win!';
  }
  else if (winner === 'computer') {
    result.textContent = 'Computer Win...';
  }
  else {
    result.textContent = 'Draw';
  }
};

// Judge the match
const judgeMatch = () => {
  const playerState = document.querySelector('#player-hand').dataset.state;
  const computerState = document.querySelector('#computer-hand').dataset.state;

  // about rock
  if ((playerState === 'rock') & (computerState === 'scissors')) {
    viewResult('player');
    scoreCounter('player');
  }
  else if ((playerState === 'rock') & (computerState === 'rock')) {
    viewResult('draw');
  }
  else if ((playerState === 'rock') & (computerState === 'paper')) {
    viewResult('computer');
    scoreCounter('computer');
  }

  // about scissors
  if ((playerState === 'scissors') & (computerState === 'scissors')) {
    viewResult('draw');
  }
  else if ((playerState === 'scissors') & (computerState === 'rock')) {
    viewResult('computer');
    scoreCounter('computer');
  }
  else if ((playerState === 'scissors') & (computerState === 'paper')) {
    viewResult('player');
    scoreCounter('player');
  }

  // about paper
  if ((playerState === 'paper') & (computerState === 'scissors')) {
    viewResult('computer');
    scoreCounter('computer');
  }
  else if ((playerState === 'paper') & (computerState === 'rock')) {
    viewResult('player');
    scoreCounter('player');
  }
  else if ((playerState === 'paper') & (computerState === 'paper')) {
    viewResult('draw');
  }

};

// function call
toggleThePage();
changeHands();
