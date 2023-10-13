const authenticationKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZjAyNDEzOWM0MzAwMTg4MTQ1NjYiLCJpYXQiOjE2OTcxODE3MzIsImV4cCI6MTY5ODM5MTMzMn0.T2fm3DvA5gGO9KM4BB8MNW66C52Cl4J42HSYgxVWlW8";

const col = document.getElementsByClassName("col")[0];

/* <div class="card" >
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div> */

const addressBarContent = new URLSearchParams(location.search);
const productId = addressBarContent.get("productId");

const renderProducts = (product) => {
  const card = document.createElement("div");
  card.classList.add("card", "mb-3");
  card.innerHTML = `
          <img src="${product.imageUrl}" class="card-img-top" alt="product's image">
          <div class="card-body">
                  <h5 class="card-title fw-bold ">${product.name}</h5>
                  <p class="card-text">${product.description}</p>
              </div>
                  <ul class="list-group list-group-flush">
                  <li class="list-group-item">${product.brand}</li>
                  <li class="list-group-item">${product.price}$</li>
                  <a href="backoffice.html?productId=${product._id}" class="btn btn-warning btn-sm">Modify</a>
              </ul>
              
      </div>   
    `;
  col.appendChild(card);
};

const getProduct = () => {
  fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
    headers: {
      Authorization: authenticationKey,
    },
  })
    .then((res) => {
      if (res.ok) {
        console.log("ok");
        return res.json();
      } else {
        throw new Error("error");
      }
    })
    .then((data) => {
      renderProducts(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

getProduct();
