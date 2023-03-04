package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"forum-backend/internal/Log"
	"forum-backend/internal/database/execute"
	"forum-backend/internal/models"
)

func (s *apiServer) NewComment(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
	fmt.Println(r.URL)
	body, err := io.ReadAll(r.Body)
	if err != nil {
		Log.LogError(err.Error())
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	if len(body) == 0 {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	var comment models.NewComment
	err = json.Unmarshal(body, &comment)
	if err != nil {
		Log.LogError(err.Error())
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	// check post is exist ?
	if booll := execute.CheckPostByid(s.DB, comment.PostId); !booll {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	// Insert into database comment
	if booll := execute.CreateCommentSql(comment, s.DB); !booll {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	w.WriteHeader(http.StatusCreated)
}
