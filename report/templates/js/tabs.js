function openTabModal() {
  const tabDiv = event.currentTarget.closest('div[name="tab"]');
  const a = tabDiv.querySelector('a#tabValue');
  const value = a.getAttribute('value');
  const data = JSON.parse(value);
  const productNumber = data.number;

  // Acessa o array de requests e percorre seus itens
  const modalLabel2 = document.querySelector('#mesacodigo');
  modalLabel2.textContent = `Número da mesa: ${productNumber}`;

  data.requests.forEach(request => {
    const productName = request.product_name;
    const productQuantity = request.quantity;

    const productNameLabel = document.createElement('label');
    // Cria uma label para cada item de request
    productNameLabel.textContent = `Produto: ${productName}`;
    productNameLabel.setAttribute('for', `product_${productNumber}`);

    const productQuantityLabel = document.createElement('label')
    productQuantityLabel.textContent = `Quantidade: ${productQuantity}`;
    productQuantityLabel.setAttribute('for', `product_${productNumber}`);

    const br1 = document.createElement('br')
    const br2 = document.createElement('br')

    // Encontra a div "mb-3" dentro do modal "al-info-alert"
    const divMb3 = document.getElementById('al-info-alert').querySelector('.mb-3');

    // Adiciona a label à div "mb-3" encontrada
    divMb3.appendChild(productNameLabel);
    divMb3.appendChild(br1);
    divMb3.appendChild(productQuantityLabel);
    divMb3.appendChild(br2);
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
  increaseButton.onclick = function() { increaseCounter(span); };

  // Cria um botão "diminuir" para o contador
  var decreaseButton = document.createElement("button");
  decreaseButton.className = "btn waves-effect waves-light btn-light-secondary text-secondary";
  decreaseButton.innerText = "-";
  decreaseButton.style.marginRight = "10px";
  decreaseButton.style.marginLeft = "10px";
  decreaseButton.onclick = function() { decreaseCounter(span); };

  // Cria um botão "remover" para o item
  var removeButton = document.createElement("button");
  removeButton.className = "btn waves-effect waves-light btn-light-secondary text-secondary";
  removeButton.innerText = "Remover";
  removeButton.onclick = function() { removeItem(label, span, br); };

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

function addItem2() {
  var itemCount = 0;
  // Seleciona o elemento <select>
  var select = document.getElementById("mySelect2");

  // Obtém o item selecionado
  var selectedItem = select.options[select.selectedIndex].value;
  var link = document.createElement('a');
  link.setAttribute('value', 'inserting');
  link.setAttribute('id', 'operation');
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
  increaseButton.onclick = function() { increaseCounter(span); };

  // Cria um botão "diminuir" para o contador
  var decreaseButton = document.createElement("button");
  decreaseButton.className = "btn waves-effect waves-light btn-light-secondary text-secondary";
  decreaseButton.innerText = "-";
  decreaseButton.style.marginRight = "10px";
  decreaseButton.style.marginLeft = "10px";
  decreaseButton.onclick = function() { decreaseCounter(span); };

  // Cria um botão "remover" para o item
  var removeButton = document.createElement("button");
  removeButton.className = "btn waves-effect waves-light btn-light-secondary text-secondary";
  removeButton.innerText = "Remover";
  removeButton.onclick = function() { removeItem4(label, span, br, link); };

  // Cria um contador para o item
  var counter = document.createElement("span");
  counter.className = "counter text-dark"
  counter.innerText = "0";

  // Adiciona o contador e os botões ao elemento <span>
  span.appendChild(link);
  span.appendChild(increaseButton);
  span.appendChild(counter);
  span.appendChild(decreaseButton);
  span.appendChild(removeButton);

  // Adiciona o elemento <label> e o elemento <span> à lista
  var list = document.getElementById("myList2");
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

function removeItem2(label, span, br, link1) {
  // Remove o elemento <label>, o elemento <span> e a quebra de linha da lista
  var list = document.getElementById("myList2");
  label.setAttribute('hidden', '')
  span.setAttribute('hidden', '');
  list.removeChild(br);
  var link = document.createElement('a');
  link.setAttribute('value', 'deleting');
  link.setAttribute('id', 'operation');
  span.appendChild(link)
  itemCount--;

}

function removeItem3() {
  // Remove the label, span, and br elements from the list
  const list = document.getElementById("myList2");
  const labels = list.querySelectorAll("label");
  const spans = list.querySelectorAll("span");
  const brs = list.querySelectorAll("br");

  for (let index = 0; index < labels.length; index++) {
    labels[index].remove();
  }

  for (let index = 0; index < spans.length; index++) {
    spans[index].remove();
  }

  for (let index = 0; index < brs.length; index++) {
    brs[index].remove();
  }

}
function removeItem4(label, span, br, link1) {
  // Remove o elemento <label>, o elemento <span> e a quebra de linha da lista
  var xd = link1.getAttribute('value')

  if (xd != "inserting") {
    var list = document.getElementById("myList2");
    label.setAttribute('hidden', '')
    span.setAttribute('hidden', '');
    list.removeChild(br);
    var link = document.createElement('a');
    link.setAttribute('value', 'deleting');
    link.setAttribute('id', 'operation');
    span.appendChild(link)
  }

  var list = document.getElementById("myList2")
  const labels = list.querySelector("label");
  const spans = list.querySelector("span");
  const brs = list.querySelector("br");

  list.removeChild(labels)
  list.removeChild(spans)
  list.removeChild(brs)
}

// function addTabToMap(index, tab) {
//   tabs.set(index, JSON.stringify(tab));
// }

function makeTabRequest() {

  const labels = Array.from(document.querySelectorAll('#myList label'));
  const spans = Array.from(document.querySelectorAll('#myList span  span.counter'));
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
      scrollTo(0, 0),
        $("#box_msg1").removeClass('alert-danger').addClass('alert-success').html(response.statusText).fadeIn();
      setTimeout(() => {
        $("#box_msg1").removeClass('alert-danger').addClass('alert-success').fadeOut();
      }, 1500);
      return response.json();
    })
    .then(data => {
    })
    .catch(error => {
      console.error('Error sending data:', error);
    });
}


function showProductInfo() {
  var itemCount = 0;
  const tabDiv = event.currentTarget.closest('div[name="tab"]');
  const a = tabDiv.querySelector('a#tabValue');
  const value = a.getAttribute('value');
  const data = JSON.parse(value);
  const productNumber = data.number;
  const numberInput = document.getElementById('numberc');
  numberInput.value = productNumber;

  data.requests.forEach(request => {
    const productName = request.product_name;
    const productQuantity = request.quantity;

    // Cria uma label para cada item de request
    const modalLabel = document.createElement('label');
    var label = document.createElement("label");
    label.innerText = productName;

    var link = document.createElement('a');
    link.setAttribute('value', '');
    link.setAttribute('id', 'operation');
    // Cria um elemento <span> para o contador e os botões
    var span = document.createElement("span");
    var br = document.createElement("br");

    // Cria um botão "aumentar" para o contador
    var increaseButton = document.createElement("button");
    increaseButton.className = "btn waves-effect waves-light btn-light-secondary text-secondary";
    increaseButton.innerText = "+";
    increaseButton.style.marginRight = "10px";
    increaseButton.style.marginLeft = "10px";
    increaseButton.onclick = function() {
      increaseCounter2(span);

    };
    // Cria um botão "diminuir" para o contador
    var decreaseButton = document.createElement("button");
    decreaseButton.className = "btn waves-effect waves-light btn-light-secondary text-secondary";
    decreaseButton.innerText = "-";
    decreaseButton.style.marginRight = "10px";
    decreaseButton.style.marginLeft = "10px";
    decreaseButton.onclick = function() {
      decreaseCounter2(span);
    };

    // Cria um botão "remover" para o item
    var removeButton = document.createElement("button");
    removeButton.className = "btn waves-effect waves-light btn-light-secondary text-secondary";
    removeButton.innerText = "Remover";
    removeButton.onclick = function() {
      removeItem2(label, span, br, link);
    };

    // Cria um contador para o item
    var counter = document.createElement("span");
    counter.className = "counter text-dark"
    counter.innerText = productQuantity

    // Adiciona o contador e os botões ao elemento <span>
    span.appendChild(link);
    span.appendChild(increaseButton);
    span.appendChild(counter);
    span.appendChild(decreaseButton);
    span.appendChild(removeButton);

    // Adiciona o elemento <label> e o elemento <span> à lista
    var list = document.getElementById("myList2");
    list.appendChild(label);
    list.appendChild(span);
    list.appendChild(br);


    function increaseCounter2(span) {
      // Obtém o contador do elemento <span>
      var counter = span.getElementsByTagName("span")[0];

      // Incrementa o contador
      counter.innerText = parseInt(counter.innerText) + 1;
      const operationLink = document.querySelector('a#operation');
      if (operationLink.getAttribute('value') != 'inserting') {
        operationLink.setAttribute('value', 'updating');
      }
    }

    function decreaseCounter2(span) {
      // Obtém o contador do elemento <span>
      var counter = span.getElementsByTagName("span")[0];

      // Decrementa o contador, se ele não for menor que zero
      if (parseInt(counter.innerText) > 0) {
        counter.innerText = parseInt(counter.innerText) - 1;
        const operationLink = document.querySelector('a#operation');
        if (operationLink.getAttribute('value') != 'inserting') {
          operationLink.setAttribute('value', 'updating');
        }
      }
    }
    // Incrementa o contador de itens
    itemCount++;
    console.log(link);
  });
}
document.addEventListener('click', function(event) {
  // Check if the target of the click event is outside the modal and if the "#al-info-alert" modal is open
  $(window).on('hidden.bs.modal', function() {
    removeItem3();
  });
});


function updateTabNumber() {
  // Obtém o valor do input com o ID "numberc"
  const numberInput = document.getElementById('numberc');
  const number = numberInput.value; // Obtém o valor do input
  var tables = document.querySelector('#table').value;
  if (tables == null) {
    tables = 0
  }
  let room = 0
  let product_list = 0;
  // Obtém todas as divs com a classe "mylist2"
  const labels = Array.from(document.querySelectorAll('#myList2 label'));
  const spans = Array.from(document.querySelectorAll('#myList2 span  span.counter'));
  const operationLinks = Array.from(document.querySelectorAll('#myList2 span a#operation'));
  const operationValues = operationLinks.map(link => link.getAttribute('value'));
  const operacoes = [];
  operationValues.forEach(value => {
    operacoes.push(value);
  });
  console.log(tables)
  console.log(operacoes)

  // Cria um array para armazenar os objetos de solicitação
  const requests = [];

  // Loop através de cada div "mylist2"
  labels.forEach((label, index) => {
    const product_name = label.textContent;
    const operacooes = operacoes[index]
    const quantity = parseInt(spans[index].textContent);
    // sum += quanity;
    const request = { product_name: product_name, product_list: parseInt(product_list), quantity: parseInt(quantity), operation: operacooes };
    requests.push(request);
  });
  const payload = { number: parseInt(number), room: parseInt(room), table: parseInt(tables), requests: requests };

  console.log(payload)
  // Faz uma requisição PUT para o endpoint http://localhost:3300/api/tab/update/number
  fetch(`http://localhost:3300/api/tab/update?number=${number}`, {
    method: 'PUT',
    headers: {
      "Accept": "*/*",
    },
    credentials: 'include',
    body: JSON.stringify(payload)
  })
    .then(response => {
      if (response.ok) {
        console.log('Atualização bem-sucedida');
      } else {
        console.error('Erro ao atualizar');
      }
    })
    .catch(error => {
      console.error('Erro ao atualizar:', error);
    });
}

function deleteTab() {
  const tabDiv = event.currentTarget.closest('div[name="tab"]');
  const a = tabDiv.querySelector('a#tabValue');
  const value = a.getAttribute('value');
  const data = JSON.parse(value);
  const productNumber = data.number;

  console.log(productNumber),
    fetch(`http://localhost:3300/api/tab/delete/${productNumber}`, {
      method: 'DELETE',
      headers: {
        "Accept": "*/*",
        "Content-Type": 'application/json',
      },
      credentials: 'include',
    })
      .then(response => {
        if (response.ok) {
          console.log(response);
          scrollTo(0, 0);
          $("#box_msg2").removeClass('alert-danger').addClass('alert-success').html("Comanda deletada com sucesso").fadeIn();
          setTimeout(() => {
            $("#box_msg2").removeClass('alert-danger').addClass('alert-success').fadeOut();
          }, 1500);

        } else {
          console.error('Erro ao excluir');
        }
      })
      .catch(error => {
        console.error('Erro ao excluir:', error);
      });
}

function renderTabFromWebsocket(tab) {
  // find the last div element with name="tab"
  let msg = []
  let tabNumber = []
  msg = tab

  try {
    tab = JSON.parse(tab)
  } catch (error) {
    // the message is always this way: "Delete tab of number: N"
    for (let i = msg.indexOf(':') + 2; i < msg.length; i++) {
      tabNumber += msg[i]
    }

    tabNumber = parseInt(tabNumber)
    // put your logic right here for deleting the tab of number N. don't remove the "return" 
    return
  }

  var tabDivs = document.querySelectorAll('div[name="tab"]');
  var tabDiv = tabDivs[tabDivs.length - 1];
  var newTabDiv = document.createElement("div");
  newTabDiv.setAttribute("name", "tab");
  newTabDiv.setAttribute("class", "col-lg-3 col-md-12");
  newTabDiv.innerHTML = `
     <a id="tabnumber" value="${tab.number}T"></a>
     <a id="tabValue" type="hidden" value="${tab}"></a>
     <div class="white-box analytics-info">
       <button type="button" class="btn2 bg-transparent border-0" data-bs-toggle="modal" onclick="openTabModal()" data-bs-target="#al-info-alert">
         <h3 class="box-title">Comanda: ${tab.number}</h3>
         <ul class="list-inline two-part d-flex align-items-center mb-0">
           <li>
             <div>
               <i class="fas fa-3x fa-users" aria-hidden="true"></i>
             </div>
           </li>
           <li class="ms-auto"><span class="counter text-dark">R$ ${tab.pay_value}</span></li>
         </ul>
       </button>
       <br>
       <ul class="list-inline two-part d-flex align-items-center mb-0">
         <button class="btn btn-primary" id="editButton" data-bs-toggle="modal" data-bs-target="#edit-modal" onclick="showProductInfo()">Edit</button>
         <button class="btn btn-danger" id="deleteButton" onclick="deleteTab()">Delete</button>
       </ul>
     </div>`
    ;
  tabDiv.parentNode.insertBefore(newTabDiv, tabDiv.nextSibling);

}
