package controllers

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func Report(c echo.Context) error {
  // user, status := models.FullRoomInfo(c)

  c.Render(http.StatusOK, "Report", nil)

  return nil
}
