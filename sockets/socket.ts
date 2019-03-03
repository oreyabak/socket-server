import { Socket } from 'socket.io';
import socketIO from 'socket.io';

export const desconectar = ( cliente: Socket) => {
	cliente.on('disconnect', () => {
		console.log('Usuario desconectado');
	});
}

export const mansaje = (cliente: Socket, io: socketIO.Server) => {
	cliente.on ('mensaje', ( payload: { de:string, cuerpo:string }) => {
		console.log(payload.de + " dice: " + payload.cuerpo);
		io.emit('mensaje-nuevo', payload);
	});
}