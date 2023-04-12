function openTabModal() {
  const tabDiv = event.currentTarget.closest('div[name="tab"]');
  const a = tabDiv.querySelector('a#tabValue');
  const value = a.getAttribute('value');
  const data = JSON.parse(value);
  const productNumber = data.number;

  // Acessa o array de requests e percorre seus itens
  const modalLabel2 = document.querySelector('#mesacodigo');
  modalLabel2.textContent = `Codigo da mesa: ${productNumber}`;
  data.requests.forEach(request => {
    const productName = request.product_name;
    const productQuantity = request.quantity;

    // Cria uma label para cada item de request
    const modalLabel = document.createElement('label');
    modalLabel.textContent = `Product: ${productName}, Quantity: ${productQuantity}`;
    modalLabel.setAttribute('for', `product_${productNumber}`);
    
    // Encontra a div "mb-3" dentro do modal "al-info-alert"
    const divMb3 = document.getElementById('al-info-alert').querySelector('.mb-3');

    // Adiciona a label à div "mb-3" encontrada
    divMb3.appendChild(modalLabel);
  });
}
  // Use os valores obtidos para exibir as informações no modal
  function removeLabels() {
    // Encontra a div "mb-3" dentro do modal "al-info-alert"
    const divMb3 = document.getElementById('al-info-alert').querySelector('.mb-3');
    
    // Remove todos os elementos filhos (labels) da div "mb-3"
    while (divMb3.firstChild) {
      divMb3.removeChild(divMb3.firstChild);
    }
  }
  document.addEventListener('click', function(event) {
    // Check if the target of the click event is outside the modal and if the "#al-info-alert" modal is open
    $(window).on('hidden.bs.modal', function() { 
      $('#code').modal('hide');
      removeLabels();
  });
  });
  // document.addEventListener('click', function (event) {
  //   // Verifica se o alvo do evento de clique está fora do modal
  //   if (!event.target.closest('.modal')) {
  //     // Chama a função para remover as labels quando o clique é fora do modal
  //     console.log('aqui')
  //     removeLabels();
  //   }
  // });
  function addItem() {
  var itemCount = 0;
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

function addTabToMap(index, tab) {
  tabs.set(index, JSON.stringify(tab));
}
function makeTabRequest() {

  const labels = Array.from(document.querySelectorAll('#myList label'));
  const spans = Array.from(document.querySelectorAll('#myList span  span.counter'));
  var number = document.querySelector('#number').value;
  if (number == null) {
    number = 0
  }
  var table = document.querySelector('#table').value;
  if (table == null) {
    table = 0
  }
  const room = 0;
  const product_list = 0;
  const requests = [];
  labels.forEach((label, index) => {
    const product_name = label.textContent;
    const quantity = parseInt(spans[index].textContent);
    // sum += quanity;
    const request = { product_name: product_name, product_list: parseInt(product_list), quantity: parseInt(quantity) };
    requests.push(request);
  });

  const payload = { number: 0, room: parseInt(room), table: parseInt(table), requests: requests };

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
function invitebyId() {
  var convidado = document.querySelector('#convidado').value;
  if (convidado == null) {
    alert("Insira o id do convidado !");
  }
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
