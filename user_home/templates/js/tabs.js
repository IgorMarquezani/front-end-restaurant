var itemCount = 0;

function addItem() {
  // Seleciona o elemento <select>
  var select = document.getElementById("mySelect");

  // Obtém o item selecionado
  var selectedItem = select.options[select.selectedIndex].value;

  // Cria um elemento <label> para o item selecionado
  var label = document.createElement("label");
  label.innerText = selectedItem;

  // Cria um elemento <span> para o contador e os botões
  var span = document.createElement("span");

  var br = document.createElement("br");
  // Cria um botão "aumentar" para o contador
  var increaseButton = document.createElement("button");
  increaseButton.className = "btn waves-effect waves-light btn-light-secondary text-secondary";
  increaseButton.innerText = "+";
  increaseButton.style.marginRight = "10px";
  increaseButton.style.marginLeft = "10px";
  increaseButton.onclick = function () { increaseCounter(span); };

  // Cria um botão "diminuir" para o contador
  var decreaseButton = document.createElement("button");
  decreaseButton.className = "btn waves-effect waves-light btn-light-secondary text-secondary";
  decreaseButton.innerText = "-";
  decreaseButton.style.marginRight = "10px";
  decreaseButton.style.marginLeft = "10px";
  decreaseButton.onclick = function () { decreaseCounter(span); };

  // Cria um botão "remover" para o item
  var removeButton = document.createElement("button");
  removeButton.className = "btn waves-effect waves-light btn-light-secondary text-secondary";
  removeButton.innerText = "Remover";
  removeButton.onclick = function () { removeItem(label, span, br); };

  // Cria um contador para o item
  var counter = document.createElement("span");
  counter.className = "counter text-dark"
  counter.innerText = "0";

  // Adiciona o contador e os botões ao elemento <span>
  span.appendChild(increaseButton);
  span.appendChild(counter);
  span.appendChild(decreaseButton);
  span.appendChild(removeButton);

  // Adiciona o elemento <label> e o elemento <span> à lista
  var list = document.getElementById("myList");
  list.appendChild(label);
  list.appendChild(span);
  list.appendChild(br);

  // Incrementa o contador de itens
  itemCount++;
}

function increaseCounter(span) {
  // Obtém o contador do elemento <span>
  var counter = span.getElementsByTagName("span")[0];

  // Incrementa o contador
  counter.innerText = parseInt(counter.innerText) + 1;
}

function decreaseCounter(span) {
  // Obtém o contador do elemento <span>
  var counter = span.getElementsByTagName("span")[0];

  // Decrementa o contador, se ele não for menor que zero
  if (parseInt(counter.innerText) > 0) {
    counter.innerText = parseInt(counter.innerText) - 1;
  }
}

function removeItem(label, span, br) {
  // Remove o elemento <label>, o elemento <span> e a quebra de linha da lista
  var list = document.getElementById("myList");
  list.removeChild(label);
  list.removeChild(span);
  list.removeChild(br);

  itemCount--;
}

const tabs = new Map();

function addTabToMap(index, tab) {
  tabs.set(index, JSON.stringify(tab));
}

function makeTabRequest() {

  const labels = Array.from(document.querySelectorAll('#myList label'));
  const spans = Array.from(document.querySelectorAll('#myList span  span.counter'));
  const number = document.querySelector('#number').value;
  const table = document.querySelector('#table').value;
  const room = 0;
  const product_list = 0;
  const requests = [];
  labels.forEach((label, index) => {
    const product_name = label.textContent;
    const quantity = parseInt(spans[index].textContent);
    // sum += quanity;
    const request = { product_name: product_name, product_list: parseInt(product_list), quantity: quantity };
    requests.push(request);
  });

  const payload = { number: parseInt(number), room: parseInt(room), table: parseInt(table), requests: requests };

  fetch('http://localhost:3300/api/tab/register', {
    method: 'POST',
    headers: {
      "Accept": "*/*",
    },
    credentials: 'include',
    body: JSON.stringify(payload)
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
