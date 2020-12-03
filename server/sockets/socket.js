"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuarios_1 = __importDefault(require("../classes/usuarios"));
const utils_1 = __importDefault(require("../utils/utils"));
const { io } = require("../server");
// PARA SABER CUANDO UN USUARIO SE CONECTA
io.on("connection", (cliente) => {
    cliente.on("entrarChat", (user, callback) => {
        if (!user.nombre) {
            return callback({
                exito: false,
                message: "El nombre es necesario",
            });
        }
        cliente.join(user.sala);
        let usuarios = usuarios_1.default.agregarPersona(cliente.id, user.nombre, user.sala);
        cliente.broadcast.to(user.sala).emit("listaPersonas", {
            personas: usuarios_1.default.getPersonasPorSala(user.sala),
            nuevo: utils_1.default("looroh bot <3", `${user.nombre} se acaba de conectar al chat :).`),
        });
        return callback({
            exito: true,
            usuarios,
        });
    });
    cliente.on('mensajePrivado', (data) => {
        let persona = usuarios_1.default.getPersona(cliente.id);
        cliente.broadcast.to(data.id).emit('mensajePrivado', utils_1.default(persona.nombre, data.mensaje));
    });
    cliente.on("crearMensaje", (data) => {
        let persona = usuarios_1.default.getPersona(cliente.id);
        let mensaje = utils_1.default(persona.nombre, data.mensaje);
        cliente.broadcast.to(persona.sala).emit("crearMensaje", mensaje);
    });
    cliente.on("disconnect", () => {
        let usuarioBorrado = usuarios_1.default.borrarPersona(cliente.id);
        cliente.broadcast.to(usuarioBorrado.sala).emit("listaPersonas", {
            personas: usuarios_1.default.getPersonasPorSala(usuarioBorrado.sala),
            nuevo: utils_1.default("looroh bot <3", `${usuarioBorrado === null || usuarioBorrado === void 0 ? void 0 : usuarioBorrado.nombre} abandonó el chat. :(`),
        });
    });
});
