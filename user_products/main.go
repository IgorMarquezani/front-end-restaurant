package main

import (
	"log"
	"projeto_fatec_render/user_products/routes"

	"github.com/labstack/echo/v4"
)


func main() {
	e := echo.New()
	e.Server.Addr = "localhost:8082"

  routes.Register(e)
	log.Fatal(e.Server.ListenAndServe())
}
