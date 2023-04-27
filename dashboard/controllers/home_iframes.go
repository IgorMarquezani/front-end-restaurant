package controllers

import (
	"net/http"

	"github.com/frontend/models"
	"github.com/labstack/echo/v4"
)

func Tabs(c echo.Context) error {
	room, status := models.FullRoomInfo(c)

	if status == http.StatusOK {
		for i := range room.Tabs {
			room.Tabs[i].Json = room.Tabs[i].ToJson()
		}
		return c.Render(http.StatusOK, "TabsIframe", room)
	}

	if status == http.StatusUnauthorized {
		return c.Render(http.StatusUnauthorized, "NotLogged", nil)
	}

	return c.Render(http.StatusInternalServerError, "InternalServerError", nil)
}
