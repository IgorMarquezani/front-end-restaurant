package models

import (
	"bytes"
	"encoding/json"
	"errors"
	"net/http"

	"github.com/labstack/echo/v4"
)

type User struct {
	Id     uint   `json:"id"`
	Name   string `json:"name"`
	Email  string `json:"email"`
	Passwd string `json:"passwd"`
	Img    []byte `json:"img"`
}

const (
	registerURL string = "http://localhost:3300/api/user/register"
	loginURL    string = "http://localhost:3300/api/user/login"
	userInfoURL string = "http://localhost:3300/api/user/full-info"
)

func (u User) IsValidImage() bool {
  fileFormat := http.DetectContentType(u.Img)
  if fileFormat == "image/png" || fileFormat == "image/jpeg" {
    return true
  }

  return false
}

func NewUserRequest(user UserRegister) (int, error) {
	jsonUser, _ := json.Marshal(user)
	body := bytes.NewBuffer(jsonUser)

	request, err := http.NewRequest("POST", registerURL, body)
	if err != nil {
		return 0, err
	}
	defer request.Body.Close()

	request.Header.Set("Content-Type", "application/json")

	response, err := http.DefaultClient.Do(request)
	if err != nil {
		return response.StatusCode, err
	}
	response.Body.Close()

	if response.StatusCode == http.StatusCreated {
		return response.StatusCode, nil
	}

	return response.StatusCode, errors.New("User not created")
}

func LoginUserRequest(w *http.ResponseWriter, user User) error {
	jsonUser, _ := json.Marshal(user)
	body := bytes.NewBuffer(jsonUser)

	request, err := http.NewRequest("POST", loginURL, body)
	if err != nil {
		return err
	}
	defer request.Body.Close()

	request.Header.Set("Content-Type", "application/json")

	response, err := http.DefaultClient.Do(request)
	if err != nil {
		return err
	}
	defer response.Body.Close()

	if response.StatusCode == http.StatusAccepted {
		session := response.Cookies()[0]

		if session.Name == "_SecurePS" {
			http.SetCookie(*w, session)
			return nil
		}
	}

	return errors.New("Could not login")
}

func MustFullUserInfo(c echo.Context) (User, int) {
	var user User

	request, err := http.NewRequest("POST", userInfoURL, bytes.NewBuffer(make([]byte, 0)))
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
