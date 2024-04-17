package main

import (
	"fmt"
	"log"

	//Load our controllers and models
	"bmacharia/go-uber-zap-logging/controller"
	"bmacharia/go-uber-zap-logging/model"
	"bmacharia/go-uber-zap-logging/util"

	//Import Gin HTTP web framework
	"github.com/gin-gonic/gin"

	"bmacharia/go-uber-zap-logging/database"

	//Import package for loging .env file
	"github.com/joho/godotenv"
)

func init() {
	util.InitializeLogger()
	//zap.ReplaceGlobals(zap.Must(zap.NewProduction()))
}

func main() {
	//util.Logger.Info("Hello World")
	loadEnv()
	loadDatabase()
	serveApplication()
}

func loadDatabase() {
	database.Connect()
	database.Database.AutoMigrate(&model.User{})
	database.Database.AutoMigrate(&model.Article{})
}

func loadEnv() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

func serveApplication() {
	router := gin.Default()

	publicRoutes := router.Group("/auth")
	publicRoutes.POST("/register", controller.Register)
	publicRoutes.POST("/login", controller.Login)

	protectedRoutes := router.Group("/api")
	protectedRoutes.Use(util.JWTAuth())
	protectedRoutes.POST("/article", controller.AddArticle)
	protectedRoutes.GET("/articles", controller.GetAllUserArticles)

	router.Run(":9000")
	fmt.Println("Server running on port 9000")
}
