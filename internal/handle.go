package makeYourGame

import (
	"html/template"
	"net/http"
)

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	tmpl := template.Must(template.ParseFiles("./index.html"))
	tmpl.Execute(w, nil)
}

func LeaderboardHandler(w http.ResponseWriter, r *http.Request){
	tmpl := template.Must(template.ParseFiles("./templates/leaderboard.html"))
	tmpl.Execute(w, nil)
}