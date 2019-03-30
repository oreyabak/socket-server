import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { Socket } from 'dgram';
import { usuariosConectados } from '../sockets/socket';

const router = Router();

router.get('/mensaje', ( req: Request, res: Response ) => {
	res.json ({
		ok: true,
		mensaje: 'okkkkkkkkkkkkkk'
	});
});

router.post('/mensaje', ( req: Request, res: Response ) => {

	const cuerpo = req.body.cuerpo;
	const de = req.body.de;

	const payLoad = {
		de, 
		cuerpo
	}

	const server = Server.instance;
	server.io.emit("mensaje-nuevo", payLoad);

	res.json ({
		ok: true,
		mensaje: `Mensaje: ${cuerpo} de ${de}`
	});
});

router.post('/mensaje/:id', ( req: Request, res: Response ) => {

	const cuerpo = req.body.cuerpo;
	const de = req.body.de;
	const id = req.params.id;

	const payLoad = {
		de,
		cuerpo
	}

	const server = Server.instance;
	server.io.in (id).emit('mensaje-privado', payLoad);

	res.json ({
		ok: true,
		mensaje: `Mensaje: ${cuerpo} de ${de}`,
		key: id		
	});
});

// Servicio para obtener todos los IDs de los usuarios.
router.get('/usuarios', (req: Request, res: Response) => {
	const server = Server.instance;

	server.io.clients ((err: any, clientes: Socket) => {
		if (err) {
			return res.json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			clientes
		});
	});	
});

// Obtener usuarios y sus nombres.
router.get('/usuarios/detalle', (req: Request, res: Response) => {
	
	res.json({
		ok: true,
		clientes: usuariosConectados.getLista()
	});
});

export default router;