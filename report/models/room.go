package models

import (
	"bytes"
	"encoding/json"
	"net/http"

	"github.com/labstack/echo/v4"
)

type Room struct {
	Id    int `json:"id"`
	Owner int `json:"owner"`

	Guests       GuestMap
	ProductsList ProductListMap
	Tabs         []Tab
}

const (
	roomInfoURL = "http://localhost:3300/api/room/full-info/?id="
)

func FullRoomInfo(c echo.Context) (Room, int) {
	var room Room

	request, err := http.NewRequest("GET", roomInfoURL+c.QueryParam("id"), bytes.NewBuffer(make([]byte, 1)))
	if err != nil {
		panic(err)
	}
	defer request.Body.Close()

	cookie, err := c.Cookie("_SecurePS")
	if err != nil {
		return room, http.StatusUnauthorized
	}

	request.AddCookie(cookie)

	response, err := http.DefaultClient.Do(request)
	if err != nil {
    return room, http.StatusNotFound
	}
	defer response.Body.Close()

	if response.StatusCode == http.StatusOK {
		json.NewDecoder(response.Body).Decode(&room)
	}

	return room, response.StatusCode
}
