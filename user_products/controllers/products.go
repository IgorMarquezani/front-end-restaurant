package controllers

import (
	"net/http"
	"projeto_fatec_render/user_products/models"

	"github.com/labstack/echo/v4"
)

func Products(c echo.Context) error {
	user, status := models.UserWithActiveRoomProducts(c)

	if status == http.StatusOK {
		return c.Render(http.StatusOK, "Products", user)
	}

	if status == http.StatusUnauthorized {
		return c.Render(http.StatusUnauthorized, "NotLogged", nil)
	}

	return c.Render(http.StatusInternalServerError, "InternalServerError", nil)
}
