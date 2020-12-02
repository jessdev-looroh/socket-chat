"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const socketIO = require("socket.io");
const http_1 = __importDefault(require("http"));
const app = express_1.default();
let server = http_1.default.createServer(app);
const publicPath = path_1.default.resolve(__dirname, "../public");
const port = process.env.PORT || 3000;
app.use(express_1.default.static(publicPath));
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
