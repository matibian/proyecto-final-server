# Server de E-commerce. Por [Matías Bianchi](www.linkedin.com/in/matiasbianchi)

# [![CSS](https://img.shields.io/badge/-link%20al%20server-red)](https://proyecto-final-server-production.up.railway.app/admin)

# [![CSS](https://img.shields.io/badge/-link%20al%20cliente-red)](https://matibian.github.io/proyecto-final-client/)

# [VORTEX - App fullstack MERN](https://matibian.github.io/proyecto-final-client)

## Frameworks , libraries y tools con sus versiones

[![](https://img.shields.io/badge/node-%2018.12.1-success)](https://reactjs.org/blog/2020/10/20/react-v17.html)

[![](https://img.shields.io/badge/React-%2018.2.0-success)](https://reactjs.org/blog/2020/10/20/react-v17.html)

[![](https://img.shields.io/badge/npm-%208.19.2-success)](https://reactjs.org/blog/2020/10/20/react-v17.html)

[![](https://img.shields.io/badge/mongo-success)](https://www.w3schools.com/react/react_router.asp)

[![](https://img.shields.io/badge/JavaScript-ES6-success)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

[![](https://img.shields.io/badge/Handlebars-%206.0.7-success)](https://www.npmjs.com/package/handlebars)

## COMANDOS

Develop mode
`npm run dev`

    Abre el servidor con persistencia de los productos en memoria.

Production mode
`npm run prod`

    Toda la persistencia en MongoDB con mongoose.

Test mode
`npm run test`

    Test mocha de lectura, creación, y eliminación de un producto. Solo funciona en modo dev, porque en ese modo esta desactivada la autenticación.

## Descripción

VORTEX es un proyecto ecommerce realizado en React.js y Express de venta de ropa. Los productos y la orden de compra con los pedidos se almacenan en mongoDB.

En el front, desde el avatar se puede acceder a la cuenta principal del usuario, donde están todos los pedidos y un chat para comunicarse con personal de Vortex.

El server almacena y administra productos, chats, envíos y muestra la configuración del servidor.
La vista del servidor está realizada en Handlebars con Bootstrap.
La autenticación se realizo con el método de JWT.

El servidor envía un mail con el detalle de compra al mail registrado por el usuario.

Para administrar el servidor es necesario un usuario administrador:

usuario: admin@admin.com

password: admin1234
