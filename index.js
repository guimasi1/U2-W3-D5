const rowProducts = document.getElementById("row-products");
const form = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const titles = document.getElementsByClassName("card-title");

const spinner = document.getElementsByClassName("spinner-border")[0];
const hideSpinner = () => {
  spinner.classList.add("d-none");
};

const renderProducts = (product) => {
  hideSpinner();
  const col = document.createElement("div");
  col.classList.add("col");
  col.innerHTML = `
  <div class="col mb-3 ">

    <div class="card ">
        <img src="${product.imageUrl}" class="card-img-top" alt="product's image">
        <div class="card-body">
                <h5 class="card-title fw-bold ">${product.name}</h5>
            </div>
                <ul class="list-group list-group-flush">
                <li class="list-group-item">Brand: ${product.brand}</li>
                <li class="list-group-item">Price: ${product.price}$</li>
                <div class="text-center">
                <li class="list-group-item">
            <a href="details.html?productId=${product._id}" class="btn btn-primary mb-md-1">See Details</a>
            <a href="backoffice.html?productId=${product._id}" class="btn btn-warning mb-md-1">Edit</a>
            <a href="backoffice.html?productId=${product._id}" class="btn btn-success mt-1">Add To Cart</a>
            </div>
            </li>

            </ul>
          
            
    </div>   
    </div>   
  </div>
  `;
  rowProducts.appendChild(col);
};

const authenticationKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZjAyNDEzOWM0MzAwMTg4MTQ1NjYiLCJpYXQiOjE2OTcxODE3MzIsImV4cCI6MTY5ODM5MTMzMn0.T2fm3DvA5gGO9KM4BB8MNW66C52Cl4J42HSYgxVWlW8";

const getProducts = () => {
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
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
      console.log(data);
      data.forEach((element) => {
        renderProducts(element);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

getProducts();
