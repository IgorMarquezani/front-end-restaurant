package models

import (
	"bytes"
	"encoding/json"
	"net/http"

	"github.com/labstack/echo/v4"
)

type User struct {
	Name   string `json:"name"`
	Email  string `json:"email"`
	Passwd string `json:"passwd"`
	Img    []byte `json:"img"`

	Room         Room
	ActiveRoom   int
	RoomsAsGuest []Room
	Invites      []Invite
}

const (
	userWithActiveRoomProductsURL string = "http://localhost:3300/api/user/with-active-room-products"
)

func (u User) IsValidImage() bool {
  fileFormat := http.DetectContentType(u.Img)
  if fileFormat == "image/png" || fileFormat == "image/jpeg" {
    return true
  }

  return false
}

func UserWithActiveRoomProducts(c echo.Context) (User, int) {
	var user User

	request, err := http.NewRequest("GET", userWithActiveRoomProductsURL, bytes.NewBuffer(make([]byte, 0)))
	defer request.Body.Close()

	cookie, err := c.Cookie("_SecurePS")
	if err != nil {
		return user, http.StatusUnauthorized
	}

	request.AddCookie(cookie)

	response, err := http.DefaultClient.Do(request)
	if err != nil {
		panic(err)
	}
	defer response.Body.Close()

	if response.StatusCode == http.StatusOK {
		json.NewDecoder(response.Body).Decode(&user)
	}

	return user, response.StatusCode
}
