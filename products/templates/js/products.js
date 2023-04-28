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
        price: parseInt(productValue),
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
      } else {
        console.error('Error adding product:', error);
        scrollTo(0, 0);
        $("#box_msg").removeClass('alert-success').addClass('alert-danger').html("Houve um erro ao remover o  produto").fadeIn();
        setTimeout(() => {
            $("#box_msg").removeClass('alert-danger').addClass('alert-success').fadeOut();
        }, 1500);
      }
    })
    .catch(error => {
      console.error('Error removing product:', error);
    });
  }