import {
    gameData,
    constants
} from "./constantsControllers.js";
import {
    checkBrickCollisions,
    replaceBricks
} from "./bricksControllers.js";
import {
    checkPaddleCollision,
    checkBallCollision,
    handleUserInput,
    moveBall,
    resetBallAndPaddle
} from "./ballPaddleControllers.js";
import {
    mapStory
} from "./mapControllers.js";
import {victoryMapStory, gameOver} from "./storyController.js";


let fpsCounter = document.getElementById('fps-counter');
let fps = 0;
let frameCount = 0;
let lastSecond = performance.now();

function resetGame() {
    document.body.style = "background-color: #f0f0f0;"
    gameData.score = 0;
    gameData.lives = 3;
    gameData.timer = 0;
    seconds = 0;
    minutes = 0
    constants.timerElement.textContent = `Time: 00:00`

    resetBallAndPaddle();
    replaceBricks();

    frameCount = 0;
    lastSecond = performance.now();
}

function pauseGame() {
    constants.gameIsPaused = true;
    document.body.style = "background-color: rgba(68, 63, 63, 0.8);"
    constants.gameContainer.classList.add('paused');
    constants.pauseScreen.classList.remove('hidden');
    constants.restartBtn.addEventListener('click', handleRestart);
    constants.continueBtn.addEventListener('click', handleContinue);
    constants.quitBtn.addEventListener('click', handleQuit);
}

function resumeGame() {
    constants.gameIsPaused = false;
    document.body.style = "background-color: #f0f0f0;"
    constants.gameContainer.classList.remove('paused');
    constants.pauseScreen.classList.add('hidden');
    constants.endScreen.classList.add('hidden');
    constants.restartBtn.removeEventListener('click', handleRestart);
    constants.continueBtn.removeEventListener('click', handleContinue);
    constants.quitBtn.removeEventListener('click', handleQuit);
    constants.restartBtnEnd.removeEventListener('click', handleRestart);
    // constantsControllers.constants.continueBtnEnd.removeEventListener('click', handleContinue);
    constants.quitBtnEnd.removeEventListener('click', handleQuit);
    constants.gameContainer.style.backgroundColor = ''

    frameCount = 0;
    lastSecond = performance.now();

    requestAnimationFrame(gameLoop);
}

function initializeGame() {
    resetGame();
    replaceBricks();
    setupEventListeners();

    // updateTimer()
    gameLoop();
}

function victoryNewMap() {
    document.body.style = "background-color: #f0f0f0;"

    const intervalleMap = document.getElementById('intervalleMap')
    gameData.map += 1
    document.getElementById('niveauMap').innerText = "Map " + gameData.map
    intervalleMap.classList.remove('hidden')
    constants.paddle.classList.add('hidden')
    constants.ball.classList.add('hidden')
    constants.scoreElement.classList.add('hidden')
    constants.livesElement.classList.add('hidden')
    constants.timerElement.classList.add('hidden')
    constants.bricks.forEach(brick => {
        brick.classList.add('hidden');
      });

    setTimeout(function () {
        intervalleMap.classList.add('hidden')
        constants.paddle.classList.remove('hidden')
        constants.ball.classList.remove('hidden')
        constants.scoreElement.classList.remove('hidden')
        constants.livesElement.classList.remove('hidden')
        constants.timerElement.classList.remove('hidden')
        constants.bricks.forEach(brick => {
            brick.classList.remove('hidden');
          });

        resetBallAndPaddle();
        replaceBricks();
        resumeGame()

    }, 1000);
}

function endGame() {
    const RemainingBricks = document.querySelectorAll('.brick').length - document.querySelectorAll('.brickGrey').length;

    if (RemainingBricks === 0 || gameData.lives <= 0) {
        constants.gameIsPaused = true;
        constants.gameContainer.classList.add('paused');
        //constants.endScreen.classList.remove('hidden');

        if (gameData.roadmap === mapStory) {
            if (gameData.lives === 0) {
                //game over
                gameOver()
    
            } else {
                //new map
                victoryMapStory()
            }
        }else {
            if (gameData.lives === 0) {
                //game over
                document.getElementById('gameOver').classList.remove('hidden')
    
            } else {
                //new map
                victoryNewMap()
            }
        }
        

    }
}

function setupEventListeners() {
    constants.continueBtn.addEventListener('click', () => {
        constants.gameIsPaused = false;
        constants.pauseScreen.classList.add('hidden');
    });

    constants.restartBtn.addEventListener('click', () => {
        resetGame();
        constants.pauseScreen.classList.add('hidden');
    });

    // Event listener for pausing the game
    document.addEventListener('keydown', (event) => {
        if (event.key === ('Escape' || 'Enter')  && gameData.currentPartIndex != 0) {
        }
        if (event.key === ('Escape' || 'Enter')) {
            pauseGame();
        }

    });
}

function checkWallCollisions(newLeft) {
    const ballRight = newLeft + ball.offsetWidth;

    // Si le ballon atteint le bord gauche ou droit, inverser la direction horizontale
    if (newLeft < 0 || ballRight > constants.gameContainer.offsetWidth) {
        // Correction pour éviter les problèmes de déplacement lorsqu'il y a une collision
        constants.ball.style.left = (newLeft < 0) ? '0px' : (constants.gameContainer.offsetWidth - ball.offsetWidth) + 'px';
        gameData.ballSpeedX = -gameData.ballSpeedX;
    }
}

function renderGameElements() {
    constants.scoreElement.textContent = `Score: ${gameData.score}`;
    constants.livesElement.textContent = `Lives: ${gameData.lives}`;
    // constants.timerElement.textContent = `Time: ${gameData.timer}`;
}

function updateGameState() {
    moveBall();
    checkBallCollision();
    checkBrickCollisions();
    checkPaddleCollision();
}

let seconds = 0;
let minutes = 0

function updateTimer() {

    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    constants.timerElement.textContent = `Time: ${formattedTime}`

}

var lastFrameTime = 0;
var fpsInterval = 1000 / 60; // 60 FPS

function gameLoop(currentTime) {
    if (!constants.gameIsPaused) {
        var elapsedTime = currentTime - lastFrameTime;

        // Vérifier si le temps écoulé est supérieur ou égal à l'interval FPS
        if (elapsedTime > fpsInterval) {
            lastFrameTime = currentTime - (elapsedTime % fpsInterval);

            // Vos opérations de jeu ici
            frameCount++;
            if (frameCount % 60 === 0) updateTimer();
            updateGameState();
            handleUserInput();
            renderGameElements();
            updateFPSCounter();

            // Appel récursif pour la prochaine trame d'animation
            requestAnimationFrame(gameLoop);
        } else {
            // Si le temps écoulé est inférieur à l'interval, attendre la prochaine trame
            requestAnimationFrame(gameLoop);
        }
    }
}

function updateFPSCounter() {

    const currentTime = performance.now();
    const deltaTime = currentTime - lastSecond;

    if (deltaTime >= 1000) { // Si une seconde s'est écoulée
        fps = Math.round((frameCount * 1000) / deltaTime); // Calcul du nombre de FPS
        fpsCounter.textContent = `FPS: ${fps}`; // Mise à jour du compteur de FPS
        frameCount = 0; // Réinitialiser le compteur de frames
        lastSecond = currentTime; // Mise à jour du dernier temps
    }
}

const handleRestart = () => {
    resetGame();
    resumeGame()
}
const handleContinue = () => resumeGame();
const handleQuit = () => window.close();

const fetchTop10 = function () {
    fetch('http://localhost:8080/api/leaderboard/top10')
        .then(response => response.json())
        .then(data => {
            const leaderboardList = document.getElementById('leaderboard-list');
            leaderboardList.innerHTML = "";
            let i = 1;
            // Parcourez les données et ajoutez-les à la liste HTML
            data.forEach(user => {
                const line = document.createElement('tr');
                line.className = 'leaderboard-line'
                leaderboardList.appendChild(line);

                const position = document.createElement('td');
                line.appendChild(position);
                const player = document.createElement('td');
                line.appendChild(player);
                const score = document.createElement('td');
                line.appendChild(score);

                position.innerText = i;
                player.innerHTML = user.username;
                score.innerHTML = user.score;
                i++;
            });
        })
        .catch(error => console.error('Erreur lors de la récupération des données:', error));
}

export {
    resetGame,
    pauseGame,
    resumeGame,
    initializeGame,
    endGame,
    setupEventListeners,
    checkWallCollisions,
    handleContinue,
    handleQuit,
    handleRestart,
    fetchTop10,
    victoryNewMap

};