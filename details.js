const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get('id');

apiCall = `https://striveschool-api.herokuapp.com/api/product/${itemId}`;
apiToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdmNjhhYmI5YzBmNzAwMTQ0ODRmYmEiLCJpYXQiOjE2ODYwNzE0NjgsImV4cCI6MTY4NzI4MTA2OH0.cmwq2b3w0u0sOtuYBnNfbi1Wm8EXS8j3ZueJmuSSXhQ"

const title = document.getElementsByTagName("h1");
const descr = document.getElementById("cardText");
const prezzo = document.getElementById("prezzo");
const img = document.getElementById("detImg");
const homeBtn = document.getElementById("homeBtn");

async function showDetails() {
  const res = await fetch(apiCall, {
      method: "GET",
      headers: {Authorization: apiToken}
    });
  const json = await res.json();
  console.table(json);

  title[0].innerText = "About " + json.name;  
  title[1].innerText = json.name;
  descr.innerText = json.description;
  prezzo.innerText = "€" + json.price.toFixed(2);
  img.setAttribute("src", `${json.imageUrl}`);
  img.setAttribute("alt", `${json.name} image`);
}

homeBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});

window.onload = showDetails();