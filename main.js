let score = JSON.parse(localStorage.getItem('score')) || {wins: 0, losses: 0, ties: 0};

document.querySelector('.rock').addEventListener('click', () => {
    playGame('rock');
})

document.querySelector('.paper').addEventListener('click', () => {
    playGame('paper');
})

document.querySelector('.scissors').addEventListener('click', () => {
    playGame('scissors');
})

function playGame(playerMove) {
    let computerMove = pickComputerMove();
    let result = '';

    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You lose!';
        } else if (computerMove === 'paper') {
            result = 'You win!';
        } else if (computerMove === 'scissors') {
            result = 'Tie';
        }

    } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win!';
        } else if (computerMove === 'paper') {
            result = 'Tie';
        } else if (computerMove === 'scissors') {
            result = 'You lose!';
        }

    } else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie';
        } else if (computerMove === 'paper') {
            result = 'You lose!';
        } else if (computerMove === 'scissors') {
            result = 'You win!';
        }
    }

    if (result === 'You win!') {
        score.wins++;
    } else if (result === 'You lose!') {
        score.losses++;
    } else if (result === "Tie") {
        score.ties++;
    }

    localStorage.setItem('score', JSON.stringify(score));

    document.getElementById('click').innerHTML = `
    <div class='result'>${result}</div>
    <div>You picked ${playerMove}. Computer pick ${computerMove}.</div>
    <div class="reset">Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}</div>`

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