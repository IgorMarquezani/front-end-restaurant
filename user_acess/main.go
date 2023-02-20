package main

import (
	"html/template"
	"io"

	"github.com/frontend/controllers"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type Template struct {
	templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}

func main() {
	e := echo.New()

	t := Template{
		templates: template.Must(template.ParseGlob("./templates/*.html")),
	}

	e.Renderer = &t
  e.Static("/templates", "templates")

	e.Any("/register", controllers.Register, middleware.Logger())
  e.Any("/login", controllers.Login, middleware.Logger())
  e.File("/css/newstyle.css", "templates/css/newstyle.css", middleware.Logger())

	e.Server.Addr = "localhost:8080"
	e.Server.ListenAndServe()
}
