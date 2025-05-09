const constants = {
    bricks: document.querySelectorAll('.brick'),
    gameContainer: document.getElementById('game-container'),
    paddle: document.getElementById('paddle'),
    ball: document.getElementById('ball'),
    scoreElement: document.getElementById('score'),
    livesElement: document.getElementById('lives'),
    timerElement: document.getElementById('timer'),
    continueBtn: document.getElementById('continue-btn'),
    restartBtn: document.getElementById('restart-btn'),
    pauseScreen: document.getElementById('pause-screen'),
    endScreen: document.getElementById('end-screen'),
    quitBtn: document.getElementById('quit-btn'),
    startScreen: document.getElementById('start-screen'),
    truequitbtn: document.getElementById('true_quit-btn'),
    restartBtnEnd: document.getElementById('restart-btn-end'),
    quitBtnEnd: document.getElementById('quit-btn-end'),
    continueBtnEnd: document.getElementById('continue-btn-end'),
    gameZone: document.getElementById("gameZone"),
}

// Game Variables
const gameData = {
    score: 0,
    lives: 3,
    timer: 0,
    map: 1,
    gameIsPaused: false,
    ballSpeedX: 1,
    ballSpeedY: 1,
    paddleSpeed: 10,
    ballLaunched: false,
    gameIsReseting: false,
    leftKeyPressed: false,
    rightKeyPressed: false,
    roadmap : [
        [
        ]
    ],
    currentPartIndex: 0,
    gameOver: false,
    storyVictory: false,
}


export {
    constants,
    gameData
};