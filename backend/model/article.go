package model

import (
	"bmacharia/go-uber-zap-logging/database"
	"time"

	"gorm.io/gorm"
)

type Article struct {
	gorm.Model
	Title     string `gorm:"size:255;not null;unique" json:"title"`
	Author    string `gorm:"size:255;not null" json:"author"`
	Content   string `gorm:"type:text;not null" json:"content"`
	UserID    uint
	CreatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"updated_at"`
}

func (article *Article) Save() (*Article, error) {
	err := database.Database.Create(&article).Error
	if err != nil {
		return &Article{}, err
	}
	return article, nil
}
