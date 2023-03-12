package controllers

import (
	"net/http"

	"github.com/frontend/models"
	"github.com/labstack/echo/v4"
)

type loginForm struct {
	Email  string
	Passwd string
	Err    string
}

func (lf loginForm) GetEmail() string {
	return lf.Email
}

func (lf *loginForm) AllLoginFormValues(c echo.Context) {
	lf.Email = c.FormValue("email")
	lf.Passwd = c.FormValue("passwd")
}

func Login(c echo.Context) error {
	if c.Request().Method != "POST" {
		c.Render(http.StatusOK, "Login", nil)
		return nil
	}

	lf := loginForm{}
	lf.AllLoginFormValues(c)

	if err := models.IsEmail(lf); err != nil {
		lf.Err = err.Error()
		c.Render(http.StatusBadRequest, "Login", lf)
		return nil
	}

	user := models.User{
		Email:  lf.Email,
		Passwd: lf.Passwd,
	}

	if err := models.LoginUserRequest(&c.Response().Writer, user); err != nil {
		lf.Err = "Email doesn't exist or passwd not compatible"
		c.Render(http.StatusBadRequest, "Login", lf)
		return nil
	}

	return c.Redirect(http.StatusPermanentRedirect, "http://localhost:8081/home")
}
