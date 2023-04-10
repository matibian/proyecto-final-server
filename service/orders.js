const DAOcheckout = require("../models/DAOs/DAOcheckout");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "matubianchi@gmail.com",
    pass: "izxopsdqguskflhj",
  },
});

async function postCheckout(order) {
  try {
    const response = await DAOcheckout.save(order);
    const pedido = () => {
      string =
        "<table style='border:1px solid #333'><thead> <tr> <th> # </th> <th>Producto</th> <th>Precio</th> <th>Cantidad</th> </tr></thead> <tbody border='0' cellspacing='0' cellpadding='0' style='text-align:center'>";
      order.carrito.forEach((e, i) => {
        string += `<tr> <td>${i + 1} </td> <td>${e.name} </td><td>$${
          e.price
        } </td><td>${e.quantity}</td> </tr>`;
      });
      string += "</tbody></table>";
      return string;
    };
    const mailOptions = {
      from: "Servidor Node.js",
      to: ["dev.matiasbianchi@gmail.com", order.buyer.mail],
      subject: `Nuevo pedido de ${order.buyer.name}, ${order.buyer.mail}`,
      html:
        `<h1>Nuevo pedido</h1><h3>Usuario</h1><br/><ul> <li>Usuario: ${order.buyer.mail}</li> <li>Nombre: ${order.buyer.name}</li><li>Dirección: ${order.buyer.address}</li> <li>Teléfono: ${order.buyer.phone}</li> </ul><h3>Pedido:</h3>` +
        pedido() +
        `<h4>Envío: $${order.envio}</h4><h3>Total: $${order.total}</h3>`,
    };
    try {
      const info = transporter.sendMail(mailOptions);
    } catch (err) {
      logger.error(err);
    }
    return response;
  } catch (error) {
    logger.error(error);
  }
}

async function getCheckouts(req, res) {
  try {
    let orders = await DAOcheckout.getAll();
    res.status(200).render("orders", { orders: orders, layout: "orders" });
  } catch (error) {
    logger.error(error);
  }
}

async function deleteCheckout(id) {
  try {
    return await DAOcheckout.deleteById(id);
  } catch (error) {
    logger.error(error);
  }
}

async function getEmail(email) {
  try {
    return await DAOcheckout.getByEmail(email);
  } catch (error) {
    logger.error(error);
  }
}

module.exports = {
  getCheckouts,
  postCheckout,
  deleteCheckout,
  getEmail,
};
