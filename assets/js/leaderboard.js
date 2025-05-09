// Récupérer l'URL actuelle
var url = new URL(window.location.href);

// Récupérer les paramètres de l'URL
var params = new URLSearchParams(url.search);

// Récupérer la valeur du paramètre "page"
var pageValue = params.get("page");

let pageId = parseInt(pageValue),
    totalPages;

const urlApi = 'http://localhost:8080/api/leaderboard?page=' + pageId

document.addEventListener('DOMContentLoaded', () => {
    fetch(urlApi)
        .then(response => response.json())
        .then(data => {
            const users = data.users;
            totalPages = data.totalPages;
            managementPagination(totalPages);
            document.getElementById("pageInfo").innerText = pageId;

            const leaderboardList = document.getElementById('leaderboard-list');
            leaderboardList.innerHTML = "";
            let i = 1;
            // Parcourez les données et ajoutez-les à la liste HTML
            users.forEach(user => {
                const line = document.createElement('tr');
                line.className = 'leaderboard-line'
                leaderboardList.appendChild(line);

                const position = document.createElement('td');
                line.appendChild(position);
                const player = document.createElement('td');
                line.appendChild(player);
                const score = document.createElement('td');
                line.appendChild(score);

                position.innerText = i + 20 * (pageId-1);
                player.innerHTML = user.username;
                score.innerHTML = user.score;
                i++;
            });
        })
        .catch(error => console.error('Erreur lors de la récupération des données:', error));
})

function managementPagination(totalPages) {

    if (pageId === 1 && totalPages === 1) {
        document.getElementById('firstPage').disabled = true;
        document.getElementById('previous').disabled = true;
        document.getElementById('nextPage').disabled = true;
        document.getElementById('lastPage').disabled = true;
    } else if(pageId == 1 && totalPages !== 1) {
        document.getElementById('firstPage').disabled = true;
        document.getElementById('previous').disabled = true;
        document.getElementById('nextPage').disabled = false;
        document.getElementById('lastPage').disabled = false;
    }else if(pageId === totalPages) {
        document.getElementById('firstPage').disabled = false;
        document.getElementById('previous').disabled = false;
        document.getElementById('nextPage').disabled = true;
        document.getElementById('lastPage').disabled = true;
    }else if(pageId != 1 && pageId != totalPages) {
        document.getElementById('firstPage').disabled = false;
        document.getElementById('previous').disabled = false;
        document.getElementById('nextPage').disabled = false;
        document.getElementById('lastPage').disabled = false;
    }
}

document.getElementById('firstPage').addEventListener("click", () => {
    window.location.href = '/leaderboard?page=1';
})

document.getElementById('previous').addEventListener("click", () => {
    
    window.location.href = '/leaderboard?page=' + (pageId - 1);
})

document.getElementById('nextPage').addEventListener("click", () => {
    window.location.href = '/leaderboard?page=' + (pageId + 1);
})

document.getElementById('lastPage').addEventListener("click", () => {
    window.location.href = '/leaderboard?page=' + totalPages;
})

document.getElementById("returnHome").addEventListener("click", () => {
    window.location.href = '/';
})
