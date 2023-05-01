package routes

import (
	"net/http"

	"github.com/frontend/controllers"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func NotFound(c echo.Context) error {
	return c.Render(http.StatusNotFound, "NotFound", nil)
}

func LoadRoutes(e *echo.Echo) {
	e.Static("/templates", "templates")
	e.Any("/register", controllers.Register, middleware.Logger())
	e.Any("/login", controllers.Login, middleware.Logger())
	e.GET("/user", controllers.UserPage, middleware.Logger())
	e.RouteNotFound("/*", NotFound)
}
