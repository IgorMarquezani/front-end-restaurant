package main

import (
	"fmt"
	"log"
	"projeto_fatec_render/user_products/routes"

	"github.com/labstack/echo/v4"
)

const (
	addr = "localhost:8082"
)

func main() {
	e := echo.New()
	e.Server.Addr = addr

	routes.Register(e)
	fmt.Println("Listening on:", addr)
	log.Fatal(e.Server.ListenAndServe())
}
