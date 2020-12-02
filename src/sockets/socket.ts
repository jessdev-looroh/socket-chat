import { Socket } from "socket.io";
const {io} = require('../server');

// PARA SABER CUANDO UN USUARIO SE CONECTA
io.on("connection", (cliente: Socket) => {
    console.log("usuario conectado");
    cliente.on("disconnect", () => {
        console.log("usuario desconectado");
    });
    cliente.on("enviarMensaje", (usuario: any, callback) => {
        console.log(usuario);
        cliente.broadcast.emit('bienvenida',usuario);
        // if (usuario.usuario) {
        //     callback({
        //         exito: true,
        //         message: "Todo salio bien",
        //     });
        // } else {
        //     callback({
        //         exito: false,
        //         message: "TODO SALIO MAL!!",
        //     });
        // }
    });
    cliente.emit("bienvenida", { mensaje: "Bienvenido al chat" });
});

