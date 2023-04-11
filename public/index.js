const socket = io();

async function enviarMsg() {
  const msgParaEnvio = await document.getElementById("inputMsg").value;
  let user = await document.getElementById("user").innerText;
  await socket.emit("msg", {
    username: user,
    message: msgParaEnvio,
    from: "Vortex",
  });
  document.getElementById("inputMsg").value = "";
  return false;
}

async function socketEmit() {
  let user = document.getElementById("user")?.innerText;
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
