package main

import (
	"fmt"
	makeYourGame "makeYourGame/internal"
	"net/http"
)

func main() {

	http.HandleFunc("/", makeYourGame.HomeHandler)
	http.HandleFunc("/home", makeYourGame.HomeHandler)
	http.HandleFunc("/leaderboard", makeYourGame.LeaderboardHandler)

	// Définir le dossier "assets" comme dossier de fichiers statiques
	fs := http.FileServer(http.Dir("./assets"))
	http.Handle("/assets/", http.StripPrefix("/assets/", fs))

	//route api
	http.HandleFunc("/api/users", makeYourGame.SetUserScore)
	http.HandleFunc("/api/leaderboard/", makeYourGame.GetOnePageLeaderboard)
	http.HandleFunc("/api/leaderboard/all", makeYourGame.GetAllScore)
	http.HandleFunc("/api/leaderboard/top10", makeYourGame.GetTop10Score)

	fmt.Println("Voici le lien pour ouvrir la page web http://localhost:8080/")
	http.ListenAndServe(":8080", nil)
}
