package routes

import (
	"github.com/frontend/controllers"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func LoadRoutes(e *echo.Echo) {
	e.Static("/templates", "templates")
	e.Any("/register", controllers.Register, middleware.Logger())
	e.Any("/login", controllers.Login, middleware.Logger())
}
