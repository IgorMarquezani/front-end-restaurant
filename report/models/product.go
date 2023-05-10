package models

type ProductMap map[string]Product

type Product struct {
	ListName    string  `json:"list_name"`
	ListRoom    int     `json:"list_room"`
	Name        string  `json:"name"`
	Price       float64 `json:"price"`
	Description string  `json:"description"`
	Image       []byte  `json:"image"`
}
