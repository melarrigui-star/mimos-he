// routers/auth.js
import express from 'express';
import { registro, login } from '../controllers/auth.js';
import { forgoPassword } from '../controllers/recuperar.js';

const router = express.Router();

//rutas de autenticacion
router.post('/registro', registro);
router.post('/login', login);

//ruta de olvido de contraseñas
router.post('/forgo-password', forgoPassword);
router.post('verify-code', verifycode);

export default router;