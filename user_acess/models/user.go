package models

import (
	"bytes"
	"encoding/json"
	"errors"
	"net/http"
)

type User struct {
	Name   string `json:"name"`
	Email  string `json:"email"`
	Passwd string `json:"passwd"`
	Img    []byte `json:"img"`
}

const (
	registerURL string = "http://localhost:3300/api/user/register"
	loginURL    string = "http://localhost:3300/api/user/login"
)

func NewUserRequest(user UserRegister) (int, error) {
	jsonUser, _ := json.Marshal(user)
	body := bytes.NewBuffer(jsonUser)

	request, err := http.NewRequest("POST", registerURL, body)
	if err != nil {
		return 0, err
	}

	request.Header.Set("Content-Type", "application/json")

	response, err := http.DefaultClient.Do(request)
	if err != nil {
		return response.StatusCode, err
	}

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

	request.Header.Set("Content-Type", "application/json")

	response, err := http.DefaultClient.Do(request)
	if err != nil {
		return err
	}

	if response.StatusCode == http.StatusAccepted {
		session := response.Cookies()[0]

		if session.Name == "_SecurePS" {
			http.SetCookie(*w, session)
			return nil
		}
	}

	return errors.New("Could not login")
}
