package models

type ProductListMap map[string]ProductList

type ProductList struct {
	Name     string `json:"name"`
	Room     int    `json:"room"`
	Products ProductsMap
}
