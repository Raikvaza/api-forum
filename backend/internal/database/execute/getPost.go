package execute

import (
	"database/sql"

	"forum-backend/internal/models"
)

func GetPostSql(db *sql.DB, id int) (models.AllPosts, error) {
	var post models.AllPosts
	query := `SELECT * FROM posts where postid=$1`
	row := db.QueryRow(query, id)
	if err := row.Scan(&post.PostId, &post.Author, &post.Title, &post.Content, &post.CreationDate); err != nil {
		return post, err
	}
	return post, nil
}
