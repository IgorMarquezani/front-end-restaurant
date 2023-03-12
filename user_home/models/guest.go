package models

type GuestMap map[string]User

type Guest struct {
	InvintingRoom   int `json:"invinting_room"`
	UserId          int `json:"user_id"`
	PermissionLevel int `json:"permission_level"`
}
