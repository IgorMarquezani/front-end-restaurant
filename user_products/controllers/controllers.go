package controllers

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func NotFound(c echo.Context) error {
	return c.Render(http.StatusNotFound, "NotFound", nil)
}
