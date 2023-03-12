package models

type Tab struct {
	Number   int     `json:"number"`
	RoomId   int     `json:"room"`
	PayValue float64 `json:"pay_value"`
	Maded    string  `json:"time_maded"`

	Requests []Request `json:"requests"`
}
