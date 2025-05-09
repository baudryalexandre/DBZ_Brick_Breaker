package makeYourGame

import (
	"encoding/json"
	"io/ioutil"
	"math"
	"net/http"
	"sort"
	"strconv"
)

func SetUserScore(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	var requestBody map[string]interface{}
	err := json.NewDecoder(r.Body).Decode(&requestBody)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	username, usernameExists := requestBody["username"].(string)
	score, scoreExists := requestBody["score"].(float64)

	if !usernameExists || !scoreExists {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	jsonFilePath := "./website/users.json"

	usersData, err := ioutil.ReadFile(jsonFilePath)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	var users []map[string]interface{}
	err = json.Unmarshal(usersData, &users)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	newUser := map[string]interface{}{"username": username, "score": score}
	users = append(users, newUser)

	updatedUsersData, err := json.MarshalIndent(users, "", "  ")
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	err = ioutil.WriteFile(jsonFilePath, updatedUsersData, 0644)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newUser)
}

func GetTop10Score(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	jsonFilePath := "./website/users.json"

	usersData, err := ioutil.ReadFile(jsonFilePath)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	var users []map[string]interface{}
	err = json.Unmarshal(usersData, &users)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// Triez les utilisateurs par score décroissant
	sort.Slice(users, func(i, j int) bool {
		return users[i]["score"].(float64) > users[j]["score"].(float64)
	})

	// Limitez à 10 utilisateurs
	var leaderboard []map[string]interface{}
	if len(users) > 10 {
		leaderboard = users[:10]
	} else {
		leaderboard = users
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(leaderboard)
}

func GetAllScore(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	jsonFilePath := "./website/users.json"

	usersData, err := ioutil.ReadFile(jsonFilePath)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	var users []map[string]interface{}
	err = json.Unmarshal(usersData, &users)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// Triez les utilisateurs par score décroissant
	sort.Slice(users, func(i, j int) bool {
		return users[i]["score"].(float64) > users[j]["score"].(float64)
	})

	var leaderboard = users

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(leaderboard)
}

func GetOnePageLeaderboard(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	jsonFilePath := "./website/users.json"

	// Récupérer le numéro de la page à partir des paramètres de requête
	pageStr := r.URL.Query().Get("page")
	page, err := strconv.Atoi(pageStr)
	if err != nil || page < 1 {
		http.Error(w, "Le paramètre de page doit être un nombre entier positif.", http.StatusBadRequest)
		return
	}

	pageSize := 20
	startIndex := (page - 1) * pageSize
	endIndex := startIndex + pageSize


	usersData, err := ioutil.ReadFile(jsonFilePath)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	var users []map[string]interface{}
	err = json.Unmarshal(usersData, &users)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// Triez les utilisateurs par score décroissant
	sort.Slice(users, func(i, j int) bool {
		return users[i]["score"].(float64) > users[j]["score"].(float64)
	})

	totalPages := math.Ceil(float64(len(users)) / 20)

	// Limitez à 10 utilisateurs
	var leaderboard []map[string]interface{}
	if startIndex < len(users) {
		if endIndex > len(users) {
			endIndex = len(users)
		}
		leaderboard = users[startIndex:endIndex]
	}

	response := map[string]interface{}{
		"users":      leaderboard,
		"totalPages": totalPages,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
