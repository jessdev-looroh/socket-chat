import path from "path";
import express from "express";
const socketIO = require("socket.io");
import http from "http";

const app = express();
let server = http.createServer(app);

const publicPath = path.resolve(__dirname, "../public");
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

//IO = esta es la comunicacion del backend
module.exports.io = socketIO(server);
require('./sockets/socket');


//PARA ACTIVAR EL SERVIDOR EN EL PUERTO ESPECIFICADO
server.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});

// app.listen(port,()=>{
//
// });
