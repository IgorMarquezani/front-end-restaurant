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
  registerURL string = "http://localhost:6000/api/user/register" 
  loginURL    string = "http://localhost:6000/api/user/login"
)

func NewUserRequest(user User) error {
	jsonUser, _ := json.Marshal(user)
	body := bytes.NewBuffer(jsonUser)

	request, err := http.NewRequest("POST", registerURL, body)
	if err != nil {
		return err
	}

  request.Header.Set("Content-Type", "application/json")

	client := http.Client{}
	response, err := client.Do(request)
	if err != nil {
		return err
	}

	if response.StatusCode == http.StatusCreated {
    return nil
	}

	return errors.New("User not created") 
}

func LoginUserRequest(w *http.ResponseWriter, user User) error {
  jsonUser, _ := json.Marshal(user)
  body := bytes.NewBuffer(jsonUser)

  request, err := http.NewRequest("POST", loginURL, body)
  if err != nil {
    return err
  }

  request.Header.Set("Content-Type", "application/json")

  client := http.Client{}
  response, err := client.Do(request)
  if err != nil {
    return err
  }

  if response.StatusCode == http.StatusAccepted {
    cookies := response.Cookies()
    session := cookies[0]

    if session.Name == "_SecurePS" {
      http.SetCookie(*w, session)
      return nil
    }
  }

  return errors.New("Could not login") 
}
