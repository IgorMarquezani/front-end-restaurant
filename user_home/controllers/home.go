package controllers

import (
	"fmt"
	"net/http"

	"github.com/frontend/models"
	"github.com/labstack/echo/v4"
)

func Home(c echo.Context) error {
  user, status := models.MustFullUserInfo(c)

  if status == http.StatusOK {
		fmt.Println(user)
		err := c.Render(http.StatusOK, "Home", user)
		fmt.Println(err)
		return nil
	}

	return nil
}
