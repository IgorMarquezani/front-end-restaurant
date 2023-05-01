package main

import (
	"fmt"
	"html/template"
	"io"
	"log"
	"os"

	"github.com/frontend/routes"
	"github.com/labstack/echo/v4"
)

type Template struct {
	templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data any, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}

func main() {
	var (
		ip   = os.Getenv("IP")
		port = os.Getenv("PORT")
	)

	e := echo.New()

	e.Renderer = &Template{
		templates: template.Must(template.ParseGlob("./templates/*.html")),
	}

	routes.LoadRoutes(e)

	e.Server.Addr = ip + ":" + port

	fmt.Println("Listening on", e.Server.Addr)
	log.Fatal(e.Server.ListenAndServe())
}
