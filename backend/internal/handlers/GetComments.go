package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"forum-backend/internal/Log"
	"forum-backend/internal/database/execute"
)

func (s *apiServer) GetComments(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
	fmt.Println(r.URL.Path)
	fmt.Println(r.URL)
	fmt.Println(r.URL.RawQuery)
	postID, err := strconv.Atoi(r.URL.Query().Get("id"))
	fmt.Println(postID)
	if err != nil {
		Log.LogError(err.Error())
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	Comment, err := execute.GetCommentSql(s.DB, postID)
	if err != nil {
		Log.LogError(err.Error())
		w.WriteHeader(http.StatusNotFound)
		return
	}

	err = json.NewEncoder(w).Encode(Comment)
	if err != nil {
		Log.LogError(err.Error())
		w.WriteHeader(http.StatusNotFound)
		return
	}
}
