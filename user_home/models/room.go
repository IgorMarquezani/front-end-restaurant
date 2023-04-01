package models

import (
	"bytes"
	"encoding/json"
	"fmt"
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

	request, err := http.NewRequest("GET", roomInfoURL + c.QueryParam("id"), bytes.NewBuffer(make([]byte, 1)))

	cookie, err := c.Cookie("_SecurePS")
	if err != nil {
		fmt.Println(err)
	}

	request.AddCookie(cookie)

	response, err := http.DefaultClient.Do(request)
	if err != nil {
		panic(err)
	}

	if response.StatusCode == http.StatusOK {
		json.NewDecoder(response.Body).Decode(&room)
		fmt.Println(room)
	}

	return room, response.StatusCode
}
