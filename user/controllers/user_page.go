package controllers

import (
	"net/http"

	"github.com/frontend/models"
	"github.com/labstack/echo/v4"
)

func UserPage(c echo.Context) error {
	user, status := models.MustFullUserInfo(c)

	if status == http.StatusOK {
		return c.Render(http.StatusOK, "User", user)
	}

	if status == http.StatusUnauthorized {
		return c.Render(http.StatusUnauthorized, "NotLogged", nil)
	}

	return c.Render(http.StatusInternalServerError, "InternalServerError", nil)
}
