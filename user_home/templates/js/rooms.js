function updateActiveRoom(id) {
  const handler = new XMLHttpRequest();
  handler.open("POST", "http://localhost:6000/api/session/update/room")
  handler.send(JSON.stringify({"id": id, "owner": null}))
  
  handler.onreadystatechange = function () {
    if (this.readyState == 202 || this.readyState ==  200) {
      console.log(handler.responseText)
    }
  }
}
