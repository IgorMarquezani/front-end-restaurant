package main

import (
	"fmt"
	"html/template"
	"io"
	"log"

	"github.com/frontend/routes"
	"github.com/labstack/echo/v4"
)

const (
  addr = "localhost:8080"
)

type Template struct {
	templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data any, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}

func main() {
	e := echo.New()

	e.Renderer = &Template {
		templates: template.Must(template.ParseGlob("./templates/*.html")),
	}

	routes.LoadRoutes(e)

	e.Server.Addr = addr

  fmt.Println("Listening on localhost:8080")
	log.Fatal(e.Server.ListenAndServe())
}
