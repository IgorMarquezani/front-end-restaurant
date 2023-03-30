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

func (rf registerForm) AllRegisterFormValues(c echo.Context) registerForm {
	rf.Name = c.FormValue("name")
	rf.Email = c.FormValue("email")
	rf.Passwd = c.FormValue("passwd")
	rf.Confirm = c.FormValue("confirmation")

	fileHeader, err := c.FormFile("img")
	if err != nil {
		rf.Errs.ImgErr = err.Error()
		return rf
	}

	file, err := fileHeader.Open()
	if err != nil {
		file.Close()
		rf.Errs.ImgErr = err.Error()
		return rf
	}

	src, err := io.ReadAll(file)
	file.Close()
	if err != nil {
		rf.Errs.ImgErr = err.Error()
		return rf
	}

	rf.Img = make([]byte, len(src))
	rf.Img = src
  return rf
}

func (rf *registerForm) FindRegisterErrs() registerErr {
	if err := models.IsNameEmpty(rf); err != nil {
		rf.Errs.NameErr = err.Error()
	}

	if err := models.IsEmail(rf); err != nil {
		rf.Errs.EmailErr = err.Error()
	}

	if err := models.DifferentPasswords(rf); err != nil {
		rf.Errs.ConfirmErr = err.Error()
	}

  return rf.Errs
}

func UserFromRegisterForm(rf registerForm) models.UserRegister {
  var (
    user models.User
    userRegister models.UserRegister
  )

  user.Name = rf.Name
	user.Email = rf.Email
	user.Passwd = rf.Passwd

	if rf.Errs.ImgErr == "" {
		user.Img = rf.Img
	}

	userRegister.User =    user
	userRegister.Confirm = rf.Confirm

	log.Println(rf.Errs.ImgErr)

	return userRegister
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

func Register(c echo.Context) error {
	if c.Request().Method != "POST" {
		c.Render(http.StatusOK, "Register", nil)
		return nil
	}

	rf := registerForm{}.AllRegisterFormValues(c)
  rf.FindRegisterErrs()

	user := UserFromRegisterForm(rf)

	if statusCode, err := models.NewUserRequest(user); err != nil {
		log.Println("\033[31m", err, "\033[0m")

		if statusCode == http.StatusAlreadyReported {
			rf.Errs.EmailErr = "E-mail already in use"
		}

		c.Render(http.StatusBadRequest, "Register", rf)
		return nil
	}

	return c.Redirect(http.StatusMovedPermanently, "http://localhost:8080/login")
}
