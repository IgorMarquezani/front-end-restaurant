function updateActiveRoom(id) {
  fetch('http://localhost:3300/api/session/update/room', {
    method: 'POST',
    headers: {
      "Accept": "*/*",
    },
    credentials: 'include',
    body: JSON.stringify({"id": parseInt(id)})
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Response from server:', data);
  })
  .catch(error => {
    console.error('Error sending data:', error);
  });
}
