import { Socket } from "socket.io";
import usuario from "../classes/usuarios";
import crearMensaje from "../utils/utils";
const { io } = require("../server");

// PARA SABER CUANDO UN USUARIO SE CONECTA
io.on("connection", (cliente: Socket) => {
  cliente.on("entrarChat", (user: any, callback) => {
    if (!user.nombre) {
      return callback({
        exito: false,
        message: "El nombre es necesario",
      });
    }

    cliente.join(user.sala);
    let usuarios = usuario.agregarPersona(cliente.id, user.nombre,user.sala);
    cliente.broadcast.to(user.sala).emit("listaPersonas", {
      personas: usuario.getPersonasPorSala(user.sala),
      nuevo: crearMensaje(
        "looroh bot <3",
        `${user.nombre} se acaba de conectar al chat :).`
      ),
    });
    return callback({
      exito: true,
      usuarios,
    });
  });

  
  cliente.on('mensajePrivado',(data)=>{

    let persona = usuario.getPersona(cliente.id);
    cliente.broadcast.to(data.id).emit('mensajePrivado',crearMensaje(persona.nombre,data.mensaje));
    
  });

  cliente.on("crearMensaje", (data) => {
    let persona = usuario.getPersona(cliente.id);
    let mensaje = crearMensaje(persona.nombre, data.mensaje);
    cliente.broadcast.to(persona.sala).emit("crearMensaje",mensaje);
  });

  cliente.on("disconnect", () => {
    let usuarioBorrado = usuario.borrarPersona(cliente.id);
    cliente.broadcast.to(usuarioBorrado.sala).emit("listaPersonas", {
      personas: usuario.getPersonasPorSala(usuarioBorrado.sala),
      nuevo: crearMensaje(
        "looroh bot <3",
        `${usuarioBorrado?.nombre} abandonó el chat. :(`
      ),
    });
  });
});
