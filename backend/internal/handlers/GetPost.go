package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"forum-backend/internal/Log"
	"forum-backend/internal/database/execute"
)

func (s *apiServer) GetPostHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
	postID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		Log.LogError(err.Error())
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	post, err := execute.GetPostSql(s.DB, postID)
	if err != nil {
		Log.LogError(err.Error())
		w.WriteHeader(http.StatusNotFound)
		return
	}

	err = json.NewEncoder(w).Encode(post)
	if err != nil {
		Log.LogError(err.Error())
		w.WriteHeader(http.StatusNotFound)
		return
	}
}
