package models

import (
	"errors"
	"net/mail"
)

type UserRegister struct {
	User    User   `json:"user"`
	Confirm string `json:"confirm_passwd"`
}

type FormName interface {
	GetName() string
}

type FormEmail interface {
	GetEmail() string
}

type FormPasswd interface {
	GetPasswd() string
	GetConfirm() string
}

func IsEmail(form FormEmail) error {
	_, err := mail.ParseAddress(form.GetEmail())
	if err != nil {
		return errors.New("Not valid email format")
	}

	return nil
}

func IsNameEmpty(form FormName) error {
	if form.GetName() == "" {
		return errors.New("Empty name")
	}

	return nil
}

func DifferentPasswords(form FormPasswd) error {
	if form.GetPasswd() == "" || form.GetConfirm() == "" {
		return errors.New("passwords doesn't match")
	}

	if form.GetPasswd() != form.GetConfirm() {
		return errors.New("Passwords doesn't match")
	}

	return nil
}
