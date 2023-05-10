function createProduct() {
  const selectElement = document.querySelector('#select select');
  const inputElement = document.querySelector('#select input');
  const nameElement = document.querySelector('#name');
  const descElement = document.querySelector('#desc');
  const valueElement = document.querySelector('#value');

  let room;
  let productName;
  let productImage;
  let productDescription;
  let productValue;

  if (inputElement.style.display === 'none') {
    // The select element is shown
    productType = selectElement.value;
  } else {
    // The input element is shown
    productType = inputElement.value;
  }

  productDescription = descElement.value;
  productValue = valueElement.value;
  productName = nameElement.value;
  productImage = [];
  room = 0;

  const payload = {
    list_name: productType,
    list_room: room,
    name: productName,
    price: parseFloat(productValue),
    description: productDescription,
    image: productImage
  }

  console.log(payload)
  // Make the request with the product data
  fetch('http://localhost:3300/api/product/register', {
    method: 'POST',
    headers: {
      "Accept": "*/*",
    },
    body: JSON.stringify(payload)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Product added:', data);
      scrollTo(0, 0);
      $("#box_msg").removeClass('alert-danger').addClass('alert-success').html("Produto cadastrado com sucesso").fadeIn();
      setTimeout(() => {
        $("#box_msg").removeClass('alert-danger').addClass('alert-success').fadeOut();
      }, 1500);
    })
    .catch(error => {
      console.error('Error adding product:', error);
      scrollTo(0, 0);
      $("#box_msg").removeClass('alert-success').addClass('alert-danger').html("Houve um erro ao cadastrar produto").fadeIn();
      setTimeout(() => {
        $("#box_msg").removeClass('alert-danger').addClass('alert-success').fadeOut();
      }, 1500);
    });
}

function convertSelectToInput() {
  const selectElement = document.querySelector('#select select');
  const inputElement = document.querySelector('#select input');

  if (inputElement.style.display === 'none') {
    // show the input element and hide the select element
    inputElement.style.display = '';
    selectElement.style.display = 'none';
  } else {
    // hide the input element and show the select element
    inputElement.style.display = 'none';
    selectElement.style.display = '';
  }
}

function removeProduct() {
  var button = event.target; // pega o botão clicado
  var td = button.closest('td'); // pega o elemento <td> pai mais próximo do botão
  var productName = td.id; //
  console.log(productName)
  // Make a delete request to remove the product
  fetch(`http://localhost:3300/api/product/delete/${productName}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        scrollTo(0, 0);
        $("#box_msg").removeClass('alert-danger').addClass('alert-success').html("Produto removido com sucesso").fadeIn();
        setTimeout(() => {
          $("#box_msg").removeClass('alert-danger').addClass('alert-success').fadeOut();
        }, 1500);
      } else if (response.status == 409) {
        scrollTo(0, 0);
        $("#box_msg").removeClass('alert-success').addClass('alert-danger').html(`Uma ou mais comandas estão usando este produto: ${productName}`).fadeIn();
        setTimeout(() => {
          $("#box_msg").removeClass('alert-danger').addClass('alert-success').fadeOut();
        }, 1500);
      } else if (response.status == 401) {
        if (cookie.indexOf("_SecurePS") == -1) {
          location.reload()
          return
        }

        scrollTo(0, 0);
        $("#box_msg").removeClass('alert-success').addClass('alert-danger').html(`Você não tem autorização para remover produtos`).fadeIn();
        setTimeout(() => {
          $("#box_msg").removeClass('alert-danger').addClass('alert-success').fadeOut();
        }, 1500);
      } else {
        console.log('Error adding product:', response.json());
        scrollTo(0, 0);
        $("#box_msg").removeClass('alert-success').addClass('alert-danger').html("Houve um erro ao remover o produto").fadeIn();
        setTimeout(() => {
          $("#box_msg").removeClass('alert-danger').addClass('alert-success').fadeOut();
        }, 1500);
      }
    })
    .catch(error => {
      console.error('Error removing product:', error);
    });
}

function editProductActivate() {
  scrollTo(0, 0);
  $("#box_msg").removeClass('alert-danger').addClass('alert-success').html("Produto pronto para edicao").fadeIn();
  setTimeout(() => {
    $("#box_msg").removeClass('alert-danger').addClass('alert-success').fadeOut();
  }, 1500);
  const a = document.getElementById('productname');
  var button = event.target; // pega o botão clicado
  var td = button.closest('td'); // pega o elemento <td> pai mais próximo do botão
  var productName = td.id;
  const input = document.getElementById('name');
  input.value = productName;
  a.setAttribute('value', productName);
  const cancelButton = document.getElementById('cancelar');
  cancelButton.style.display = 'inline';
  const saveButton = document.getElementById('salvar');
  saveButton.setAttribute('onclick', `editProduct()`);
}

function editProductDesactivate() {
  scrollTo(0, 0);
  $("#box_msg").removeClass('alert-success').addClass('alert-danger').html("Cancelada a edicao").fadeIn();
  setTimeout(() => {
    $("#box_msg").removeClass('alert-danger').addClass('alert-success').fadeOut();
  }, 1500);
  const input = document.getElementById('name');
  input.value = '';
  const a = document.getElementById('productname');
  const productName = a.getAttribute('data-product-name');
  a.removeAttribute('value');
  const cancelButton = document.getElementById('cancelar');
  cancelButton.style.display = 'none';
  const saveButton = document.getElementById('salvar');
  saveButton.setAttribute('onclick', 'createProduct()');
}

function editProduct() {
  const oldProductName = document.getElementById('productname').getAttribute('value');
  const selectElement = document.querySelector('#select select');
  const inputElement = document.querySelector('#select input');
  const nameElement = document.querySelector('#name');
  const descElement = document.querySelector('#desc');
  const valueElement = document.querySelector('#value');

  let room;
  let productImage;
  let productDescription;
  let productValue;


  if (inputElement.style.display === 'none') {
    // The select element is shown
    productType = selectElement.value;
  } else {
    // The input element is shown
    productType = inputElement.value;
  }
  productDescription = descElement.value;
  productValue = valueElement.value;
  productName = nameElement.value;
  console.log(oldProductName)
  productImage = [];
  room = 0;
  const payload = {
    list_name: productType,
    list_room: room,
    name: productName,
    price: parseInt(productValue),
    description: productDescription,
    image: productImage
  }
  console.log(payload)
  // Make the request with the product data
  fetch(`http://localhost:3300/api/product/update/${oldProductName}`, {
    method: 'PUT',
    headers: {
      "Accept": "*/*",
    },
    body: JSON.stringify(payload)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Product added:', data);
      scrollTo(0, 0);
      $("#box_msg").removeClass('alert-danger').addClass('alert-success').html("Produto editado com sucesso").fadeIn();
      setTimeout(() => {
        $("#box_msg").removeClass('alert-danger').addClass('alert-success').fadeOut();
      }, 1500);
    })
    .catch(error => {
      console.error('Error adding product:', error);
      scrollTo(0, 0);
      $("#box_msg").removeClass('alert-success').addClass('alert-danger').html("Houve um erro ao editar o  produto").fadeIn();
      setTimeout(() => {
        $("#box_msg").removeClass('alert-danger').addClass('alert-success').fadeOut();
      }, 1500);
    });
}
