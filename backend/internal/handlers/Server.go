package handlers

import (
	"database/sql"
	"log"
	"net/http"

	"forum-backend/internal/Log"
	"forum-backend/internal/database/execute"
)

type apiServer struct {
	DB     *sql.DB
	Router *http.ServeMux
}

func NewApiServer(db *sql.DB) *apiServer {
	return &apiServer{
		DB:     db,
		Router: http.NewServeMux(),
	}
}

func CorsHeaders(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Cookie, Content-Length, Accept-Encoding, X-CSRF-Token, charset, Credentials, Accept, Authorization")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		if r.Method == http.MethodOptions {
			return
		}

		next.ServeHTTP(w, r)
	})
}

func (s *apiServer) Start() error {
	Log.LogInfo("Starting the server at port localhost:8080")

	s.Router.Handle("/api/home", CorsHeaders(http.HandlerFunc(s.HomeHandler)))
	s.Router.Handle("/api/signin", CorsHeaders(http.HandlerFunc(s.SignInHandler)))
	s.Router.Handle("/api/signup", CorsHeaders((http.HandlerFunc(s.SignupHandler))))
	s.Router.Handle("/api/signout", CorsHeaders((http.HandlerFunc(s.SignOutHandler))))
	s.Router.Handle("/api/getpost/", CorsHeaders(http.HandlerFunc(s.GetPostHandler)))
	s.Router.Handle("/api/createPost", CorsHeaders(s.validateTokenMiddleware(http.HandlerFunc(s.CreatePost))))
	s.Router.Handle("/api/checkUser", CorsHeaders(http.HandlerFunc(s.CheckToken)))
	s.Router.Handle("/api/getComments/", CorsHeaders(http.HandlerFunc(s.GetComments)))
	// s.Router.Handle("/api/checkUserByToken", CorsHeaders(http.HandlerFunc(s.CheckUSerByToken)))
	s.Router.Handle("/api/createComment", CorsHeaders(s.validateTokenMiddleware(http.HandlerFunc(s.NewComment))))
	// s.Router.HandleFunc("/api/newLike", s.LikeHandler)
	// s.Router.Handle("/api/getAllpost", CorsHeaders(http.HandlerFunc(s.GetAllPost)))
	return http.ListenAndServe(":8080", s.Router)
}

func (s *apiServer) validateTokenMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Println(r.Cookies())
		tokenClient, err := r.Cookie("token")
		if err != nil {
			Log.LogError(err.Error())
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		if booll := execute.CheckByTokenLogin(s.DB, tokenClient.Value); !booll {
			Log.LogError(err.Error())
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		next.ServeHTTP(w, r)
		return
	})
}
