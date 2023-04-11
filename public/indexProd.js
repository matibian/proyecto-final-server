async function postProducto() {
  const producto = {};
  producto.name = await document.getElementById("productos").value;
  producto.price = await Number(document.getElementById("precio").value);
  producto.thumbnail = await document.getElementById("imagen").value;
  producto.description = await document.getElementById("description").value;
  producto.category = await document.getElementById("category").value;
  producto.stock = await Number(document.getElementById("stock").value);
  producto.nov = await document.getElementById("nov").value;
  require("dotenv");

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  };
  fetch(`/api/products`, requestOptions)
    .then((res) => res.json()) // or res.json()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  //   return false;
}

async function eliminar(id) {
  fetch(`/api/products/` + id, { method: "DELETE" })
    .then((res) => res.text()) // or res.json()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  location.reload();
}

function botonProd() {
  postProducto();
  location.reload();
}

// Recibe mensajes del back y los renderiza en el DOM
