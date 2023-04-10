const socket = io();

async function postProducto() {
  const producto = {};
  producto.name = await document.getElementById("productos").value;
  producto.price = await Number(document.getElementById("precio").value);
  producto.thumbnail = await document.getElementById("imagen").value;
  producto.description = await document.getElementById("description").value;
  producto.category = await document.getElementById("category").value;
  producto.stock = await Number(document.getElementById("stock").value);
  producto.nov = await document.getElementById("nov").value;

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  };
  fetch(`http://127.0.0.1:8080/api/products`, requestOptions)
    .then((res) => res.json()) // or res.json()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  //   return false;
}

async function eliminar(id) {
  fetch(`http://127.0.0.1:8080/api/products/` + id, { method: "DELETE" })
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

function enviarMsg() {
  const msgParaEnvio = document.getElementById("inputMsg").value;
  let user = document.getElementById("user").innerText;
  socket.emit("msg", { username: user, message: msgParaEnvio, from: "Vortex" });
  document.getElementById("inputMsg").value = "";
  return false;
}

// Recibe mensajes del back y los renderiza en el DOM
async function socketEmit() {
  let user = document.getElementById("user").innerText;
  console.log(user);
  await socket.emit("user", `${user}`);
  await socket.on("msg-list", onMsgEvent);
}
socketEmit();

socket.on("msg-list", (data) => {
  let html = "<table align-content-center>";
  data.forEach((item) => {
    html += `
      <tr>
        <td>
          <span style="color: blue">${item.from} </span>
          </td>
          <td>
           <span style="color: red"> || ${item.timestamp} || : </span>
          </td>
          <td>
          <span style= "color:green"> ${item.message}</span>
      </td>
      </tr>
      `;
  });
  html += "</table>";
  document.getElementById("mgs-area").innerHTML = html;
});
