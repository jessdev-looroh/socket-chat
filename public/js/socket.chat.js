var socket = io();

var params = new URLSearchParams(window.location.search);
if (!params.has('nombre')|| !params.has('sala') ) {
    window.location = 'index.html';
    throw new Error("El nombre es necesario");
}

var usuario = {
    nombre: params.get('nombre'),
    sala : params.get('sala')
}

socket.on('connect', function() {
    console.log("Conectado al servidor");
    socket.emit('entrarChat', usuario, function(resp) {
        console.log("usuarios conectados", resp);
    });
});

socket.on('crearMensaje',(resp)=>{
    console.log(resp);
})

socket.on('listaPersonas', (data) => {
    console.log(data);
})

socket.on('disconnect', function() {
    console.log("se perdio conexion al servidor");
});


//MENSAJES PRIVADOS

socket.on('mensajePrivado',function(mensaje){
    console.log("mensaje privado: ",mensaje);
})