package models

type Room struct {
	Id    int `json:"id"`
	Owner int `json:"owner"`

	Guests       GuestMap
	ProductsList ProductListMap
	Tabs         []Tab
}
