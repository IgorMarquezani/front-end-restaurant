package controllers

import (
	"io"
	"log"
	"net/http"

	"github.com/frontend/models"
	"github.com/labstack/echo/v4"
)

type registerErr struct {
	NameErr    string
	EmailErr   string
	PasswdErr  string
	ConfirmErr string
	ImgErr     string
}

type registerForm struct {
	Name    string
	Email   string
	Passwd  string
	Confirm string
	Img     []byte
	Errs    registerErr
}

func (rf registerForm) GetEmail() string {
	return rf.Email
}

func (rf registerForm) GetName() string {
	return rf.Name
}

func (rf registerForm) GetPasswd() string {
	return rf.Passwd
}

func (rf registerForm) GetConfirm() string {
	return rf.Confirm
}

func (rf *registerForm) AllRegisterFormValues(c echo.Context) {
	rf.Name = c.FormValue("name")
	rf.Email = c.FormValue("email")
	rf.Passwd = c.FormValue("passwd")
	rf.Confirm = c.FormValue("confirmation")

	fileHeader, err := c.FormFile("img")
	if err != nil {
		rf.Errs.ImgErr = err.Error()
		return
	}

	file, err := fileHeader.Open()
	if err != nil {
		file.Close()
		rf.Errs.ImgErr = err.Error()
		return
	}

	src, err := io.ReadAll(file)
	file.Close()
	if err != nil {
		rf.Errs.ImgErr = err.Error()
		return
	}

	rf.Img = make([]byte, len(src))
	rf.Img = src
}

func Register(c echo.Context) error {
	if c.Request().Method != "POST" {
		c.Render(http.StatusOK, "Register", nil)
		return nil
	}

	rf := registerForm{}
	rf.AllRegisterFormValues(c)

	if err := models.IsNameEmpty(rf); err != nil {
		rf.Errs.NameErr = err.Error()
	}

	if err := models.IsEmail(rf); err != nil {
		rf.Errs.EmailErr = err.Error()
	}

	if err := models.DifferentPasswords(rf); err != nil {
		rf.Errs.ConfirmErr = err.Error()
	}

	user := UserFromRegisterForm(rf)
	if err := models.NewUserRequest(user); err != nil {
		log.Println("\033[31m", err, "\033[0m")
	  c.Render(http.StatusBadRequest, "Register", rf)
	}

  c.Redirect(http.StatusCreated, "http://localhost:8080/login")

	return nil
}

func UserFromRegisterForm(rf registerForm) models.User {
	user := models.User{
		Name:   rf.Name,
		Email:  rf.Email,
		Passwd: rf.Passwd,
	}

	if rf.Errs.ImgErr == "" {
		user.Img = rf.Img
	}

	log.Println(rf.Errs.ImgErr)

	return user
}
