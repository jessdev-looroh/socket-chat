var socket = io();

//ON: ESCUCHAR INFORMACION
socket.on("connect", function () {
  console.log("conectado al servidor");
});
socket.on("disconnect", function () {
  console.log("Perdimos conexion con el servidor");
});
socket.on("bienvenida", function (msg) {
  console.log(msg);
});
//EMIT: ENVIAR INFORMACIÓN

socket.emit(
  "enviarMensaje",
  {
      usuario:"Jess",
    mensaje: "Hola mundo",
  },
  function (obj) {
    console.log(obj);
    console.log("Se disparo el callback");
  }
); 