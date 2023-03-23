package controllers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/frontend/models"
	"github.com/labstack/echo/v4"
)

type HomePage struct {
}

func Home(c echo.Context) error {
	body := bytes.NewBuffer(make([]byte, 1))
	request, err := http.NewRequest("POST", models.FullUserInfoURL, body)

	cookie, err := c.Cookie("_SecurePS")
	if err != nil {
		panic(err)
	}

	request.AddCookie(cookie)

	client := http.Client{}
	response, err := client.Do(request)
	if err != nil {
		panic(err)
	}

	if response.StatusCode == http.StatusOK {
		user := models.User{}
		json.NewDecoder(response.Body).Decode(&user)
		fmt.Println(user)
		err := c.Render(http.StatusOK, "Home", user)
		fmt.Println(err)
		return nil
	}

	return nil
}
