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
        renderizarUsuarios(resp.usuarios);
        console.log("usuarios conectados", resp);
    });
});

socket.on('crearMensaje',(resp)=>{
    renderizarMensajes(resp,false,false);
    scrollBottom();
    console.log(resp);
})

socket.on('listaPersonas', (data) => {
    renderizarUsuarios(data.personas);
    renderizarMensajes(data.nuevo,false,true);
})

socket.on('disconnect', function() {
    console.log("se perdio conexion al servidor");
});


//MENSAJES PRIVADOS

socket.on('mensajePrivado',function(mensaje){
    console.log("mensaje privado: ",mensaje);
})