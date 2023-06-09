apiCall = "https://striveschool-api.herokuapp.com/api/product/"
apiToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdmNjhhYmI5YzBmNzAwMTQ0ODRmYmEiLCJpYXQiOjE2ODYwNzE0NjgsImV4cCI6MTY4NzI4MTA2OH0.cmwq2b3w0u0sOtuYBnNfbi1Wm8EXS8j3ZueJmuSSXhQ"

const myContainer = document.getElementById("cardsContainer");
const ulCart = document.getElementById("listaCarrello");
const h5Totale = document.getElementById("h5Totale");
const backOfficeBtn = document.getElementById("backOfficeBtn");

const totCarrello = [];// Array di stoccaggio per calcolare il totale del carrello

// Chiamata AJAX per recuperare gli elementi
async function getPost() {
    myContainer.innerHTML = "";
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

// Funzione che permette di visualizzare le varie keys
function showPost(element) {
    const myCard = document.createElement("div");

    myCard.innerHTML = `<img src="${element.imageUrl}" class="card-img-top" alt="${element.name} Cover Image">
    <div class="card-body">
      <h5 class="card-title">${element.name}</h5>
      <p class="card-text short-descr">${element.description}</p>
      <div class="d-flex justify-content-around">
      <a href="#" onclick="addToCart('${element.name}', '${element.price}')" class="btn btn-primary"><i class="fa-solid fa-cart-plus"></i> €${element.price}</a>
      <a href="#" class="btn btn-secondary">Details</a>
      </div>
    </div>`;

    myCard.classList.add("card", "post-cards", "col-xxl-3", "col-xl-3", "col-lg-3", "col-md-4", "col-sm-6", "col-xs-12", "col-12", "my-3");

    myCard.id = `${element._id}`;

    const detailsButton = myCard.querySelector(".btn-secondary");

    detailsButton.addEventListener("click", () => {
        openDetailsWindow(element);
    });

    myContainer.append(myCard);
}

// Funzione che permette di aggiungere keys al carrello tramite il button
function addToCart(name, price) {

    let prezzo = parseFloat(price);

    const cartLi = document.createElement("li");

    cartLi.innerHTML = `<li data-price="${price}" class="my-2 p-2 d-flex justify-content-between align-items-baseline"><div style="width: 90%;" class="d-flex justify-content-between me-1"><span>${name}</span><span>€ ${parseFloat(price).toFixed(2)}</span></div><button class="ms-2 btn btn-danger cart-del-btn me-2 mt-1" onclick='removeFromCart(this)'> X </button></li>`;

    ulCart.append(cartLi);
    totCarrello.push(prezzo);

    calcolaPrezzoTotale();
}

// Funzione che permette di rimuovere keys dal carrello tramite il button
function removeFromCart(elemento) {  

    let listItem = elemento.parentNode;  
    let prezzo = parseFloat(listItem.getAttribute("data-price"));
    listItem.classList.add("exit-animation");

    setTimeout(() => {      
        listItem.remove();
    }, 300);// L'elemento viene rimosso alla fine dell'animazione  

    let index = totCarrello.indexOf(prezzo);
    if (index > -1) {
        totCarrello.splice(index, 1);
    } 

    calcolaPrezzoTotale();
};

// Funzione avviata dopo l'aggiunta o la rimozione di ogni elemento dal carrello, serve a ricalcolare il totale
function calcolaPrezzoTotale() {
    let somma = totCarrello.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    h5Totale.innerText = "€" + somma.toFixed(2);
};

// Funzione per aprire una nuova scheda con i dettagli del prodotto tramite il button
function openDetailsWindow(element) {
    const detailsUrl = `./details.html?id=${encodeURIComponent(element._id)}`;

    window.open(detailsUrl, "_blank");
}

// Funzione per accedere al backoffice in una nuova scheda tramite il button
backOfficeBtn.addEventListener("click", () => {
    const backofficeUrl = `./backoffice.html`;
    
    window.open(backofficeUrl, "_blank");
});

window.onload = getPost();