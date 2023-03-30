package controllers

import (
	"log"
	"net/http"

	"github.com/frontend/models"
	"github.com/labstack/echo/v4"
)

func Tabs(c echo.Context) error {
	room, status := models.FullRoomInfo(c)

	if status == http.StatusOK {
		log.Println(room)
		err := c.Render(http.StatusOK, "TabsIframe", room)
		log.Println(err)
	}

	return nil
}
