import {
    gameData,
    constants
} from '/assets/js/controllers/constantsControllers.js';
import {
    initializeGame,
    victoryNewMap
} from './controllers/game.js';
import {
    getTop10Score,
    setNewUser
} from "./api/apiScore.js";
import {
    possibilitiesArcade,
    mapStory
} from "./controllers/mapControllers.js";
import {
    nextPart,
    victoryMapStory
} from "./controllers/storyController.js";

document.addEventListener('DOMContentLoaded', () => {
    getTop10Score();
})

document.getElementById("btnLinkLeaderboard").addEventListener("click", () => {
    window.location.href = '/leaderboard?page=1';
})

document.getElementById('story-btn').addEventListener('click', () => {
    constants.startScreen.classList.add('hidden')
    gameData.map = 1
    nextPart(gameData.map)
})

document.getElementById('play-btn').addEventListener('click', () => {
    constants.startScreen.classList.add('hidden')
    const intervalleMap = document.getElementById('intervalleMap')
    gameData.map = 1
    document.getElementById('niveauMap').innerText = "Map " + gameData.map
    intervalleMap.classList.remove('hidden')
    setTimeout(function () {

        intervalleMap.classList.add('hidden')
        constants.gameContainer.classList.remove('hidden')
        constants.paddle.classList.remove('hidden')
        constants.ball.classList.remove('hidden')
        constants.scoreElement.classList.remove('hidden')
        constants.livesElement.classList.remove('hidden')
        constants.timerElement.classList.remove('hidden')
        gameData.roadmap = possibilitiesArcade
        initializeGame()
    }, 3000);
})



document.getElementById('true_quit-btn').addEventListener('click', () => {
    window.close()
})

document.addEventListener('keydown', (event) => {
    if (event.key === 's' && gameData.roadmap === mapStory) {
        constants.gameIsPaused = true;
        constants.gameContainer.classList.add('paused');
        victoryMapStory();
    }
    if (event.key === 's' && gameData.roadmap != mapStory) {
        constants.gameIsPaused = true;
        constants.gameContainer.classList.add('paused');
        victoryNewMap();
    }

});



document.addEventListener('DOMContentLoaded', () => {

    document.addEventListener('keydown', (event) => {
        if (event.key === ' ' && gameData.storyVictory === true) {
            gameData.storyVictory === false
            location.reload()
        }
        if (event.key === ' ' && gameData.currentPartIndex != 0) {
            nextPart(gameData.map)

        } 
        if (event.key === ' ' && !gameData.ballLaunched) {
            gameData.ballLaunched = true;
            // Ajoutez une vitesse initiale à la balle
            gameData.ballSpeedX = 0;
            gameData.ballSpeedY = -5;
        }

    });

    // Variables pour suivre les touches enfoncées


    // Ajouter un événement pour détecter quand une touche est enfoncée
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            gameData.leftKeyPressed = true;
        } else if (e.key === 'ArrowRight') {
            gameData.rightKeyPressed = true;
        }
    });

    // Ajouter un événement pour détecter quand une touche est relâchée
    window.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowLeft') {
            gameData.leftKeyPressed = false;
        } else if (e.key === 'ArrowRight') {
            gameData.rightKeyPressed = false;
        }
    });

})

document.getElementById('submitUser').addEventListener('click', () => {
    var usernameValue = document.getElementById("username").value;
    setNewUser(usernameValue)

    //reset je jeux
    location.reload();
})