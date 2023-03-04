package execute

import (
	"database/sql"
	"fmt"

	"forum-backend/internal/Log"
	"forum-backend/internal/models"
)

func CheckPostByid(db *sql.DB, id int) bool {
	selectRecord := "SELECT * FROM posts WHERE postId = ?"
	var post models.AllPosts
	err := db.QueryRow(selectRecord, id).Scan(&post.PostId, &post.Author, &post.Title, &post.Content, &post.CreationDate)
	if err == sql.ErrNoRows {
		fmt.Println("1")
		return false
	} else if err != nil {
		Log.LogError(err.Error())
		fmt.Println("2")
		return false
	}
	return true
}
