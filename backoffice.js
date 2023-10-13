const authenticationKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZjAyNDEzOWM0MzAwMTg4MTQ1NjYiLCJpYXQiOjE2OTcxODE3MzIsImV4cCI6MTY5ODM5MTMzMn0.T2fm3DvA5gGO9KM4BB8MNW66C52Cl4J42HSYgxVWlW8";

const form = document.getElementsByTagName("form")[0];
const nameInputField = document.getElementById("name");
const descriptionInputField = document.getElementById("description");
const brandInputField = document.getElementById("brand");
const imageUrlInputField = document.getElementById("imageUrl");
const priceInputField = document.getElementById("price");
const createButton = document.getElementById("create-button");
const resetButton = document.getElementById("reset-button");
const modifyButton = document.getElementById("modify-button");
const deleteButton = document.getElementById("delete-button");
// RESETTA IL FORM

resetButton.addEventListener("click", () => {
  nameInputField.value = "";
  descriptionInputField.value = "";
  brandInputField.value = "";
  imageUrlInputField.value = "";
  priceInputField.value = "";
});

const addressBarContent = new URLSearchParams(location.search);
const productId = addressBarContent.get("productId");
console.log(productId);
const renderForm = (data) => {
  nameInputField.value = data.name;
  descriptionInputField.value = data.description;
  brandInputField.value = data.brand;
  imageUrlInputField.value = data.imageUrl;
  priceInputField.value = data.price;
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
      console.log(data.name);
      renderForm(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

// AUTOFILL DEI CAMPI DEL FORM SE ABBIAMO UN ID
if (productId) {
  getProduct();
  modifyButton.classList.remove("d-none");
  deleteButton.classList.remove("d-none");
}

const urlToUSe = "https://striveschool-api.herokuapp.com/api/product/";
// if (productId) {
//   urlToUSe = "https://striveschool-api.herokuapp.com/api/product/" + productId;
// }

// FUNZIONE PER GESTIRE LA CREAZIONE/MODIFICA DEI PRODOTTI

const handleProducts = (product) => {
  fetch(urlToUSe, {
    method: methodToUse,
    body: JSON.stringify(product),
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
    })
    .catch((err) => {
      console.log(err);
    });
};

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const newProduct = {
    name: nameInputField.value,
    description: descriptionInputField.value,
    brand: brandInputField.value,
    imageUrl: imageUrlInputField.value,
    price: priceInputField.value,
  };
  console.log(newProduct);

  fetch(urlToUSe, {
    method: "POST",
    body: JSON.stringify(newProduct),
    headers: {
      Authorization: authenticationKey,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        console.log("ok");
      } else {
        throw new Error("error");
        alert("error");
      }
    })

    .catch((err) => {
      console.log(err);
    });
  nameInputField.value = "";
  descriptionInputField.value = "";
  brandInputField.value = "";
  imageUrlInputField.value = "";
  priceInputField.value = "";
});

// FUNZIONE PER ELIMINARE UN PRODOTTO

const deleteProduct = () => {
  const userConfirmed = window.confirm(
    "Are you sure you want to delete the product?"
  );
  if (userConfirmed) {
    fetch(urlToUSe + `/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: authenticationKey,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log("ok");
        } else {
          throw new Error("error");
          alert("error");
        }
      })

      .catch((err) => {
        console.log(err);
      });
    console.log("Deleted");
  } else {
    console.log("Not deleted");
  }
};

deleteButton.addEventListener("click", deleteProduct);

// FUNZIONE PER MODIFICARE UN PRODOTTO

const modifyProduct = () => {
  const newProduct = {
    name: nameInputField.value,
    description: descriptionInputField.value,
    brand: brandInputField.value,
    imageUrl: imageUrlInputField.value,
    price: priceInputField.value,
  };

  const userConfirmed = window.confirm(
    "Are you sure you want to modify the product?"
  );

  if (userConfirmed) {
    fetch(urlToUSe + `/${productId}`, {
      method: "PUT",
      body: JSON.stringify(newProduct),
      headers: {
        Authorization: authenticationKey,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log("ok");
        } else {
          throw new Error("error");
          alert("error");
        }
      })

      .catch((err) => {
        console.log(err);
      });
    console.log("Modified");
  } else {
    console.log("Not Modified");
  }
};

modifyButton.addEventListener("click", modifyProduct);
