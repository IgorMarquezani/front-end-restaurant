package main

import (
	"fmt"
	"html/template"
	"io"
	"net/http"

	"github.com/frontend/controllers"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

const (
  addr = "localhost:8081"
)

type Template struct {
	templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}

func NotFound(c echo.Context) error {
  return c.Render(http.StatusNotFound, "NotFound", nil)
}

func main() {
	e := echo.New()

	e.Renderer = &Template{
		templates: template.Must(template.ParseGlob("./templates/*.html")),
	}

	e.Static("/templates", "templates")
	e.Any("/home", controllers.Home, middleware.Logger())
	e.GET("/room", controllers.Tabs, middleware.Logger())
  e.RouteNotFound("/*", NotFound)
	e.File("/css/newstyle.css", "templates/css/newstyle.css", middleware.Logger())

	e.Server.Addr = addr
  fmt.Println("Listening on:", addr)
	e.Server.ListenAndServe()
}
