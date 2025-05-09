import {
    constants,
    gameData
} from "./constantsControllers.js";

import {possibilitiesArcade, mapStory} from "./mapControllers.js";

const destroyedBricks = []

function checkBrickCollisions() {
    constants.bricks.forEach((brick) => {
        const brickRect = brick.getBoundingClientRect();
        const ballRect = ball.getBoundingClientRect();

        // Check if the brick has a cooldown timestamp
        const cooldownTimestamp = parseInt(brick.dataset.cooldownTimestamp) || 0;

        if (
            ballRect.bottom >= brickRect.top &&
            ballRect.top <= brickRect.bottom &&
            ballRect.right >= brickRect.left &&
            ballRect.left <= brickRect.right &&
            Date.now() - cooldownTimestamp > 250 // 250 milliseconds cooldown period
        ) {

            // Set cooldown timestamp for the brick
            brick.dataset.cooldownTimestamp = Date.now();

            if (brick.classList.contains('brickBlue')) {
                brick.className = 'brick brickRed';
                gameData.score += 10
            } else if (brick.classList.contains('brickRed')) {
                // The brick still has one life left, change it to a green brick
                brick.className = 'brick brickGreen';
                //brick.style.backgroundColor = '#4caf50';
                gameData.score += 10
            } else if (!(brick.classList.contains('brickGrey'))) {
                // The brick has no more lives, remove it and increase the score
                destroyedBricks.push(brick);
                brick.remove()
                gameData.score += 10;
            }

            // Determine the side of the brick that the ball collided with
            const collisionTop = Math.abs(ballRect.bottom - brickRect.top);
            const collisionBottom = Math.abs(ballRect.top - brickRect.bottom);
            const collisionLeft = Math.abs(ballRect.right - brickRect.left);
            const collisionRight = Math.abs(ballRect.left - brickRect.right);

            // Determine the direction of ball speed based on the collision side
            if (collisionTop <= collisionBottom && collisionTop <= collisionLeft && collisionTop <= collisionRight) {
                // Ball hit the top side of the brick
                gameData.ballSpeedY = -Math.abs(gameData.ballSpeedY);
            } else if (collisionBottom <= collisionTop && collisionBottom <= collisionLeft && collisionBottom <= collisionRight) {
                // Ball hit the bottom side of the brick
                gameData.ballSpeedY = Math.abs(gameData.ballSpeedY);
            } else if (collisionLeft <= collisionTop && collisionLeft <= collisionBottom && collisionLeft <= collisionRight) {
                // Ball hit the left side of the brick
                gameData.ballSpeedX = -Math.abs(gameData.ballSpeedX);
            } else {
                // Ball hit the right side of the brick
                gameData.ballSpeedX = Math.abs(gameData.ballSpeedX);
            }
        }
    });
}

function replaceBricks() {
    const placeholder = document.createElement('div');
    placeholder.id = 'bricks-container';
    constants.gameContainer.appendChild(placeholder);

    const newBricks = generateBricks(15, 15, 50, 20, 10, placeholder, gameData.roadmap);
    
    // Remove existing bricks
    constants.bricks.forEach(brick => brick.remove());

    // Replace placeholder with new bricks
    placeholder.replaceWith(...newBricks);

    destroyedBricks.length = 0;

    // Update the bricks array
    constants.bricks = newBricks;
}

function generateBricks(rows, columns, brickWidth, brickHeight, gap, container, roadmap) {
    const newBricks = [];

    const possibilities = roadmap
    let crossPattern;

    if (possibilities === possibilitiesArcade) {
        crossPattern = possibilities[Math.floor(Math.random(possibilities) * possibilities.length)];
    } else {
        crossPattern = possibilities[gameData.map - 1]
    }
    //Là je choisis un patterne parmi ceux dans 'possibilités'
    
    //const crossPattern = possibilities[0]

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            //Et là je vérifie si la brique juste ici est dans le patterne selectioné ou pas.
            if (crossPattern[row][col] !== '.') {
                const brick = document.createElement('div');
                switch (crossPattern[row][col]) {
                    case 'o': //Brique 'Basic' Green
                        brick.className = 'brick brickGreen';
                        brick.style.top = `${row * (brickHeight + gap) + 50}px`;
                        brick.style.left = `${col * (brickWidth + gap) + 50}px`;
                        newBricks.push(brick);
                        container.appendChild(brick);
                        break;
                    case 'x': //Brique 'Armored' Red
                        brick.className = 'brick brickRed';
                        brick.style.top = `${row * (brickHeight + gap) + 50}px`;
                        brick.style.left = `${col * (brickWidth + gap) + 50}px`;
                        brick.style.backgroundColor = '#f00'
                        newBricks.push(brick);
                        container.appendChild(brick);
                        break;
                    case 'y': //Brique 'Invincible' Grey
                        brick.className = 'brick brickGrey';
                        brick.style.top = `${row * (brickHeight + gap) + 50}px`;
                        brick.style.left = `${col * (brickWidth + gap) + 50}px`;
                        brick.style.backgroundColor = '#808080'
                        newBricks.push(brick);
                        container.appendChild(brick);
                        break;
                    case 'b':
                        brick.className = 'brick brickBlue';
                        brick.style.top = `${row * (brickHeight + gap) + 50}px`;
                        brick.style.left = `${col * (brickWidth + gap) + 50}px`;
                        brick.style.backgroundColor = '#00f'
                        newBricks.push(brick);
                        container.appendChild(brick);

                        //Brique Bleue : '#00f'
                        //Brique Gold: '#ffd700'
                        //Brique Pink: '#ff69b4'

                }
            }
        }
    }

    return newBricks;
}

export {
    checkBrickCollisions,
    replaceBricks,
    generateBricks
}