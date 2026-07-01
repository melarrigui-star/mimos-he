import express from 'express';
import { obteneruser, buscarusuarioid, actualizarusuario, eliminarusuario } from '../controllers/user.js';

const router = express.Router();

router.get('/', obteneruser);
router.get('/obtener/:id', buscarusuarioid);
router.put('/actualizar/:id', actualizarusuario);
router.delete('/eliminar/:id', eliminarusuario);

export default router;