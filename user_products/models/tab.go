package models

import "encoding/json"

type Tab struct {
  Table    int     `json:"table"`
	Number   int     `json:"number"`
	RoomId   int     `json:"room"`
	PayValue float64 `json:"pay_value"`
	Maded    string  `json:"time_maded"`
  Json     string  `json:"-"`

	Requests []Request `json:"requests"`
}

func (t *Tab) ToJson() string {
  data, err := json.Marshal(*t)
  if err != nil {
    panic(err)
  }

  t.Json = string(data)
  return string(data) 
}
