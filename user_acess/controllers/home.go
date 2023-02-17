package controllers

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type HomePage struct {

}

func Home(c echo.Context) error {
  c.Render(http.StatusOK, "Home", nil)

  return nil
}
