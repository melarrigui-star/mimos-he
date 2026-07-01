import express from 'express';
import { registro, login } from '../controllers/auth.js';
import { recuperar, forgotPassword, verifycode } from '../controllers/recuperar.js'; // <-- Agregamos 'recuperar' aquí

const router = express.Router();

router.post('/registro', registro);
router.post('/login', login);

// Agrega esta nueva línea para poder solicitar el código:
router.post('/recuperar', recuperar); 

router.post('/forgo-password', forgotPassword);
router.post('/verify-code', verifycode);

export default router;