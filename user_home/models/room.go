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
	fullRoomInfoURL = "http://localhost:6000/api/room/full-info/?id="
)

func FullRoomInfo(e echo.Context) (Room, int) {
	body := bytes.NewBuffer(make([]byte, 1))
	id := e.QueryParam("id")
	request, err := http.NewRequest("GET", fullRoomInfoURL+id, body)
	cookie, err := e.Cookie("_SecurePS")
	if err != nil {
		fmt.Println(err)
	}

	request.AddCookie(cookie)

	client := http.Client{}
	response, err := client.Do(request)
	if err != nil {
		panic(err)
	}

	room := Room{}
	if response.StatusCode == http.StatusOK {
		json.NewDecoder(response.Body).Decode(&room)
		fmt.Println(room)
	}

	return room, response.StatusCode
}
