import { Usuario } from './usuario';

export class UsuarioLista {
	private lista: Usuario[] = [];

	constructor () {}

	// Agregar un usuario.
	public agregar ( usuario: Usuario): Usuario {
		this.lista.push(usuario);
		return usuario;
	}

	// Actualizar el nombre del usuario.
	public actualizarNombre (id: string, nombre: string): boolean {
		for (let usuario of this.lista) {
			if (usuario.id === id) {
				usuario.nombre = nombre;
				return true;
			}
		}
		return false;
	
	}

	// Devuelve todos los usuarios conectados.
	public getLista (): Usuario[] {
		return this.lista.filter(Usuario => Usuario.nombre !== 'sin-nombre');
	}

	// Devuelve un usuarios.
	public getUsuario (id: string) {
		return this.lista.find ( usuario => usuario.id === id );
	}

	// Devuelve los usuarios de una sala.
	public getUsuarioEnSala(sala: string) {
		return this.lista.filter ( usuario => usuario.sala === sala);
	}

	// Borrar ususario.
	public borrarUsuario (id: string) {
		const tempUsuario = this.getUsuario( id );
		this.lista = this.lista.filter (usuario => usuario.id !== id);
		return tempUsuario;
	}

}