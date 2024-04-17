package controller

import (
	//"fmt"
	"net/http"

	"bmacharia/go-uber-zap-logging/model"
	"bmacharia/go-uber-zap-logging/util"

	"github.com/gin-gonic/gin"

)

func AddArticle(context *gin.Context) {
	var input model.Article
	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := util.CurrentUser(context)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//input.UserID = user.ID

	article := model.Article{
		Title:   input.Title,
		Author:  input.Author,
		Content: input.Content,
		UserID:  user.ID,
	}

	savedArticle, err := article.Save()

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusCreated, gin.H{"data": savedArticle})
	//var url = context.Request.Host + context.Request.URL.String()
	//message := fmt.Sprintf("Book added: %s by %s", book.Title, user.Username)
	//util.Logger(context.ClientIP(), url, 201, message)
}

func GetAllUserArticles(context *gin.Context) {
	user, err := util.CurrentUser(context)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"data": user.Articles})
	//var url = context.Request.Host + context.Request.URL.String()
	//message := fmt.Sprintf("User books queried by %s", user.Username)
	//util.Logger(context.ClientIP(), url, 200, message)
}
