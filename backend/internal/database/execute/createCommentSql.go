package execute

import (
	"database/sql"
	"forum-backend/internal/Log"
	"forum-backend/internal/models"
	"time"
)

func CreateCommentSql(newComment models.NewComment, db *sql.DB) bool {
	stmt, err := db.Prepare("INSERT INTO comments(postId, author,content,creationDate) values(?,?,?,?)")
	if err != nil {
		Log.LogError(err.Error())
		return false
	}
	if _, err := stmt.Exec(newComment.PostId, newComment.Author, newComment.Body, time.Now().Format("01-02-2006 15:04:05")); err != nil {
		Log.LogError(err.Error())
		return false
	}
	return true
}
