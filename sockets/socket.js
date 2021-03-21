const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket')


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    const [ valido, uid ] = comprobarJWT(client.handshake.headers['x-token']);

    // Verificación de Autenticación
    if ( !valido ) { return client.disconnect();}

    // Cliente Autenticado
    usuarioConectado(uid);

    // Ingresar al usuario a una sala en específico
    // Sala global, client.id, ldoe82s6w82c6e8f5
    client.join(uid);

    // Escuchar del cliente el mensaje-personal
    client.on('mensaje-personal', async (payload) => {
        await grabarMensaje(payload);
        io.to( payload.para ).emit('mensaje-personal', payload );
    });


    client.on('disconnect', () => {
        usuarioDesconectado(uid);
    });

    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje', payload);

    //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    // });


});
