apiCall = "https://striveschool-api.herokuapp.com/api/product/"
apiToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdmNjhhYmI5YzBmNzAwMTQ0ODRmYmEiLCJpYXQiOjE2ODYwNzE0NjgsImV4cCI6MTY4NzI4MTA2OH0.cmwq2b3w0u0sOtuYBnNfbi1Wm8EXS8j3ZueJmuSSXhQ"

const myTable = document.getElementById("results-box");
const nameField = document.getElementById("name-field");
const descField = document.getElementById("desc-field");
const brandField = document.getElementById("brand-field");
const imgField = document.getElementById("img-field");
const priceField = document.getElementById("price-field");
const homeBtn = document.getElementById("homeBtn");

// Chiamata AJAX per recuperare gli elementi
async function getPost() {
    myTable.innerHTML = "";
    const res = await fetch(apiCall, {
        method: "GET",
        headers: {Authorization: apiToken}
    });
    const json = await res.json();
    console.table(json);
    json.forEach(element => {
        showPost(element);
    });
}

// Funzione che crea tutti gli elementi nella tabella, con la possibilità di modificarli singolarmente
function showPost(element) {
    const myTr = document.createElement("tr");

    myTr.innerHTML = `
        <td><div style="min-width: 100px; max-width: 160px;" class="input-group mb-3">
        <input data-name-id="${element._id}" type="text" class="form-control" placeholder="Update Name" aria-label="Recipient's username" aria-describedby="button-addon2">
        <button data-name-id="${element._id}" class="btn btn-primary" type="button" id="button-addon2"><i class="fa-solid fa-pencil"></i></button>
        </div>${element.name}</td>

        <td class="short-descr"><div style="max-width: 250px;" class="input-group mb-3">
        <input data-description-id="${element._id}" type="text" class="form-control" placeholder="Update Description" aria-label="Recipient's username" aria-describedby="button-addon2">
        <button data-description-id="${element._id}" class="btn btn-primary" type="button" id="button-addon2"><i class="fa-solid fa-pencil"></i></button>
        </div>${element.description}</td>

        <td><div style="max-width: 160px;" class="input-group mb-3">
        <input data-key-id="${element._id}" type="text" class="form-control" placeholder="Update Key" aria-label="Recipient's username" aria-describedby="button-addon2">
        <button data-key-id="${element._id}" class="btn btn-primary" type="button" id="button-addon2"><i class="fa-solid fa-pencil"></i></button>
        </div>${element.brand}</td>

        <td class="short-descr"><div style="max-width: 300px;" class="input-group mb-3">
        <input data-img-id="${element._id}" type="text" class="form-control" placeholder="Update Image URL" aria-label="Recipient's username" aria-describedby="button-addon2">
        <button data-img-id="${element._id}" class="btn btn-primary" type="button" id="button-addon2"><i class="fa-solid fa-pencil"></i></button>
        </div>${element.imageUrl}</td>

        <td><div style="min-width: 100px; max-width: 150px;" class="input-group mb-3">
        <input data-price-id="${element._id}" type="number" class="form-control" placeholder="Update Price" aria-label="Recipient's username" aria-describedby="button-addon2">
        <button data-price-id="${element._id}" class="btn btn-primary" type="button" id="button-addon2"><i class="fa-solid fa-pencil"></i></button>
        </div>€${element.price.toFixed(2)}</td>

        <td><button data-delete-id="${element._id}" class="btn btn-danger" type="button" id="button-addon2">X</button></td>
    `;

    setTimeout(() => {
      const nameBtn = myTr.querySelector(`button[data-name-id="${element._id}"]`);
      const nameInput = myTr.querySelector(`input[data-name-id="${element._id}"]`);
        nameBtn.addEventListener("click", () => {
            const updatedData = {
            name: nameInput.value
            };
            updatePost(element._id, updatedData);
        });
    }, 200);

    setTimeout(() => {
      const descripBtn = myTr.querySelector(`button[data-description-id="${element._id}"]`);
      const descripInput = myTr.querySelector(`input[data-description-id="${element._id}"]`);
      descripBtn.addEventListener("click", () => {
            const updatedData = {
            description: descripInput.value
            };
            updatePost(element._id, updatedData);
        });
    }, 200);
    
    setTimeout(() => {
      const keyBtn = myTr.querySelector(`button[data-key-id="${element._id}"]`);
      const keyInput = myTr.querySelector(`input[data-key-id="${element._id}"]`);
        keyBtn.addEventListener("click", () => {
            const updatedData = {
            brand: keyInput.value
            };
            updatePost(element._id, updatedData);
        });
    }, 200);

    setTimeout(() => {
      const imgBtn = myTr.querySelector(`button[data-img-id="${element._id}"]`);
      const imgInput = myTr.querySelector(`input[data-img-id="${element._id}"]`);
        imgBtn.addEventListener("click", () => {
            const updatedData = {
            imageUrl: imgInput.value
            };
            updatePost(element._id, updatedData);
        });
    }, 200);

    setTimeout(() => {
      const priceBtn = myTr.querySelector(`button[data-price-id="${element._id}"]`);
      const priceInput = myTr.querySelector(`input[data-price-id="${element._id}"]`);
        priceBtn.addEventListener("click", () => {
            const updatedData = {
            price: priceInput.value
            };
            updatePost(element._id, updatedData);
        });
    }, 200);

    setTimeout(() => {
      const deleteBtn = myTr.querySelector(`button[data-delete-id="${element._id}"]`);
        deleteBtn.addEventListener("click", () => {
          delPost(element._id);
        });
    }, 200);

    myTable.appendChild(myTr);
}

// Funzione per aggiungere un elemento al database
async function addPost() {
  if (nameField.value && descField.value && brandField.value && imgField.value && priceField.value) {
      const payload = {
      "name": nameField.value,
      "description": descField.value,
      "brand": brandField.value,
      "imageUrl": imgField.value,
      "price": priceField.value
  };
  const createResult = await fetch(apiCall, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
          Authorization: apiToken,
          "Content-Type": "application/json"
      }
  });
  } else {
      console.log("error");
  }

  getPost();

  nameField.value = "";
  descField.value = "";
  brandField.value = "";
  imgField.value = "";
  priceField.value = "";
}

// Funzione per aggiornare un determinato campo di un determinato elemento
async function updatePost(postId, updatedData) {
    const updateUrl = `https://striveschool-api.herokuapp.com/api/product/${postId}`;
    
    try {
      const response = await fetch(updateUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: apiToken
        },
        body: JSON.stringify(updatedData)
      });

    } catch (error) {
      console.log(error);
    }
    
    setTimeout(() => {
      getPost();
    }, 200);
}

// Funzione per eliminare un elemento tramite il button
async function delPost(postId) {
  const deleteUrl = `https://striveschool-api.herokuapp.com/api/product/${postId}`;
  
  try {
      const response = await fetch(deleteUrl, {
          method: 'DELETE',
          headers: {Authorization: apiToken}
      });
  } catch (error) {
      console.log(error);
  }

  setTimeout(() => {
    getPost();
  }, 200);
}

// Pulsante home che riporta alla pagina principale
homeBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});

window.onload = getPost();