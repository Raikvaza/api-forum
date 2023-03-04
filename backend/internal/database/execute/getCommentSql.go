package execute

import (
	"database/sql"

	"forum-backend/internal/models"
)

func GetCommentSql(db *sql.DB, id int) ([]models.ReturnComment, error) {
	var ReturnComments []models.ReturnComment
	query := `SELECT * FROM comments where PostId=$1`
	rows, err := db.Query(query, id)
	if err != nil {
		return ReturnComments, err
	}
	for rows.Next() {
		var comment models.ReturnComment
		if err := rows.Scan(&comment.CommentID, &comment.PostId, &comment.Author, &comment.Body, &comment.CreationDate); err != nil {
			return nil, err
		}
		ReturnComments = append(ReturnComments, comment)
	}
	return ReturnComments, nil
}
