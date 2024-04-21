let score = { wins: 0, losses: 0, ties: 0 };
const buttonAutoPlay = document.getElementById('autoPlayButton');
let isAutoPlay = false;
let intervalId;

document.querySelector('.rock').addEventListener('click', () => {
    playGame('rock');
})

document.querySelector('.paper').addEventListener('click', () => {
    playGame('paper');
})

document.querySelector('.scissors').addEventListener('click', () => {
    playGame('scissors');
})

document.getElementById('resetButton').addEventListener('click', () => {
    showConfirm();
})

document.getElementById('autoPlayButton').addEventListener('click', () => {
    autoPlay();
})

document.getElementById('yesButton').addEventListener('click', () => {
    resetScore();
    hideConfirm();
})

document.getElementById('noButton').addEventListener('click', () => {
    hideConfirm();
})

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock')
    } else if (event.key === 'p') {
        playGame('paper')
    } else if (event.key === 's') {
        playGame('scissors')
    } else if (event.key === 'a') {
        autoPlay();
    }
})

function playGame(playerMove) {
    let computerMove = pickComputerMove();
    let result = '';

    if (score.wins >= 5 || score.ties >= 5 || score.losses >= 5) {
        return
    }

    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You lose the round!';
        } else if (computerMove === 'paper') {
            result = 'You win the round!';
        } else if (computerMove === 'scissors') {
            result = "Tie";
        }

    } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win the round!';
        } else if (computerMove === 'paper') {
            result = "Tie";
        } else if (computerMove === 'scissors') {
            result = 'You lose the round!';
        }

    } else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = "Tie";
        } else if (computerMove === 'paper') {
            result = 'You lose the round!';
        } else if (computerMove === 'scissors') {
            result = 'You win the round!';
        }
    }

    if (result === 'You win the round!') {
        score.wins++;
    } else if (result === 'You lose the round!') {
        score.losses++;
    } else if (result === "Tie") {
        score.ties++;
    }

    document.getElementById('click').innerHTML = `
    <div class='result'>${result}</div>
    <div>You picked ${playerMove}. Computer pick ${computerMove}.</div>
    <div class="reset">Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}</div>`
    document.getElementById('resetButton').classList.add('visible');
    document.getElementById('autoPlayButton').classList.add('visible');
    checkWin();
}


function pickComputerMove() {
    let computerMove = '';
    const randomNumber = Math.random();

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper'
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'scissors'
    }
    return computerMove
}

function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    document.querySelector('.reset').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function autoPlay() {
    if (isAutoPlay) {
        clearInterval(intervalId);
        buttonAutoPlay.innerHTML = 'AutoPlay'
        isAutoPlay = false;
    } else {
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        buttonAutoPlay.innerHTML = 'Stop Playing';
        isAutoPlay = true;
    }
    checkWin();

}

function showConfirm() {
    document.querySelector('.confirm p').classList.add('visible');
    document.getElementById('yesButton').classList.add('visible');
    document.getElementById('noButton').classList.add('visible');
}

function hideConfirm() {
    document.querySelector('.confirm p').classList.remove('visible');
    document.getElementById('yesButton').classList.remove('visible');
    document.getElementById('noButton').classList.remove('visible');
}

function checkWin() {

    if (score.wins === 5) {
        document.querySelector(".result").innerHTML = `You win the game :D`;
    } else if (score.ties === 5) {
        document.querySelector(".result").innerHTML = `It's a tie`;
    } else if (score.losses === 5) {
        document.querySelector(".result").innerHTML = `You lost the game D:`;
    }

    setTimeout(() => {
        if (score.wins === 5 || score.ties === 5 || score.losses === 5) {
            resetScore();
        }
    }, 5000);

}