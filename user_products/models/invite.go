package models

type Invite struct {
	Id           int    `json:"id"`
	Target       int    `json:"target"`
	InvitingRoom int    `json:"inviting_room"`
	Status       string `json:"status"`
}
