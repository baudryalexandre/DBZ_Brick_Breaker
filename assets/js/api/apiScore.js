import {
  gameData,
  constants
} from "/assets/js/controllers/constantsControllers.js";

async function getTop10Score() {
  // Effectuer une requête GET à l'API
  fetch("http://localhost:8080/api/leaderboard/top10")
    .then(response => {
      // Vérifier si la requête a réussi (statut 200)
      if (!response.ok) {
        throw new Error(`Erreur de réseau (statut ${response.status})`);
      }
      // Convertir la réponse en format JSON
      return response.json();
    })
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
    .catch(error => {
      // Gérer les erreurs de requête
      console.error('Erreur lors de la récupération des données:', error);
    });
}

async function setNewUser(user) {
  const apiUrl = "http://localhost:8080/api/users";

  // Les données à envoyer
  const userData = {
    username: user,
    score: parseInt(gameData.score, 10)
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  };

  // Envoi de la requête
  fetch(apiUrl, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP! Code: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Réponse du serveur:', data);
      getTop10Score()
    })
    .catch(error => {
      console.error('Erreur lors de l\'envoi de la requête:', error);
    });
}

export {
  getTop10Score,
  setNewUser
};