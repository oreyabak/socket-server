import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuarioLista } from '../classes/usuario-lista';
import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuarioLista();

export const conectarCliente = (cliente: Socket, io: socketIO.Server) => {
	const usuario = new Usuario(cliente.id);
	usuariosConectados.agregar(usuario);
}

export const desconectar = ( cliente: Socket, io: socketIO.Server) => {
	cliente.on('disconnect', () => {
		console.log('Usuario desconectado');
		usuariosConectados.borrarUsuario(cliente.id);
		io.emit('usuarios-activos', usuariosConectados.getLista());
	});
}

export const mansaje = (cliente: Socket, io: socketIO.Server) => {
	cliente.on ('mensaje', ( payload: { de:string, cuerpo:string }) => {
		console.log(payload.de + " dice: " + payload.cuerpo);
		io.emit('mensaje-nuevo', payload);
	});
}

export const configurarUsuario = (cliente: Socket, io: socketIO.Server) => {
	cliente.on('configurar-usuario', (payload: { nombre : string }, callback: Function) => {
		//console.log('Configurando usuario', playload.nobre);
		usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
		io.emit('usuarios-activos', usuariosConectados.getLista());
		callback({
			ok: true,
			mensaje: `Usiario ${ payload.nombre}, configurado.`
		});		
	});
} 

// Obtener usuarios.
export const obtenerUsuarios = (cliente: Socket, io: socketIO.Server) => {
	cliente.on('obtener-usuarios', () => {
		io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
	});
} 