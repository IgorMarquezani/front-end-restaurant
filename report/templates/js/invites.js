function sendInvite() {
  var convidado = document.querySelector('#convidado').value;
  if (convidado == null) {
    alert("Insira o id do convidado !");
  }

  let data = ""
  for (let i = 0; i < convidado.length; i++) {
    if (convidado[i] == '@') {
      data += "%40"
      continue
    }
    data += convidado[i]
  }

  var dropdown = document.getElementById("permissionDropdown");
  var permission = dropdown.value;
  if (permission == 0) {
    permission = 1
  }

  invite = {"permission": parseInt(permission)}

  fetch('http://localhost:3300/api/invite/send/' + data + '/', {
    method: 'POST',
    headers: {
      "Accept": "*/*",
    },
    credentials: 'include',
    body: JSON.stringify(invite)
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
