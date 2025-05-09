import {
    gameData,
    constants
} from "./constantsControllers.js";
import {
    endGame,
    checkWallCollisions
} from "./game.js";


function checkPaddleCollision() {
    const paddleTop = constants.paddle.offsetTop;
    const paddleBottom = paddleTop + constants.paddle.offsetHeight;
    const paddleLeft = constants.paddle.offsetLeft;
    const paddleRight = paddleLeft + constants.paddle.offsetWidth;

    const ballTop = constants.ball.offsetTop;
    const ballBottom = ballTop + constants.ball.offsetHeight;
    const ballLeft = constants.ball.offsetLeft;
    const ballRight = ballLeft + constants.ball.offsetWidth;

    // Check vertical collision with paddle
    if (ballBottom >= paddleTop && ballTop <= paddleBottom) {
        // Check horizontal collision with paddle
        if (ballRight >= paddleLeft && ballLeft <= paddleRight) {
            if (gameData.ballSpeedY > 0) {
                // If the ball is moving downward, reverse its vertical direction
                gameData.ballSpeedY = -gameData.ballSpeedY;
            } else {
                // If the ball is moving upward, adjust its position to avoid getting stuck
                constants.ball.style.top = `${paddleTop - constants.ball.offsetHeight}px`;
            }
            
            gameData.ballSpeedX = calculateBallPaddleCollisionSpeed();
        }
    }
}

function calculateBallPaddleCollisionSpeed() {
    const paddleWidth = constants.paddle.offsetWidth;
    const paddleCenterX = constants.paddle.offsetLeft + paddleWidth / 2;
    const ballCenterX = constants.ball.offsetLeft + constants.ball.offsetWidth / 2;

    // Calculate the percentage of distance from the paddle center
    const distancePercentage = (ballCenterX - paddleCenterX) / (paddleWidth / 2);

    // Set a maximum speed for better gameplay
    const maxSpeed = 5;

    // Calculate the new speed based on the distance percentage
    return distancePercentage * maxSpeed;
}

function handleBallOutOfBounds() {
    gameData.lives--;

    if (gameData.lives <= 0) {
        endGame();
    } else {
        resetBallAndPaddle();
    }
}

function checkBallCollision() {
    const ballTop = constants.ball.offsetTop;
    const ballLeft = constants.ball.offsetLeft;

    if (ballTop < 0) {
        gameData.ballSpeedY = -gameData.ballSpeedY;
    }

    if (ballLeft < 0 || ballLeft + constants.ball.offsetWidth > constants.gameContainer.offsetWidth) {
        gameData.ballSpeedX = -gameData.ballSpeedX;
    }
}

function moveBall() {

    //La balle reste sur le 'rebondisseur' si je ne l'ai pas lancé.
    if (!gameData.ballLaunched) {
        constants.ball.style.top = ((constants.paddle.offsetTop - constants.ball.offsetHeight)) + 'px';
        constants.ball.style.left = (constants.paddle.offsetLeft + (constants.paddle.offsetWidth - constants.ball.offsetWidth) / 2) + 'px';
        return   
    }

    const currentTop = constants.ball.offsetTop;
    const currentLeft = constants.ball.offsetLeft;

    // Calculer les nouvelles coordonnées du ballon en fonction de la vitesse
    const speedMagnitude = Math.sqrt(gameData.ballSpeedX ** 2 + gameData.ballSpeedY ** 2);
    const speedMultiplier = 7; // La vitesse de la balle, important sinon escargot
    const normalizedSpeedX = (gameData.ballSpeedX / speedMagnitude) * speedMultiplier;
    const normalizedSpeedY = (gameData.ballSpeedY / speedMagnitude) * speedMultiplier;

    const newTop = currentTop + normalizedSpeedY;
    const newLeft = currentLeft + normalizedSpeedX;

    // Mettre à jour la position du ballon
    constants.ball.style.top = newTop + 'px';
    constants.ball.style.left = newLeft + 'px';

    // Vérifier si le ballon est sorti en bas de l'écran
    if (newTop + constants.ball.offsetHeight > constants.gameContainer.offsetHeight) {
        handleBallOutOfBounds();
    }

    // Vérifier les collisions avec les bords gauche et droit
    checkWallCollisions(newLeft);
}

function handleUserInput() {
    if (gameData.leftKeyPressed && constants.paddle.offsetLeft > 0) {
        constants.paddle.style.left = constants.paddle.offsetLeft - gameData.paddleSpeed + 'px';
    } else if (gameData.rightKeyPressed && constants.paddle.offsetLeft + constants.paddle.offsetWidth < constants.gameContainer.offsetWidth) {
        constants.paddle.style.left = constants.paddle.offsetLeft + gameData.paddleSpeed + 'px';
    }
}


const resetBallAndPaddle = () => gameData.ballLaunched = false

export {checkPaddleCollision, checkBallCollision, handleBallOutOfBounds, handleUserInput,calculateBallPaddleCollisionSpeed,moveBall, resetBallAndPaddle}
