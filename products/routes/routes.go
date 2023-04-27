package routes

import (
	"io"
	"os"
	"projeto_fatec_render/user_products/controllers"
	"text/template"

	"github.com/labstack/echo/v4"
)

type Template struct {
	templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}

func Register(e *echo.Echo)  {
	e.Renderer = &Template{
		templates: template.Must(template.ParseGlob("./templates/*.html")),
	}

	e.StaticFS("/templates", os.DirFS("./templates/"))
	e.GET("/products", controllers.Products)
	e.RouteNotFound("/*", controllers.NotFound)
}
